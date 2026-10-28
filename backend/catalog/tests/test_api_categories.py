import pytest
from django.test import Client

from core.tests.factories import make_category, make_product

pytestmark = pytest.mark.django_db


def test_categories_are_sorted_with_active_product_counts(client: Client) -> None:
    second = make_category(slug="b", sort=2)
    first = make_category(slug="a", sort=1)
    make_product(slug="p1", category=first)
    make_product(slug="p2", category=first, is_active=False)
    make_product(slug="p3", category=second, is_active=False)

    response = client.get("/api/categories")

    assert response.status_code == 200
    body = response.json()
    assert [item["slug"] for item in body] == ["a", "b"]
    assert body[0]["product_count"] == 1
    assert body[1]["product_count"] == 0


def test_categories_include_all_language_fields(client: Client) -> None:
    make_category(slug="web", short_kk="қысқа", intro_en="intro")

    item = client.get("/api/categories").json()[0]

    for key in ("name_ru", "name_kk", "name_en", "short_ru", "short_kk", "short_en"):
        assert key in item
    assert item["short_kk"] == "қысқа"
    assert item["intro_en"] == "intro"
