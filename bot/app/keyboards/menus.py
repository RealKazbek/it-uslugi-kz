"""Language picker and main menu."""

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from app.texts.lookup import LANGS, Lang, t


def language_keyboard() -> InlineKeyboardMarkup:
    row = [
        InlineKeyboardButton(text=t("ru", f"lang.{lang}"), callback_data=f"lang:{lang}")
        for lang in LANGS
    ]
    return InlineKeyboardMarkup(inline_keyboard=[row])


def main_menu_keyboard(lang: Lang) -> InlineKeyboardMarkup:
    rows = [
        [InlineKeyboardButton(text=t(lang, "menu.catalog"), callback_data="menu:catalog")],
        [InlineKeyboardButton(text=t(lang, "menu.order"), callback_data="menu:order")],
        [InlineKeyboardButton(text=t(lang, "menu.contacts"), callback_data="menu:contacts")],
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows)


def back_to_menu_keyboard(lang: Lang) -> InlineKeyboardMarkup:
    button = InlineKeyboardButton(text=t(lang, "button.menu"), callback_data="menu:home")
    return InlineKeyboardMarkup(inline_keyboard=[[button]])
