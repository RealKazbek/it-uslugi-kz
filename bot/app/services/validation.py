"""Input validation for the order flow. Each function returns the cleaned value or None."""

from typing import Final

NAME_MIN: Final = 2
NAME_MAX: Final = 80
CONTACT_MIN: Final = 3
CONTACT_MAX: Final = 100
MESSAGE_MAX: Final = 2000


def clean_name(raw: str | None) -> str | None:
    return _bounded(raw, NAME_MIN, NAME_MAX)


def clean_contact(raw: str | None) -> str | None:
    return _bounded(raw, CONTACT_MIN, CONTACT_MAX)


def clean_message(raw: str | None) -> str | None:
    """Optional free text: an empty result is valid, too long is not."""
    if raw is None:
        return None
    value = raw.strip()
    return value if len(value) <= MESSAGE_MAX else None


def phone_to_contact(phone_number: str) -> str:
    """Telegram shares phone numbers without a leading plus; restore it for readability."""
    digits = phone_number.replace(" ", "").replace("-", "").strip()
    return digits if digits.startswith("+") else f"+{digits}"


def _bounded(raw: str | None, low: int, high: int) -> str | None:
    if raw is None:
        return None
    value = raw.strip()
    return value if low <= len(value) <= high else None
