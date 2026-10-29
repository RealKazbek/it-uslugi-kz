"""Admin commands and status buttons. Only the admin chat passes AdminChatFilter."""

import logging

from aiogram import F, Router
from aiogram.exceptions import TelegramAPIError
from aiogram.filters import Command
from aiogram.types import CallbackQuery, Message

from app.filters.admin import AdminChatFilter
from app.formatting.leads import format_leads, format_stats, status_label
from app.formatting.status import with_status_line
from app.handlers.common import notify_callback
from app.services.backend import BackendClient
from app.services.backend_errors import BackendError
from app.services.callbacks import parse_lead_action
from app.texts.lookup import t

logger = logging.getLogger(__name__)
router = Router(name="admin")
router.message.filter(AdminChatFilter())
router.callback_query.filter(AdminChatFilter())

LEADS_LIMIT = 10


@router.message(Command("leads"))
async def cmd_leads(message: Message, backend: BackendClient) -> None:
    try:
        leads = await backend.list_recent_leads(LEADS_LIMIT)
    except BackendError:
        await message.answer(t("ru", "admin.backend_error"))
        return
    await message.answer(format_leads(leads))


@router.message(Command("stats"))
async def cmd_stats(message: Message, backend: BackendClient) -> None:
    try:
        stats = await backend.get_stats()
    except BackendError:
        await message.answer(t("ru", "admin.backend_error"))
        return
    await message.answer(format_stats(stats))


@router.callback_query(F.data.startswith("lead:"))
async def set_lead_status(callback: CallbackQuery, backend: BackendClient) -> None:
    action = parse_lead_action(callback.data)
    if action is None:
        await callback.answer()
        return
    try:
        await backend.update_lead_status(action.lead_id, action.status)
    except BackendError:
        logger.warning("Status update failed for lead %s", action.lead_id)
        await callback.answer(t("ru", "admin.status_failed"), show_alert=True)
        return
    label = status_label(action.status)
    if not isinstance(callback.message, Message):
        await notify_callback(callback, t("ru", "admin.status_updated", label=label))
        return
    text = with_status_line(callback.message.html_text, label)
    if text == callback.message.html_text:
        await callback.answer()  # duplicate press: the status is already shown
        return
    await notify_callback(callback, t("ru", "admin.status_updated", label=label))
    await _edit_status_message(callback.message, text, action.lead_id)


async def _edit_status_message(message: Message, text: str, lead_id: int) -> None:
    """The status is already saved, so an edit that Telegram refuses is logged and not raised."""
    try:
        await message.edit_text(text, reply_markup=message.reply_markup)
    except TelegramAPIError as exc:
        logger.warning("Could not edit message for lead %s: %s", lead_id, type(exc).__name__)
