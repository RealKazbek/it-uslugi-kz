"""Direct contact lines, used on the contacts screen and in failure messages."""

from typing import Final

from app.texts.lookup import Lang, t

_CONTACT_KEYS: Final = (
    "contacts.whatsapp",
    "contacts.telegram",
    "contacts.phone",
    "contacts.email",
)


def contacts_block(lang: Lang) -> str:
    return "\n".join(t(lang, key) for key in _CONTACT_KEYS)


def unavailable_text(lang: Lang) -> str:
    """Friendly 'service unavailable' message with the direct contacts."""
    return t(lang, "catalog.unavailable", contacts=contacts_block(lang))
