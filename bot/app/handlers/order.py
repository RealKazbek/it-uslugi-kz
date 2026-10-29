"""Order flow: name -> contact -> message -> confirm -> POST /api/internal/leads."""

import logging

from aiogram import F, Router
from aiogram.filters import Command
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message, ReplyKeyboardRemove

from app.formatting.contacts import contacts_block, unavailable_text
from app.formatting.order import order_summary
from app.handlers.common import reply_to_callback
from app.keyboards.order import confirm_keyboard, share_contact_keyboard, skip_keyboard
from app.services.backend import BackendClient
from app.services.backend_errors import BackendError
from app.services.callbacks import parse_action
from app.services.order_draft import CHANNEL_PHONE, CHANNEL_TELEGRAM, OrderDraft, build_lead_payload
from app.services.session import get_lang, reset_flow
from app.services.validation import (
    clean_contact,
    clean_message,
    clean_name,
    is_command_like,
    phone_to_contact,
    with_username,
)
from app.states import OrderStates
from app.texts.lookup import Lang, t

logger = logging.getLogger(__name__)
router = Router(name="order")


@router.message(Command("cancel"))
async def cmd_cancel(message: Message, state: FSMContext) -> None:
    await reset_flow(state)
    lang = await get_lang(state)
    await message.answer(t(lang, "cancel.done"), reply_markup=ReplyKeyboardRemove())


@router.callback_query(F.data == "menu:order")
async def order_from_menu(callback: CallbackQuery, state: FSMContext) -> None:
    await _begin(callback, state, slug=None, title=None)


@router.callback_query(F.data.startswith("buy:"))
async def order_from_product(
    callback: CallbackQuery, state: FSMContext, backend: BackendClient
) -> None:
    lang = await get_lang(state)
    action = parse_action(callback.data)
    if action is None or action.action != "buy":
        await callback.answer()
        return
    try:
        detail = await backend.get_product(action.value, lang)
    except BackendError as exc:
        await callback.answer()
        text = t(lang, "product.not_found") if exc.status_code == 404 else unavailable_text(lang)
        await reply_to_callback(callback, text)
        return
    await _begin(callback, state, slug=detail["slug"], title=detail["title"])


async def _begin(
    callback: CallbackQuery, state: FSMContext, slug: str | None, title: str | None
) -> None:
    await reset_flow(state)
    lang = await get_lang(state)
    await state.update_data(product_slug=slug, product_title=title)
    await state.set_state(OrderStates.name)
    await callback.answer()
    await reply_to_callback(callback, t(lang, "order.name_prompt"))


def _reject_reason(message: Message, lang: Lang, invalid_key: str) -> str:
    """Pick the reason shown for a rejected reply: non-text, a command, or a bad value."""
    if message.text is None:
        return t(lang, "order.text_only")
    if is_command_like(message.text):
        return t(lang, "order.command_like")
    return t(lang, invalid_key)


@router.message(OrderStates.name)
async def got_name(message: Message, state: FSMContext) -> None:
    lang = await get_lang(state)
    name = clean_name(message.text)
    if name is None:
        await message.answer(_reject_reason(message, lang, "order.name_invalid"))
        return
    await state.update_data(name=name)
    await state.set_state(OrderStates.contact)
    prompt = t(lang, "order.contact_prompt", share=t(lang, "order.share_button"))
    await message.answer(prompt, reply_markup=share_contact_keyboard(lang))


def _contact_and_channel(message: Message) -> tuple[str | None, str]:
    """A shared phone is stored as a phone; typed text is a handle or number to reply to."""
    if message.contact is not None:
        phone = phone_to_contact(message.contact.phone_number)
        return clean_contact(phone), CHANNEL_PHONE
    return clean_contact(message.text), CHANNEL_TELEGRAM


@router.message(OrderStates.contact)
async def got_contact(message: Message, state: FSMContext) -> None:
    lang = await get_lang(state)
    contact, channel = _contact_and_channel(message)
    if contact is None:
        await message.answer(_reject_reason(message, lang, "order.contact_invalid"))
        return
    username = message.from_user.username if message.from_user else None
    await state.update_data(contact=with_username(contact, username), channel=channel)
    await state.set_state(OrderStates.message)
    prompt = t(lang, "order.message_prompt", skip=t(lang, "order.skip_button"))
    await message.answer(prompt, reply_markup=skip_keyboard(lang))


@router.message(OrderStates.message)
async def got_message(message: Message, state: FSMContext) -> None:
    lang = await get_lang(state)
    value = _message_value(message.text, lang)
    if value is None:
        await message.answer(_reject_reason(message, lang, "order.message_invalid"))
        return
    await state.update_data(message=value)
    await state.set_state(OrderStates.confirm)
    await _send_summary(message, state, lang)


def _message_value(text: str | None, lang: Lang) -> str | None:
    if text == t(lang, "order.skip_button"):
        return ""
    return clean_message(text)


async def _send_summary(message: Message, state: FSMContext, lang: Lang) -> None:
    draft = OrderDraft.from_data(await state.get_data())
    if draft is None:
        await reset_flow(state)
        await message.answer(t(lang, "order.expired"), reply_markup=ReplyKeyboardRemove())
        return
    text = f"{t(lang, 'order.confirm_title')}\n\n{order_summary(lang, draft)}"
    await message.answer(text, reply_markup=confirm_keyboard(lang))


@router.callback_query(F.data == "order:confirm", OrderStates.confirm)
async def confirm_order(callback: CallbackQuery, state: FSMContext, backend: BackendClient) -> None:
    lang = await get_lang(state)
    await callback.answer()
    draft = OrderDraft.from_data(await state.get_data())
    if draft is None:
        await reset_flow(state)
        await reply_to_callback(callback, t(lang, "order.expired"))
        return
    payload = build_lead_payload(draft, lang, callback.from_user.id)
    await reset_flow(state)
    try:
        await backend.create_lead(payload)
    except BackendError:
        logger.warning("Lead submission failed for Telegram user %s", callback.from_user.id)
        failed = t(lang, "order.failed", contacts=contacts_block(lang))
        await reply_to_callback(callback, failed)
        return
    await reply_to_callback(callback, t(lang, "order.sent"))


@router.callback_query(F.data == "order:cancel", OrderStates.confirm)
async def cancel_at_confirm(callback: CallbackQuery, state: FSMContext) -> None:
    lang = await get_lang(state)
    await reset_flow(state)
    await callback.answer()
    await reply_to_callback(callback, t(lang, "order.cancelled"))
