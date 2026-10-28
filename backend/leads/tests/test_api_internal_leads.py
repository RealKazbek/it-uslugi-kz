from typing import Any

import pytest
from django.test import Client, override_settings

from core.tests.factories import make_product
from leads.models import Lead

pytestmark = pytest.mark.django_db

TOKEN = "test-only-internal-token"
BOT_LEAD: dict[str, Any] = {
    "name": "Айгүл",
    "contact": "@aigul",
    "channel": "telegram",
    "message": "Хочу сайт",
    "lang": "ru",
    "telegram_user_id": 424242,
}


def _auth(token: str = TOKEN) -> dict[str, str]:
    return {"X-Internal-Token": token}


@pytest.mark.parametrize(
    ("method", "path"),
    [
        ("get", "/api/internal/leads"),
        ("post", "/api/internal/leads"),
        ("patch", "/api/internal/leads/1"),
        ("get", "/api/internal/stats"),
    ],
)
@pytest.mark.parametrize("headers", [{}, {"X-Internal-Token": "wrong"}])
def test_missing_or_wrong_token_is_forbidden(
    client: Client, method: str, path: str, headers: dict[str, str]
) -> None:
    response = getattr(client, method)(path, headers=headers)

    assert response.status_code == 403


@override_settings(INTERNAL_API_TOKEN="")
def test_unset_server_token_denies_everyone(client: Client) -> None:
    response = client.get("/api/internal/leads", headers=_auth(""))

    assert response.status_code == 403


def test_bot_create_sets_source_bot_and_telegram_user(client: Client) -> None:
    make_product(slug="landing")

    response = client.post(
        "/api/internal/leads",
        {**BOT_LEAD, "product": "landing"},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 201
    lead = Lead.objects.get(pk=response.json()["id"])
    assert lead.source == Lead.Source.BOT
    assert lead.telegram_user_id == 424242
    assert lead.product is not None and lead.product.slug == "landing"


def test_bot_create_validates_like_public(client: Client) -> None:
    response = client.post(
        "/api/internal/leads",
        {"name": "A", "contact": "x"},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 400


def test_list_is_newest_first_with_limit_and_product_title(client: Client) -> None:
    product = make_product(slug="landing")
    old = Lead.objects.create(name="Old Person", contact="c1", product=product)
    Lead.objects.create(name="New Person", contact="c2")

    all_items = client.get("/api/internal/leads", headers=_auth()).json()
    limited = client.get("/api/internal/leads", {"limit": 1}, headers=_auth()).json()

    assert [item["name"] for item in all_items] == ["New Person", "Old Person"]
    assert len(limited) == 1
    assert all_items[1]["id"] == old.pk
    assert all_items[1]["product_title_ru"] == "Услуга landing"
    assert all_items[0]["product_title_ru"] is None


@pytest.mark.parametrize("limit", ["0", "51", "abc"])
def test_list_rejects_limit_out_of_range(client: Client, limit: str) -> None:
    response = client.get("/api/internal/leads", {"limit": limit}, headers=_auth())

    assert response.status_code == 400


def test_patch_updates_status_and_returns_lead(client: Client) -> None:
    lead = Lead.objects.create(name="Айгүл", contact="c")

    response = client.patch(
        f"/api/internal/leads/{lead.pk}",
        {"status": "in_progress"},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 200
    assert response.json()["status"] == "in_progress"
    lead.refresh_from_db()
    assert lead.status == Lead.Status.IN_PROGRESS


def test_patch_unknown_lead_is_not_found(client: Client) -> None:
    response = client.patch(
        "/api/internal/leads/999",
        {"status": "won"},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 404


def test_patch_rejects_unknown_status(client: Client) -> None:
    lead = Lead.objects.create(name="Айгүл", contact="c")

    response = client.patch(
        f"/api/internal/leads/{lead.pk}",
        {"status": "archived"},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 400


@pytest.mark.parametrize("telegram_user_id", [0, -1, 2**63])
def test_telegram_user_id_out_of_range_is_rejected(client: Client, telegram_user_id: int) -> None:
    response = client.post(
        "/api/internal/leads",
        {**BOT_LEAD, "telegram_user_id": telegram_user_id},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 400


def test_telegram_user_id_at_int64_maximum_is_accepted(client: Client) -> None:
    response = client.post(
        "/api/internal/leads",
        {**BOT_LEAD, "telegram_user_id": 2**63 - 1},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 201


def test_bot_unknown_product_is_kept_as_note(client: Client) -> None:
    response = client.post(
        "/api/internal/leads",
        {**BOT_LEAD, "product": "ghost"},
        content_type="application/json",
        headers=_auth(),
    )

    assert response.status_code == 201
    lead = Lead.objects.get(pk=response.json()["id"])
    assert lead.product is None
    assert lead.message.endswith("[product: ghost]")
