"""Inline keyboards for categories, products and the product card."""

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from app.formatting.catalog import category_button_label, product_button_label
from app.services.backend_models import CategoryDict, ProductCardDict
from app.texts.lookup import Lang, t


def _button(text: str, callback_data: str) -> list[InlineKeyboardButton]:
    return [InlineKeyboardButton(text=text, callback_data=callback_data)]


def categories_keyboard(lang: Lang, categories: list[CategoryDict]) -> InlineKeyboardMarkup:
    rows = [
        _button(category_button_label(lang, category), f"cat:{category['slug']}")
        for category in categories
    ]
    rows.append(_button(t(lang, "button.menu"), "menu:home"))
    return InlineKeyboardMarkup(inline_keyboard=rows)


def products_keyboard(lang: Lang, products: list[ProductCardDict]) -> InlineKeyboardMarkup:
    rows = [
        _button(product_button_label(lang, product), f"prod:{product['slug']}")
        for product in products
    ]
    rows.append(_button(t(lang, "button.back"), "menu:catalog"))
    return InlineKeyboardMarkup(inline_keyboard=rows)


def product_card_keyboard(lang: Lang, slug: str, category: str) -> InlineKeyboardMarkup:
    rows = [
        _button(t(lang, "product.order"), f"buy:{slug}"),
        _button(t(lang, "button.back"), f"cat:{category}"),
    ]
    return InlineKeyboardMarkup(inline_keyboard=rows)
