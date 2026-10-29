"""Lowest-priority catch-alls: stray callbacks are ignored, stray messages get a /start hint."""

from aiogram import Router
from aiogram.types import CallbackQuery, Message

from app.texts.lookup import t

router = Router(name="fallback")


@router.callback_query()
async def ignore_callback(callback: CallbackQuery) -> None:
    await callback.answer()


@router.message()
async def start_hint(message: Message) -> None:
    await message.answer(t("ru", "hint.start"))
