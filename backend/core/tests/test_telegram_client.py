from typing import Any

import httpx
import pytest
from django.test import override_settings

from core.services.telegram import send_message

pytestmark = pytest.mark.django_db


def _post(response: httpx.Response) -> Any:
    def fake(url: str, **kwargs: Any) -> httpx.Response:
        return response

    return fake


@override_settings(TELEGRAM_BOT_TOKEN="123456:TEST-ONLY-TOKEN")
def test_send_message_returns_message_id(monkeypatch: pytest.MonkeyPatch) -> None:
    response = httpx.Response(
        200,
        json={"ok": True, "result": {"message_id": 77}},
        request=httpx.Request("POST", "http://t"),
    )
    monkeypatch.setattr(httpx, "post", _post(response))
    assert send_message("1", "hi") == 77


@override_settings(TELEGRAM_BOT_TOKEN="123456:TEST-ONLY-TOKEN")
def test_send_message_returns_none_when_result_has_no_id(monkeypatch: pytest.MonkeyPatch) -> None:
    response = httpx.Response(200, text="not json", request=httpx.Request("POST", "http://t"))
    monkeypatch.setattr(httpx, "post", _post(response))
    assert send_message("1", "hi") is None
