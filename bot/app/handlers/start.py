"""/start, language selection, main menu, contacts."""

from aiogram import F, Router
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery, Message

from app.formatting.contacts import contacts_block
from app.handlers.common import reply_to_callback
from app.keyboards.menus import back_to_menu_keyboard, language_keyboard, main_menu_keyboard
from app.services.callbacks import parse_action
from app.services.session import get_lang, reset_flow, set_lang
from app.texts.lookup import is_lang, t

router = Router(name="start")


@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext) -> None:
    await reset_flow(state)
    await message.answer(t("ru", "lang.pick"), reply_markup=language_keyboard())


@router.callback_query(F.data.startswith("lang:"))
async def pick_language(callback: CallbackQuery, state: FSMContext) -> None:
    action = parse_action(callback.data)
    if action is None or action.action != "lang" or not is_lang(action.value):
        await callback.answer()
        return
    await set_lang(state, action.value)
    await callback.answer()
    await reply_to_callback(
        callback, t(action.value, "menu.title"), main_menu_keyboard(action.value)
    )


@router.callback_query(F.data == "menu:home")
async def show_menu(callback: CallbackQuery, state: FSMContext) -> None:
    lang = await get_lang(state)
    await callback.answer()
    await reply_to_callback(callback, t(lang, "menu.title"), main_menu_keyboard(lang))


@router.callback_query(F.data == "menu:contacts")
async def show_contacts(callback: CallbackQuery, state: FSMContext) -> None:
    lang = await get_lang(state)
    text = f"{t(lang, 'contacts.title')}\n{contacts_block(lang)}"
    await callback.answer()
    await reply_to_callback(callback, text, back_to_menu_keyboard(lang))
