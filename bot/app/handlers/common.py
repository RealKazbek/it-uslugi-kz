"""Shared reply helpers for handlers."""

import logging
from typing import Final

from aiogram.exceptions import TelegramAPIError
from aiogram.types import CallbackQuery, InlineKeyboardMarkup, Message

from app.texts.lookup import t

logger = logging.getLogger(__name__)
CALLBACK_TEXT_LIMIT: Final = 200


async def notify_callback(callback: CallbackQuery, text: str) -> None:
    """Short plain-text callback answer (no alert). A failed answer is logged, not raised."""
    try:
        await callback.answer(text[:CALLBACK_TEXT_LIMIT])
    except TelegramAPIError as exc:
        logger.debug("Callback answer skipped: %s", type(exc).__name__)


async def reply_to_callback(
    callback: CallbackQuery, text: str, reply_markup: InlineKeyboardMarkup | None = None
) -> None:
    """Send a new message in the chat where the button was pressed."""
    if isinstance(callback.message, Message):
        await callback.message.answer(text, reply_markup=reply_markup)
    else:
        await notify_callback(callback, t("ru", "error.short"))
