from typing import Any

import pytest

from core.tests.factories import make_product
from leads.models import Lead
from leads.services.create_lead import create_lead

pytestmark = pytest.mark.django_db


def test_create_lead_saves_row_with_source_and_product() -> None:
    product = make_product(slug="landing")

    lead = create_lead(
        {"name": "Айгүл", "contact": "+77001234567", "product": product, "lang": "kk"},
        source=Lead.Source.BOT,
    )

    saved = Lead.objects.get(pk=lead.pk)
    assert saved.source == Lead.Source.BOT
    assert saved.product == product
    assert saved.lang == "kk"


def test_create_lead_ignores_honeypot_field() -> None:
    lead = create_lead(
        {"name": "Айгүл", "contact": "+77001234567", "website": "spam"},
        source=Lead.Source.SITE,
    )

    assert not hasattr(lead, "website")
    assert Lead.objects.count() == 1


def test_notification_is_scheduled_on_commit(
    monkeypatch: pytest.MonkeyPatch, django_capture_on_commit_callbacks: Any
) -> None:
    notified: list[int] = []
    monkeypatch.setattr(
        "leads.services.create_lead.notify_new_lead",
        lambda lead: notified.append(lead.pk),
    )

    with django_capture_on_commit_callbacks(execute=False) as callbacks:
        lead = create_lead({"name": "Айгүл", "contact": "+77001234567"}, source=Lead.Source.SITE)

    assert notified == []
    assert len(callbacks) == 1
    callbacks[0]()
    assert notified == [lead.pk]
