"""Input validation for the order flow. Each function returns the cleaned value or None."""

from typing import Final

NAME_MIN: Final = 2
NAME_MAX: Final = 80
CONTACT_MIN: Final = 3
CONTACT_MAX: Final = 100
MESSAGE_MAX: Final = 2000


def is_command_like(raw: str | None) -> bool:
    """Text that starts with '/' is a command, not an answer to a question."""
    return raw is not None and raw.strip().startswith("/")


def clean_name(raw: str | None) -> str | None:
    if is_command_like(raw):
        return None
    return _bounded(raw, NAME_MIN, NAME_MAX)


def clean_contact(raw: str | None) -> str | None:
    if is_command_like(raw):
        return None
    return _bounded(raw, CONTACT_MIN, CONTACT_MAX)


def clean_message(raw: str | None) -> str | None:
    """Optional free text: an empty result is valid, too long or a command is not."""
    if raw is None or is_command_like(raw):
        return None
    value = raw.strip()
    return value if len(value) <= MESSAGE_MAX else None


def phone_to_contact(phone_number: str) -> str:
    """Telegram shares phone numbers without a leading plus; restore it for readability."""
    digits = phone_number.replace(" ", "").replace("-", "").strip()
    return digits if digits.startswith("+") else f"+{digits}"


def with_username(contact: str, username: str | None) -> str:
    """Append ' (@username)' when it fits the contact limit; otherwise keep the contact as is."""
    if not username:
        return contact
    candidate = f"{contact} (@{username})"
    return candidate if len(candidate) <= CONTACT_MAX else contact


def _bounded(raw: str | None, low: int, high: int) -> str | None:
    if raw is None:
        return None
    value = raw.strip()
    return value if low <= len(value) <= high else None
