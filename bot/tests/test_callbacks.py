import pytest

from app.services.callbacks import parse_action, parse_lead_action


@pytest.mark.parametrize(
    ("data", "action", "value"),
    [
        ("lang:kk", "lang", "kk"),
        ("menu:catalog", "menu", "catalog"),
        ("cat:websites", "cat", "websites"),
        ("buy:telegram-bot-zayavki", "buy", "telegram-bot-zayavki"),
        ("order:confirm", "order", "confirm"),
    ],
)
def test_valid_actions_parse(data: str, action: str, value: str) -> None:
    parsed = parse_action(data)
    assert parsed is not None
    assert (parsed.action, parsed.value) == (action, value)


@pytest.mark.parametrize(
    "data",
    [
        None,
        "",
        "cat",
        "cat:",
        "CAT:x",
        "cat:Upper",
        "cat:a/b",
        "cat:x y",
        "cat:" + "x" * 60,
        "a:b:c",
    ],
)
def test_invalid_actions_parse_to_none(data: str | None) -> None:
    assert parse_action(data) is None


def test_lead_callback_parses_id_and_status() -> None:
    parsed = parse_lead_action("lead:42:won")
    assert parsed is not None
    assert parsed.lead_id == 42
    assert parsed.status == "won"


@pytest.mark.parametrize(
    "data",
    [
        None,
        "lead:0:won",
        "lead:01:won",
        "lead:42:new",
        "lead:42:deleted",
        "lead:abc:won",
        "lead:42:won:extra",
        "lead:42:won\n",
        "lead:" + "9" * 20 + ":won",
        "cat:42:won",
    ],
)
def test_invalid_lead_callbacks_parse_to_none(data: str | None) -> None:
    assert parse_lead_action(data) is None
