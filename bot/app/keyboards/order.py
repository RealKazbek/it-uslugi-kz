"""Keyboards for the order flow: phone sharing, skipping the message, confirmation."""

from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    ReplyKeyboardMarkup,
)

from app.texts.lookup import Lang, t


def share_contact_keyboard(lang: Lang) -> ReplyKeyboardMarkup:
    button = KeyboardButton(text=t(lang, "order.share_button"), request_contact=True)
    return ReplyKeyboardMarkup(keyboard=[[button]], resize_keyboard=True, one_time_keyboard=True)


def skip_keyboard(lang: Lang) -> ReplyKeyboardMarkup:
    button = KeyboardButton(text=t(lang, "order.skip_button"))
    return ReplyKeyboardMarkup(keyboard=[[button]], resize_keyboard=True, one_time_keyboard=True)


def confirm_keyboard(lang: Lang) -> InlineKeyboardMarkup:
    rows = [
        [InlineKeyboardButton(text=t(lang, "order.confirm_button"), callback_data="order:confirm")],
        [InlineKeyboardButton(text=t(lang, "order.cancel_button"), callback_data="order:cancel")],
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows)
