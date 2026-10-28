import pytest

from leads.models import Lead

pytestmark = pytest.mark.django_db


def test_lead_defaults_to_new_site_lead_in_russian() -> None:
    lead = Lead.objects.create(name="Айгүл", contact="+77001234567")

    assert lead.status == Lead.Status.NEW
    assert lead.source == Lead.Source.SITE
    assert lead.lang == Lead.Lang.RU
    assert lead.channel == Lead.Channel.OTHER
    assert lead.product is None


def test_lead_str_shows_id_name_and_status() -> None:
    lead = Lead.objects.create(name="Айгүл", contact="+77001234567")

    assert str(lead) == f"#{lead.pk} Айгүл (новая)"
