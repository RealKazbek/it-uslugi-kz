"""Localized text lookup. Unknown keys in a language fall back to Russian."""

from typing import Any, Final, Literal, TypeGuard

from app.texts import en, kk, ru

Lang = Literal["ru", "kk", "en"]
LANGS: Final[tuple[Lang, ...]] = ("ru", "kk", "en")
DEFAULT_LANG: Final[Lang] = "ru"

_TABLES: Final[dict[Lang, dict[str, str]]] = {
    "ru": dict(ru.TEXTS),
    "kk": dict(kk.TEXTS),
    "en": dict(en.TEXTS),
}


def is_lang(value: object) -> TypeGuard[Lang]:
    return isinstance(value, str) and value in LANGS


def parse_lang(value: object) -> Lang | None:
    return value if is_lang(value) else None


def t(lang: Lang, key: str, **params: Any) -> str:
    """Text for `key` in `lang`, formatted with `params`. Raises KeyError for unknown keys."""
    template = _TABLES[lang].get(key)
    if template is None:
        template = _TABLES[DEFAULT_LANG][key]
    return template.format(**params) if params else template
