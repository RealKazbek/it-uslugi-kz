from typing import Any

import httpx
import pytest
from django.test import override_settings

from catalog.services.seed import seed_all

pytestmark = pytest.mark.django_db


@override_settings(FRONTEND_INTERNAL_URL="http://frontend.test", INTERNAL_API_TOKEN="t")
def test_full_seed_fires_exactly_one_revalidation(
    monkeypatch: pytest.MonkeyPatch, django_capture_on_commit_callbacks: Any
) -> None:
    posts: list[list[str]] = []

    def fake_post(url: str, **kwargs: Any) -> httpx.Response:
        posts.append(kwargs["json"]["tags"])
        return httpx.Response(200, request=httpx.Request("POST", url))

    monkeypatch.setattr(httpx, "post", fake_post)

    with django_capture_on_commit_callbacks(execute=True):
        seed_all()

    assert len(posts) == 1
    assert {"products", "categories", "cities", "product:lending", "city:almaty"} <= set(posts[0])
