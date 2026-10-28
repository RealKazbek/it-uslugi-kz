from typing import Any

import httpx
import pytest
from django.test import override_settings

from core.services.telegram import TelegramError, send_message

TOKEN = "123456:TEST-TOKEN-VALUE"


@override_settings(TELEGRAM_BOT_TOKEN=TOKEN)
def test_send_message_posts_html_with_markup(monkeypatch: pytest.MonkeyPatch) -> None:
    calls: list[dict[str, Any]] = []

    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        calls.append({"url": url, **kwargs})
        return httpx.Response(200, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", fake_post)
    markup = {"inline_keyboard": [[{"text": "x", "callback_data": "lead:1:won"}]]}

    send_message("42", "<b>hi</b>", markup)

    assert calls[0]["url"] == f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    assert calls[0]["json"]["chat_id"] == "42"
    assert calls[0]["json"]["parse_mode"] == "HTML"
    assert calls[0]["json"]["reply_markup"] == markup


def test_send_message_raises_on_http_error(monkeypatch: pytest.MonkeyPatch) -> None:
    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        return httpx.Response(500, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", fake_post)

    with pytest.raises(TelegramError):
        send_message("42", "text")


def test_error_response_description_is_kept_for_logs(monkeypatch: pytest.MonkeyPatch) -> None:
    from core.services.errors import describe_error
    from core.services.telegram import TelegramError

    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        body = {"ok": False, "description": "Bad Request: chat not found"}
        return httpx.Response(400, json=body, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", fake_post)

    with pytest.raises(TelegramError) as caught:
        send_message("42", "text")

    assert describe_error(caught.value) == "HTTP 400: Bad Request: chat not found"
    assert "TOKEN" not in describe_error(caught.value)
