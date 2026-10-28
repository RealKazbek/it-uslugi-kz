from unittest.mock import AsyncMock

from aiogram.fsm.context import FSMContext

from app.handlers.start import cmd_start, pick_language, show_contacts, show_menu
from app.services.session import get_lang, set_lang
from app.texts.lookup import t
from tests.factories import make_callback, make_message


async def test_start_shows_language_picker_and_resets_flow(state: FSMContext) -> None:
    await set_lang(state, "kk")
    await state.update_data(name="Old")
    message = make_message("/start")
    await cmd_start(message, state)
    assert await state.get_data() == {"lang": "kk"}
    text = message.answer.await_args.args[0]
    assert text == t("ru", "lang.pick")
    buttons = message.answer.await_args.kwargs["reply_markup"].inline_keyboard[0]
    assert [button.callback_data for button in buttons] == ["lang:ru", "lang:kk", "lang:en"]
    assert [button.text for button in buttons] == ["Русский", "Қазақша", "English"]


async def test_picking_language_stores_it_and_shows_menu(state: FSMContext) -> None:
    callback = make_callback("lang:en")
    await pick_language(callback, state)
    assert await get_lang(state) == "en"
    callback.answer.assert_awaited_once()
    text = callback.message.answer.await_args.args[0]
    assert text == t("en", "menu.title")


async def test_invalid_language_callback_is_ignored(state: FSMContext) -> None:
    callback = make_callback("lang:de")
    await pick_language(callback, state)
    assert await state.get_data() == {}
    callback.message.answer.assert_not_awaited()


async def test_menu_home_uses_stored_language(state: FSMContext) -> None:
    await set_lang(state, "kk")
    callback = make_callback("menu:home")
    await show_menu(callback, state)
    assert callback.message.answer.await_args.args[0] == t("kk", "menu.title")


async def test_contacts_screen_has_links_and_back_button(state: FSMContext) -> None:
    callback = make_callback("menu:contacts")
    await show_contacts(callback, state)
    text = callback.message.answer.await_args.args[0]
    assert "https://wa.me/77066620060" in text
    assert "https://t.me/RealKazbek" in text
    assert "37765@iitu.edu.kz" in text
    markup = callback.message.answer.await_args.kwargs["reply_markup"]
    assert markup.inline_keyboard[0][0].callback_data == "menu:home"


async def test_contacts_answers_callback_before_sending(state: FSMContext) -> None:
    callback = make_callback("menu:contacts")
    order: list[str] = []
    callback.answer = AsyncMock(side_effect=lambda *a, **k: order.append("answer"))
    callback.message.answer = AsyncMock(side_effect=lambda *a, **k: order.append("send"))
    await show_contacts(callback, state)
    assert order == ["answer", "send"]
