import pytest
from django.test import Client

from core.tests.factories import make_city, make_product

pytestmark = pytest.mark.django_db


def test_city_detail_ru_returns_genitive_and_no_kk_form(client: Client) -> None:
    make_city(slug="almaty")

    response = client.get("/api/cities/almaty", {"lang": "ru"})

    assert response.status_code == 200
    body = response.json()
    assert body["slug"] == "almaty"
    assert body["name"] == "Алматы"
    assert body["loc"] == "в Алматы"
    assert body["gen"] == "Алматы"
    assert body["attr"] is None
    assert body["region"] == "Крупнейший город"


def test_city_detail_includes_nested_focus_and_nearby(client: Client) -> None:
    almaty = make_city(slug="almaty")
    almaty.product_focus.add(make_product(slug="landing"))
    almaty.nearby.add(make_city(slug="astana", name_kk="Астана"))

    body = client.get("/api/cities/almaty", {"lang": "kk"}).json()

    assert body["product_focus"][0]["slug"] == "landing"
    assert body["product_focus"][0]["title"] == "Қызмет landing"
    assert body["nearby"] == [{"slug": "astana", "name_ru": "Алматы", "name_kk": "Астана"}]


def test_city_detail_without_lang_returns_all_fields(client: Client) -> None:
    make_city(slug="almaty")

    body = client.get("/api/cities/almaty").json()

    assert body["name_ru"] == "Алматы"
    assert body["region_kk"] == "Ірі қала"
    assert body["context_ru"] == "контекст ru"


def test_unknown_city_is_not_found(client: Client) -> None:
    response = client.get("/api/cities/nope", {"lang": "ru"})

    assert response.status_code == 404


@pytest.mark.parametrize("lang", ["en", "xx"])
def test_city_detail_rejects_english(client: Client, lang: str) -> None:
    make_city(slug="almaty")

    response = client.get("/api/cities/almaty", {"lang": lang})

    assert response.status_code == 400
