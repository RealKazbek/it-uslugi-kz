import pytest
from django.test import Client

from catalog.services.seed import seed_all
from cities.models import City

pytestmark = pytest.mark.django_db


def test_seeded_almaty_has_six_reasons_per_language_keyed_by_focus_slugs() -> None:
    seed_all()

    almaty = City.objects.get(slug="almaty")
    focus_slugs = set(almaty.product_focus.values_list("slug", flat=True))

    assert len(almaty.focus_why_ru) == 6
    assert len(almaty.focus_why_kk) == 6
    assert set(almaty.focus_why_ru) == focus_slugs
    assert set(almaty.focus_why_kk) == focus_slugs


def test_every_seeded_city_has_reasons_for_exactly_its_focus_products() -> None:
    seed_all()

    for city in City.objects.all():
        focus_slugs = set(city.product_focus.values_list("slug", flat=True))
        assert set(city.focus_why_ru) == focus_slugs, city.slug
        assert set(city.focus_why_kk) == focus_slugs, city.slug
        assert all(text.strip() for text in city.focus_why_ru.values()), city.slug


def test_city_api_returns_reasons_for_the_request_language(client: Client) -> None:
    seed_all()

    ru = client.get("/api/cities/almaty", {"lang": "ru"}).json()
    kk = client.get("/api/cities/almaty", {"lang": "kk"}).json()

    assert set(ru["focus_why"]) == {p["slug"] for p in ru["product_focus"]}
    assert ru["focus_why"]["sait-dlya-stomatologii"].startswith("В Алматы много частных клиник")
    assert kk["focus_why"]["sait-dlya-stomatologii"].startswith("Алматыдағы жеке клиникаларда")


def test_city_api_without_lang_returns_both_language_maps(client: Client) -> None:
    seed_all()

    body = client.get("/api/cities/almaty").json()

    assert len(body["focus_why_ru"]) == 6
    assert len(body["focus_why_kk"]) == 6
