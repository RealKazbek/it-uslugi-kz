"""Lowest-priority catch-alls: stray callbacks are ignored, stray private messages get a hint."""

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from app.services.session import get_lang
from app.texts.lookup import t

router = Router(name="fallback")
router.message.filter(F.chat.type == "private")


@router.callback_query()
async def ignore_callback(callback: CallbackQuery) -> None:
    await callback.answer()


@router.message()
async def start_hint(message: Message, state: FSMContext) -> None:
    await message.answer(t(await get_lang(state), "hint.start"))
