import logging
from typing import Any

import httpx
import pytest
from django.test import override_settings

from leads.models import Lead
from leads.services import notifications
from leads.services.notifications import notify_new_lead, send_with_retries

pytestmark = pytest.mark.django_db

CONFIGURED = {"TELEGRAM_BOT_TOKEN": "123456:SECRET-BOT-TOKEN", "ADMIN_CHAT_ID": "999"}
TOKEN = CONFIGURED["TELEGRAM_BOT_TOKEN"]
MARKUP: dict[str, Any] = {"inline_keyboard": []}


class FakeTelegram:
    """Scripted replacement for httpx.post: each item is a status code or an exception."""

    def __init__(self, script: list[Any]) -> None:
        self.script = script
        self.calls = 0

    def __call__(self, url: str, **kwargs: Any) -> httpx.Response:
        self.calls += 1
        outcome = self.script.pop(0)
        if isinstance(outcome, Exception):
            raise outcome
        return httpx.Response(outcome, request=httpx.Request("POST", url))


def _sleeps() -> tuple[list[float], Any]:
    recorded: list[float] = []
    return recorded, recorded.append


@override_settings(**CONFIGURED)
def test_success_sends_once(monkeypatch: pytest.MonkeyPatch) -> None:
    fake = FakeTelegram([200])
    monkeypatch.setattr(httpx, "post", fake)
    recorded, sleep = _sleeps()

    assert send_with_retries(5, "text", MARKUP, sleep=sleep) is True

    assert fake.calls == 1
    assert recorded == []


@override_settings(**CONFIGURED)
def test_retries_then_succeeds_with_backoff(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    fake = FakeTelegram([httpx.ConnectError("x"), 500, 200])
    monkeypatch.setattr(httpx, "post", fake)
    recorded, sleep = _sleeps()

    with caplog.at_level(logging.WARNING, logger="leads.services.notifications"):
        assert send_with_retries(5, "text", MARKUP, sleep=sleep) is True

    assert fake.calls == 3
    assert recorded == [1.0, 2.0]
    assert "lead 5 failed (attempt 1/3): ConnectError" in caplog.text
    assert "lead 5 failed (attempt 2/3): HTTP 500" in caplog.text


@override_settings(**CONFIGURED)
def test_all_failures_are_logged_with_lead_id_and_never_raise(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    fake = FakeTelegram([httpx.ConnectError("x"), httpx.ReadTimeout("y"), 503])
    monkeypatch.setattr(httpx, "post", fake)
    recorded, sleep = _sleeps()

    with caplog.at_level(logging.WARNING, logger="leads.services.notifications"):
        assert send_with_retries(42, "text", MARKUP, sleep=sleep) is False

    assert fake.calls == 3
    assert recorded == [1.0, 2.0]
    assert caplog.text.count("lead 42") == 4
    assert "gave up after 3 attempts" in caplog.text


@override_settings(**CONFIGURED)
def test_unexpected_error_is_swallowed_and_token_not_logged(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    leaky = httpx.ConnectError(f"failed for https://api.telegram.org/bot{TOKEN}/sendMessage")
    monkeypatch.setattr(httpx, "post", FakeTelegram([leaky, leaky, RuntimeError("boom")]))
    _, sleep = _sleeps()

    with caplog.at_level(logging.DEBUG):
        assert send_with_retries(1, "text", MARKUP, sleep=sleep) is False

    assert TOKEN not in caplog.text


@override_settings(TELEGRAM_BOT_TOKEN="", ADMIN_CHAT_ID="999")
def test_missing_token_skips_with_warning(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    def fail_post(url: str, **kwargs: Any) -> httpx.Response:
        raise AssertionError("must not call Telegram")

    monkeypatch.setattr(httpx, "post", fail_post)

    with caplog.at_level(logging.WARNING, logger="leads.services.notifications"):
        assert send_with_retries(3, "text", MARKUP) is False

    assert "lead 3" in caplog.text


@override_settings(TELEGRAM_BOT_TOKEN=TOKEN, ADMIN_CHAT_ID="")
def test_missing_chat_id_skips_with_warning(monkeypatch: pytest.MonkeyPatch) -> None:
    fake = FakeTelegram([200])
    monkeypatch.setattr(httpx, "post", fake)

    assert send_with_retries(3, "text", MARKUP) is False
    assert fake.calls == 0


@override_settings(**CONFIGURED)
def test_notify_builds_message_and_hands_off_to_thread(monkeypatch: pytest.MonkeyPatch) -> None:
    started: list[tuple[Any, ...]] = []
    monkeypatch.setattr(
        notifications,
        "run_in_daemon_thread",
        lambda target, *args: started.append((target, *args)),
    )
    lead = Lead.objects.create(name="Айгүл", contact="+77001234567")

    notify_new_lead(lead)

    target, lead_id, text, markup = started[0]
    assert target is send_with_retries
    assert lead_id == lead.pk
    assert "Новая заявка" in text
    assert markup["inline_keyboard"][0][0]["callback_data"] == f"lead:{lead.pk}:in_progress"


@override_settings(**CONFIGURED)
def test_success_logs_telegram_message_id_without_token(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    body = {"ok": True, "result": {"message_id": 4321}}

    def ok_post(url: str, **kwargs: Any) -> httpx.Response:
        return httpx.Response(200, json=body, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", ok_post)
    _, sleep = _sleeps()

    with caplog.at_level(logging.INFO, logger="leads.services.notifications"):
        assert send_with_retries(9, "text", MARKUP, sleep=sleep) is True

    assert "Telegram notification sent for lead 9 (message_id 4321)" in caplog.text
    assert TOKEN not in caplog.text
