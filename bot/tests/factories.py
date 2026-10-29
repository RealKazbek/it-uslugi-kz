"""Mock aiogram objects (AsyncMock with spec) and sample backend payloads."""

from types import SimpleNamespace
from typing import Any
from unittest.mock import AsyncMock

from aiogram.types import CallbackQuery, Message

from app.services.backend_models import CategoryDict, LeadDict, ProductCardDict, ProductDetailDict

ADMIN_CHAT_ID = -1001234567890
CLIENT_CHAT_ID = 555
USER_ID = 555
BOT_ID = 42


def make_message(
    text: str | None = None,
    *,
    chat_id: int = CLIENT_CHAT_ID,
    user_id: int = USER_ID,
    username: str | None = None,
    phone_number: str | None = None,
    html_text: str = "",
    reply_markup: Any = None,
) -> AsyncMock:
    message = AsyncMock(spec=Message)
    message.text = text
    message.html_text = html_text
    message.reply_markup = reply_markup
    message.chat = SimpleNamespace(id=chat_id)
    message.from_user = SimpleNamespace(id=user_id, username=username)
    message.bot = SimpleNamespace(id=BOT_ID)
    message.contact = (
        SimpleNamespace(phone_number=phone_number) if phone_number is not None else None
    )
    # aiogram wraps these methods, so spec alone yields MagicMock instead of AsyncMock.
    message.answer = AsyncMock()
    message.edit_text = AsyncMock()
    return message


def make_callback(
    data: str | None,
    *,
    message: AsyncMock | None = None,
    user_id: int = USER_ID,
) -> AsyncMock:
    callback = AsyncMock(spec=CallbackQuery)
    callback.data = data
    callback.from_user = SimpleNamespace(id=user_id, username=None)
    callback.message = message if message is not None else make_message()
    callback.answer = AsyncMock()
    return callback


def category(slug: str = "websites", count: int = 2) -> CategoryDict:
    return {
        "slug": slug,
        "name_ru": "Сайты",
        "name_kk": "Сайттар",
        "name_en": "Websites",
        "product_count": count,
    }


def card(slug: str = "lending", price: int = 150000, unit: str = "once") -> ProductCardDict:
    return {
        "slug": slug,
        "category": "websites",
        "title": "Лендинг",
        "short": "Одна страница",
        "price_from_kzt": price,
        "unit": unit,
    }


def detail(slug: str = "lending") -> ProductDetailDict:
    return {**card(slug), "days_min": 3, "days_max": 5}


def lead(lead_id: int = 7, status: str = "new") -> LeadDict:
    return {
        "id": lead_id,
        "name": "Айгерим",
        "contact": "+77011234567",
        "product_slug": "lending",
        "lang": "ru",
        "status": status,
        "created_at": "2026-10-29T10:15:00+05:00",
    }
