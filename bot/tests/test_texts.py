import pytest

from app.texts import en, kk, lookup, ru
from app.texts.lookup import DEFAULT_LANG, parse_lang, t


def test_all_languages_have_the_same_keys() -> None:
    assert set(ru.TEXTS) == set(kk.TEXTS) == set(en.TEXTS)


def test_lookup_formats_parameters() -> None:
    assert t("en", "product.days_range", min=3, max=5) == "3–5 days"


def test_lookup_falls_back_to_russian_for_missing_key(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setitem(lookup._TABLES["ru"], "only.ru", "Текст")
    assert t("kk", "only.ru") == "Текст"


def test_unknown_key_raises() -> None:
    with pytest.raises(KeyError):
        t("ru", "no.such.key")


@pytest.mark.parametrize(
    ("value", "expected"),
    [("ru", "ru"), ("kk", "kk"), ("en", "en"), ("de", None), (None, None), (5, None)],
)
def test_parse_lang(value: object, expected: str | None) -> None:
    assert parse_lang(value) == expected


def test_default_language_is_russian() -> None:
    assert DEFAULT_LANG == "ru"
