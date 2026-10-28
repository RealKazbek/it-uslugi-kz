"""Price, unit and timeline text."""

from typing import Final

from app.texts.lookup import Lang, t

_UNIT_KEYS: Final[dict[str, str]] = {
    "once": "unit.once",
    "month": "unit.month",
    "lesson": "unit.lesson",
    "hour": "unit.hour",
}


def format_amount(kzt: int) -> str:
    """1500000 -> '1 500 000 ₸' (space as thousands separator)."""
    return f"{kzt:,}".replace(",", " ") + " ₸"


def price_line(lang: Lang, kzt: int, unit: str) -> str:
    key = _UNIT_KEYS.get(unit)
    suffix = t(lang, key) if key else ""
    return t(lang, "product.price", amount=format_amount(kzt)) + suffix


def days_line(lang: Lang, days_min: int, days_max: int) -> str:
    if days_min == days_max:
        value = t(lang, "product.days_single", days=days_min)
    else:
        value = t(lang, "product.days_range", min=days_min, max=days_max)
    return t(lang, "product.days", days=value)
