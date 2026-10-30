import pytest
from django.test import Client

from core.tests.factories import make_category
from leads.models import Lead
from leads.throttles import LeadHourlyThrottle

pytestmark = pytest.mark.django_db

VALID = {"name": "Айгүл", "contact": "+77001234567"}


def _post(client: Client, headers: dict[str, str] | None = None) -> int:
    response = client.post(
        "/api/leads", VALID, content_type="application/json", headers=headers or {}
    )
    return response.status_code


def test_spoofed_forwarded_for_shares_bucket_keyed_on_last_hop(client: Client) -> None:
    statuses = [_post(client, {"X-Forwarded-For": "spoofed1, real"}) for _ in range(5)]
    spoofed_again = _post(client, {"X-Forwarded-For": "spoofed2, real"})
    other_client = _post(client, {"X-Forwarded-For": "spoofed1, other"})

    assert statuses == [201] * 5
    assert spoofed_again == 429
    assert other_client == 201


def test_daily_limit_applies_after_thirty_submissions(
    client: Client, monkeypatch: pytest.MonkeyPatch
) -> None:
    # Lift the hourly limit so only the daily one can trigger.
    monkeypatch.setitem(LeadHourlyThrottle.THROTTLE_RATES, "leads", "1000/hour")

    statuses = [_post(client) for _ in range(31)]

    assert statuses[:30] == [201] * 30
    assert statuses[30] == 429
    assert Lead.objects.count() == 30


def test_authorization_header_is_ignored_on_public_read(client: Client) -> None:
    make_category(slug="web")

    response = client.get("/api/categories", headers={"Authorization": "Basic eHh4Onl5eg=="})

    assert response.status_code == 200


def test_authorization_header_is_ignored_on_lead_post(client: Client) -> None:
    status = _post(client, {"Authorization": "Basic eHh4Onl5eg=="})

    assert status == 201
