import logging
from typing import Any

import pytest
from django.test import Client

from core.tests.factories import make_product
from leads.models import Lead

pytestmark = pytest.mark.django_db

VALID: dict[str, Any] = {
    "name": "Айгүл",
    "contact": "+77001234567",
    "channel": "whatsapp",
    "message": "Нужен лендинг",
    "page_url": "https://uslugi.realkazbek.site/products/landing",
    "lang": "ru",
}


def test_valid_lead_is_saved_and_returns_id(
    client: Client, django_capture_on_commit_callbacks: Any
) -> None:
    make_product(slug="landing")

    with django_capture_on_commit_callbacks(execute=False):
        response = client.post(
            "/api/leads", {**VALID, "product": "landing"}, content_type="application/json"
        )

    assert response.status_code == 201
    lead = Lead.objects.get(pk=response.json()["id"])
    assert response.json() == {"ok": True, "id": lead.pk}
    assert lead.source == Lead.Source.SITE
    assert lead.product is not None and lead.product.slug == "landing"
    assert lead.channel == "whatsapp"


def test_lead_without_product_is_saved(client: Client) -> None:
    response = client.post(
        "/api/leads", {"name": "Айгүл", "contact": "+77001234567"}, content_type="application/json"
    )

    assert response.status_code == 201
    assert Lead.objects.get().product is None


@pytest.mark.parametrize(
    "override",
    [
        {"name": "A"},
        {"name": "x" * 81},
        {"contact": "12"},
        {"channel": "fax"},
        {"lang": "de"},
        {"page_url": "not a url"},
        {"message": "m" * 2001},
        {"product": "missing"},
    ],
)
def test_invalid_payload_is_rejected(client: Client, override: dict[str, Any]) -> None:
    response = client.post("/api/leads", {**VALID, **override}, content_type="application/json")

    assert response.status_code == 400
    assert Lead.objects.count() == 0


def test_inactive_product_is_rejected(client: Client) -> None:
    make_product(slug="hidden", is_active=False)

    response = client.post(
        "/api/leads", {**VALID, "product": "hidden"}, content_type="application/json"
    )

    assert response.status_code == 400
    assert "product" in response.json()


def test_filled_honeypot_returns_ok_and_saves_nothing(
    client: Client, caplog: pytest.LogCaptureFixture
) -> None:
    with caplog.at_level(logging.INFO, logger="leads.views.public"):
        response = client.post(
            "/api/leads",
            {**VALID, "website": "http://spam.example"},
            content_type="application/json",
        )

    assert response.status_code == 201
    assert response.json() == {"ok": True}
    assert Lead.objects.count() == 0
    assert "honeypot" in caplog.text


def test_sixth_submission_in_a_minute_is_throttled(client: Client) -> None:
    statuses = [
        client.post("/api/leads", VALID, content_type="application/json").status_code
        for _ in range(6)
    ]

    assert statuses[:5] == [201] * 5
    assert statuses[5] == 429
    assert Lead.objects.count() == 5
