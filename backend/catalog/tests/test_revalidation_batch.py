from typing import Any

import httpx
import pytest
from django.db import transaction
from django.test import override_settings

from core.services import revalidate
from core.tests.factories import make_category, make_faq, make_product

pytestmark = pytest.mark.django_db


@override_settings(FRONTEND_INTERNAL_URL="http://frontend.test", INTERNAL_API_TOKEN="t")
def test_product_and_three_faqs_in_one_transaction_send_one_webhook(
    monkeypatch: pytest.MonkeyPatch, django_capture_on_commit_callbacks: Any
) -> None:
    posts: list[list[str]] = []

    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        posts.append(kwargs["json"]["tags"])
        return httpx.Response(200, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", fake_post)
    # Run the batch thread inline so the test can count webhooks.
    monkeypatch.setattr(revalidate, "run_in_daemon_thread", lambda target, *a: target(*a))

    with django_capture_on_commit_callbacks(execute=True), transaction.atomic():
        product = make_product(slug="landing")
        for index in range(3):
            make_faq(product, f"q{index}")

    assert len(posts) == 1
    assert "product:landing" in posts[0]


@override_settings(FRONTEND_INTERNAL_URL="http://frontend.test", INTERNAL_API_TOKEN="t")
def test_rolled_back_transaction_sends_nothing(
    monkeypatch: pytest.MonkeyPatch, django_capture_on_commit_callbacks: Any
) -> None:
    posts: list[list[str]] = []
    monkeypatch.setattr(revalidate, "post_revalidate", lambda tags: posts.append(list(tags)))
    monkeypatch.setattr(revalidate, "run_in_daemon_thread", lambda target, *a: target(*a))

    with django_capture_on_commit_callbacks(execute=True):
        try:
            with transaction.atomic():
                make_category(slug="gone")
                raise RuntimeError("abort")
        except RuntimeError:
            pass

    assert posts == []
