from typing import Any

import pytest
from django.test import Client

from core.tests.factories import make_city, make_product

pytestmark = pytest.mark.django_db


def test_cities_with_lang_return_flat_fields(client: Client) -> None:
    make_city(slug="almaty")

    response = client.get("/api/cities", {"lang": "kk"})

    assert response.status_code == 200
    item = response.json()[0]
    assert item["name"] == "Алматы"
    assert item["loc"] == "Алматыда"
    assert item["attr"] == "Алматыдағы"
    assert item["gen"] is None
    assert item["market_context"] == "контекст kk"
    assert item["sectors"] == ["Сауда"]
    assert item["in_person"] is True


def test_cities_without_lang_return_all_language_fields(client: Client) -> None:
    make_city(slug="almaty")

    item = client.get("/api/cities").json()[0]

    assert item["loc_ru"] == "в Алматы"
    assert item["loc_kk"] == "Алматыда"
    assert item["sectors_kk"] == ["Сауда"]
    assert item["product_focus"] == []
    assert item["nearby"] == []


def test_cities_are_ordered_by_sort(client: Client) -> None:
    make_city(slug="b", sort=2)
    make_city(slug="a", sort=1)

    slugs = [item["slug"] for item in client.get("/api/cities", {"lang": "ru"}).json()]

    assert slugs == ["a", "b"]


@pytest.mark.parametrize("lang", ["en", "fr"])
def test_cities_reject_english_and_unknown_lang(client: Client, lang: str) -> None:
    make_city(slug="almaty")

    response = client.get("/api/cities", {"lang": lang})

    assert response.status_code == 400


def test_city_focus_products_are_short_and_active_only(client: Client) -> None:
    city = make_city(slug="almaty")
    live = make_product(slug="live")
    city.product_focus.add(live, make_product(slug="off", is_active=False))

    item = client.get("/api/cities", {"lang": "ru"}).json()[0]

    assert [p["slug"] for p in item["product_focus"]] == ["live"]
    assert set(item["product_focus"][0]) == {
        "slug",
        "category",
        "title",
        "short",
        "price_from_kzt",
        "unit",
        "days_min",
        "days_max",
        "is_onsite",
    }


def test_nearby_items_are_name_refs_in_sort_order(client: Client) -> None:
    almaty = make_city(slug="almaty")
    far = make_city(slug="far", sort=5)
    near = make_city(slug="near", sort=1)
    almaty.nearby.set([far, near])

    item = client.get("/api/cities/almaty").json()

    assert item["nearby"] == [
        {"slug": "near", "name_ru": "Алматы", "name_kk": "Алматы"},
        {"slug": "far", "name_ru": "Алматы", "name_kk": "Алматы"},
    ]


def test_city_query_count_is_constant(client: Client, django_assert_max_num_queries: Any) -> None:
    cities = [make_city(slug=f"c{index}", sort=index) for index in range(5)]
    product = make_product(slug="shared")
    for city in cities:
        city.product_focus.add(product)
        city.nearby.set(cities)

    with django_assert_max_num_queries(4):
        response = client.get("/api/cities", {"lang": "ru"})

    assert response.status_code == 200
    assert len(response.json()) == 5
