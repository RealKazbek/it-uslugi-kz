import logging
from typing import Any

import httpx
import pytest
from django.test import override_settings

from core.services import revalidate
from core.services.revalidate import post_revalidate, schedule_revalidation

URL = "http://frontend.test"


@override_settings(FRONTEND_INTERNAL_URL=URL, INTERNAL_API_TOKEN="internal-secret")
def test_post_sends_tags_with_internal_token(monkeypatch: pytest.MonkeyPatch) -> None:
    calls: list[dict[str, Any]] = []

    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        calls.append({"url": url, **kwargs})
        return httpx.Response(200, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", fake_post)

    assert post_revalidate(["products", "product:lending"]) is True

    assert calls[0]["url"] == f"{URL}/api/revalidate"
    assert calls[0]["headers"] == {"X-Internal-Token": "internal-secret"}
    assert calls[0]["json"] == {"tags": ["products", "product:lending"]}


@override_settings(FRONTEND_INTERNAL_URL=URL, INTERNAL_API_TOKEN="internal-secret")
def test_failure_is_logged_and_not_raised(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
) -> None:
    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        raise httpx.ConnectError("refused")

    monkeypatch.setattr(httpx, "post", fake_post)

    with caplog.at_level(logging.WARNING, logger="core.services.revalidate"):
        assert post_revalidate(["products"]) is False

    assert "Revalidation failed for 1 tags: ConnectError" in caplog.text


@override_settings(FRONTEND_INTERNAL_URL="", INTERNAL_API_TOKEN="internal-secret")
def test_empty_url_skips_the_call(monkeypatch: pytest.MonkeyPatch) -> None:
    def fail_post(url: str, **kwargs: Any) -> httpx.Response:
        raise AssertionError("must not be called")

    monkeypatch.setattr(httpx, "post", fail_post)

    assert post_revalidate(["products"]) is False


@pytest.mark.django_db
@override_settings(FRONTEND_INTERNAL_URL=URL, INTERNAL_API_TOKEN="internal-secret")
def test_schedule_runs_in_thread_after_commit(
    monkeypatch: pytest.MonkeyPatch, django_capture_on_commit_callbacks: Any
) -> None:
    started: list[tuple[Any, ...]] = []
    monkeypatch.setattr(
        revalidate,
        "run_in_daemon_thread",
        lambda target, *args: started.append((target, *args)),
    )

    with django_capture_on_commit_callbacks(execute=False) as callbacks:
        schedule_revalidation(["cities"])
    assert started == []
    assert len(callbacks) == 1

    callbacks[0]()

    assert started == [(post_revalidate, ["cities"])]


@override_settings(FRONTEND_INTERNAL_URL="")
def test_schedule_registers_nothing_without_url(django_capture_on_commit_callbacks: Any) -> None:
    with django_capture_on_commit_callbacks(execute=False) as callbacks:
        schedule_revalidation(["cities"])

    assert callbacks == []
