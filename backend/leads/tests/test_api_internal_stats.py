from datetime import timedelta

import pytest
from django.test import Client
from django.utils import timezone

from leads.models import Lead

pytestmark = pytest.mark.django_db

ZERO = {"new": 0, "in_progress": 0, "won": 0, "lost": 0}


def test_stats_are_empty_with_all_four_statuses(client: Client) -> None:
    response = client.get("/api/internal/stats", HTTP_X_INTERNAL_TOKEN="test-only-internal-token")

    assert response.status_code == 200
    assert response.json() == {"total": ZERO, "last_7_days": ZERO}


def test_stats_split_all_time_and_last_seven_days(client: Client) -> None:
    Lead.objects.create(name="a1", contact="c", status="new")
    Lead.objects.create(name="a2", contact="c", status="won")
    old = Lead.objects.create(name="b1", contact="c", status="lost")
    Lead.objects.filter(pk=old.pk).update(created_at=timezone.now() - timedelta(days=10))

    body = client.get(
        "/api/internal/stats", HTTP_X_INTERNAL_TOKEN="test-only-internal-token"
    ).json()

    assert body["total"] == {"new": 1, "in_progress": 0, "won": 1, "lost": 1}
    assert body["last_7_days"] == {"new": 1, "in_progress": 0, "won": 1, "lost": 0}
