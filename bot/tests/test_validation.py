import pytest

from app.services.validation import (
    clean_contact,
    clean_message,
    clean_name,
    phone_to_contact,
    with_username,
)


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("Ai", "Ai"),
        (" Ai ", "Ai"),
        ("A", None),
        ("x" * 80, "x" * 80),
        ("x" * 81, None),
        (None, None),
    ],
)
def test_clean_name_bounds(raw: str | None, expected: str | None) -> None:
    assert clean_name(raw) == expected


def test_clean_contact_bounds() -> None:
    assert clean_contact("@ab") == "@ab"
    assert clean_contact("ab") is None
    assert clean_contact("x" * 100) == "x" * 100
    assert clean_contact("x" * 101) is None


def test_clean_message_allows_empty_and_rejects_long() -> None:
    assert clean_message("   ") == ""
    assert clean_message("y" * 2000) == "y" * 2000
    assert clean_message("y" * 2001) is None
    assert clean_message(None) is None


def test_phone_to_contact_adds_plus() -> None:
    assert phone_to_contact("77066620060") == "+77066620060"
    assert phone_to_contact("+7 706 662 00 60") == "+77066620060"


@pytest.mark.parametrize("raw", ["/start", "  /cancel", "/leads now"])
def test_command_like_text_is_rejected_for_name_contact_and_message(raw: str) -> None:
    assert clean_name(raw) is None
    assert clean_contact(raw) is None
    assert clean_message(raw) is None


def test_with_username_appends_when_it_fits() -> None:
    assert with_username("+77011234567", "ai_ger") == "+77011234567 (@ai_ger)"
    assert with_username("+77011234567", None) == "+77011234567"


def test_with_username_keeps_contact_when_suffix_would_exceed_limit() -> None:
    contact = "x" * 95
    assert with_username(contact, "abcdefgh") == contact
