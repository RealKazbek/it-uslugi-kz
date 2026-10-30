from typing import Any

import pytest
from django.test import Client

from reviews.models import Review

pytestmark = pytest.mark.django_db

VALID: dict[str, Any] = {
    "name": "Айгүл",
    "company": "ТОО Рога",
    "city": "Алматы",
    "rating": 5,
    "text": "Сделали сайт быстро и аккуратно.",
    "locale": "ru",
}


def test_list_is_empty_without_approved_reviews(client: Client) -> None:
    Review.objects.create(**{**VALID, "is_approved": False})
    body = client.get("/api/reviews").json()
    assert body["results"] == []


def test_list_returns_only_approved_with_gis_link(client: Client, settings: Any) -> None:
    settings.REVIEWS_2GIS_URL = "https://2gis.kz/almaty/firm/1"
    Review.objects.create(**{**VALID, "is_approved": True})
    Review.objects.create(**{**VALID, "name": "Скрытый", "is_approved": False})
    body = client.get("/api/reviews").json()
    assert [item["name"] for item in body["results"]] == ["Айгүл"]
    assert body["gis_url"] == "https://2gis.kz/almaty/firm/1"
    assert "is_approved" not in body["results"][0]


def test_submit_stores_unapproved_review(client: Client) -> None:
    response = client.post("/api/reviews", VALID, content_type="application/json")
    assert response.status_code == 201
    assert response.json() == {"ok": True}
    assert Review.objects.get().is_approved is False


def test_honeypot_returns_ok_but_stores_nothing(client: Client) -> None:
    response = client.post(
        "/api/reviews", {**VALID, "website": "http://spam"}, content_type="application/json"
    )
    assert response.status_code == 201
    assert Review.objects.count() == 0


@pytest.mark.parametrize("patch", [{"rating": 0}, {"rating": 6}, {"text": "коротко"}, {"name": ""}])
def test_invalid_input_is_rejected(client: Client, patch: dict[str, Any]) -> None:
    response = client.post("/api/reviews", {**VALID, **patch}, content_type="application/json")
    assert response.status_code == 400
    assert Review.objects.count() == 0


def test_submissions_are_rate_limited(client: Client) -> None:
    statuses = [
        client.post("/api/reviews", VALID, content_type="application/json").status_code
        for _ in range(3)
    ]
    assert statuses == [201, 201, 429]
