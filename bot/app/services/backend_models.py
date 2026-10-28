"""Typed shapes of the backend JSON that the bot reads. Only the fields the bot uses."""

from typing import TypedDict


class CategoryDict(TypedDict):
    slug: str
    name_ru: str
    name_kk: str
    name_en: str
    product_count: int


class ProductCardDict(TypedDict):
    slug: str
    category: str
    title: str
    short: str
    price_from_kzt: int
    unit: str


class ProductDetailDict(ProductCardDict):
    days_min: int
    days_max: int


class LeadDict(TypedDict):
    id: int
    name: str
    contact: str
    product_slug: str | None
    lang: str
    status: str
    created_at: str


class StatusCountsDict(TypedDict):
    new: int
    in_progress: int
    won: int
    lost: int


class LeadStatsDict(TypedDict):
    total: StatusCountsDict
    last_7_days: StatusCountsDict


class LeadPayload(TypedDict):
    name: str
    contact: str
    channel: str
    product: str | None
    message: str
    page_url: str
    lang: str
    telegram_user_id: int | None
