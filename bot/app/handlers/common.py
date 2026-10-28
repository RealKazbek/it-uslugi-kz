"""Shared reply helpers for handlers."""

from aiogram.types import CallbackQuery, InlineKeyboardMarkup, Message


async def reply_to_callback(
    callback: CallbackQuery, text: str, reply_markup: InlineKeyboardMarkup | None = None
) -> None:
    """Send a new message in the chat where the button was pressed."""
    if isinstance(callback.message, Message):
        await callback.message.answer(text, reply_markup=reply_markup)
    else:
        await callback.answer(text, show_alert=True)
