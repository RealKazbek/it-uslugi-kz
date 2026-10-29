from unittest.mock import AsyncMock

from aiogram.fsm.context import FSMContext

from app.handlers.order import (
    cancel_at_confirm,
    cmd_cancel,
    confirm_order,
    got_contact,
    got_message,
    got_name,
    order_from_menu,
    order_from_product,
)
from app.services.backend_errors import BackendError
from app.services.session import set_lang
from app.states import OrderStates
from app.texts.lookup import t
from tests.factories import USER_ID, detail, make_callback, make_message

EXPECTED_PAYLOAD = {
    "name": "Айгерим",
    "contact": "+77011234567",
    "channel": "telegram",
    "product": None,
    "message": "Нужен лендинг",
    "page_url": "",
    "lang": "ru",
    "telegram_user_id": USER_ID,
}


async def _walk_to_confirm(state: FSMContext, *, message_text: str = "Нужен лендинг") -> None:
    await got_name(make_message("Айгерим"), state)
    await got_contact(make_message("+77011234567"), state)
    await got_message(make_message(message_text), state)


async def test_full_order_from_menu_posts_expected_payload(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.create_lead.return_value = 42
    await order_from_menu(make_callback("menu:order"), state)
    assert await state.get_state() == OrderStates.name.state
    await _walk_to_confirm(state)
    assert await state.get_state() == OrderStates.confirm.state

    callback = make_callback("order:confirm")
    await confirm_order(callback, state, backend)
    backend.create_lead.assert_awaited_once_with(EXPECTED_PAYLOAD)
    assert callback.message.answer.await_args.args[0] == t("ru", "order.sent")
    assert await state.get_state() is None


async def test_order_from_product_carries_slug_and_title(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.get_product.return_value = detail("lending")
    await order_from_product(make_callback("buy:lending"), state, backend)
    backend.get_product.assert_awaited_once_with("lending", "ru")
    await _walk_to_confirm(state)
    await confirm_order(make_callback("order:confirm"), state, backend)
    payload = backend.create_lead.await_args.args[0]
    assert payload["product"] == "lending"
    assert payload["channel"] == "telegram"


async def test_shared_phone_is_normalized_and_skip_leaves_message_empty(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.create_lead.return_value = 1
    await order_from_menu(make_callback("menu:order"), state)
    await got_name(make_message("Айгерим"), state)
    await got_contact(make_message(phone_number="77011234567"), state)
    await got_message(make_message(t("ru", "order.skip_button")), state)
    await confirm_order(make_callback("order:confirm"), state, backend)
    payload = backend.create_lead.await_args.args[0]
    assert payload["contact"] == "+77011234567"
    assert payload["message"] == ""


async def test_invalid_name_reprompts_and_keeps_step(state: FSMContext) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    message = make_message("A")
    await got_name(message, state)
    assert message.answer.await_args.args[0] == t("ru", "order.name_invalid")
    assert await state.get_state() == OrderStates.name.state


async def test_invalid_contact_and_long_message_are_rejected(state: FSMContext) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    await got_name(make_message("Айгерим"), state)
    contact_msg = make_message("ab")
    await got_contact(contact_msg, state)
    assert contact_msg.answer.await_args.args[0] == t("ru", "order.contact_invalid")
    await got_contact(make_message("+77011234567"), state)
    long_msg = make_message("y" * 2001)
    await got_message(long_msg, state)
    assert long_msg.answer.await_args.args[0] == t("ru", "order.message_invalid")
    assert await state.get_state() == OrderStates.message.state


async def test_backend_failure_shows_contacts_and_clears_flow(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.create_lead.side_effect = BackendError("HTTP 500", 500)
    await order_from_menu(make_callback("menu:order"), state)
    await _walk_to_confirm(state)
    callback = make_callback("order:confirm")
    await confirm_order(callback, state, backend)
    text = callback.message.answer.await_args.args[0]
    assert "wa.me/77066620060" in text
    assert await state.get_state() is None


async def test_cancel_command_keeps_language(state: FSMContext) -> None:
    await set_lang(state, "kk")
    await order_from_menu(make_callback("menu:order"), state)
    message = make_message("/cancel")
    await cmd_cancel(message, state)
    assert await state.get_state() is None
    assert await state.get_data() == {"lang": "kk"}
    assert message.answer.await_args.args[0] == t("kk", "cancel.done")


async def test_cancel_button_at_confirm_stops_flow(state: FSMContext, backend: AsyncMock) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    await _walk_to_confirm(state)
    callback = make_callback("order:cancel")
    await cancel_at_confirm(callback, state)
    assert await state.get_state() is None
    backend.create_lead.assert_not_awaited()
    assert callback.message.answer.await_args.args[0] == t("ru", "order.cancelled")


async def test_confirm_after_session_loss_is_expired(state: FSMContext, backend: AsyncMock) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    await state.set_state(OrderStates.confirm)
    callback = make_callback("order:confirm")
    await confirm_order(callback, state, backend)
    backend.create_lead.assert_not_awaited()
    assert callback.message.answer.await_args.args[0] == t("ru", "order.expired")


async def test_shared_phone_is_stored_as_phone_channel_with_username(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.create_lead.return_value = 1
    await order_from_menu(make_callback("menu:order"), state)
    await got_name(make_message("Айгерим"), state)
    shared = make_message(phone_number="77011234567", username="ai_ger")
    await got_contact(shared, state)
    await got_message(make_message("-"), state)
    await confirm_order(make_callback("order:confirm"), state, backend)
    payload = backend.create_lead.await_args.args[0]
    assert payload["channel"] == "phone"
    assert payload["contact"] == "+77011234567 (@ai_ger)"


async def test_typed_contact_keeps_telegram_channel(state: FSMContext) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    await got_name(make_message("Айгерим"), state)
    await got_contact(make_message("@ai_ger"), state)
    data = await state.get_data()
    assert data["channel"] == "telegram"


async def test_non_text_at_name_step_gives_text_only_reason(state: FSMContext) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    sticker = make_message(None)
    await got_name(sticker, state)
    assert sticker.answer.await_args.args[0] == t("ru", "order.text_only")


async def test_command_at_message_step_is_rejected_and_reprompted(state: FSMContext) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    await got_name(make_message("Айгерим"), state)
    await got_contact(make_message("+77011234567"), state)
    command = make_message("/leads")
    await got_message(command, state)
    assert command.answer.await_args.args[0] == t("ru", "order.command_like")
    assert await state.get_state() == OrderStates.message.state


async def test_command_at_name_step_is_rejected(state: FSMContext) -> None:
    await order_from_menu(make_callback("menu:order"), state)
    command = make_message("/help")
    await got_name(command, state)
    assert command.answer.await_args.args[0] == t("ru", "order.command_like")
    assert await state.get_state() == OrderStates.name.state


async def test_product_backend_failure_uses_unavailable_text(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.get_product.side_effect = BackendError("HTTP 500", 500)
    callback = make_callback("buy:lending")
    await order_from_product(callback, state, backend)
    assert "wa.me/77066620060" in callback.message.answer.await_args.args[0]
    assert await state.get_state() is None


async def test_product_404_uses_not_found_text(state: FSMContext, backend: AsyncMock) -> None:
    backend.get_product.side_effect = BackendError("HTTP 404", 404)
    callback = make_callback("buy:missing")
    await order_from_product(callback, state, backend)
    assert callback.message.answer.await_args.args[0] == t("ru", "product.not_found")
