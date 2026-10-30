from typing import Any

import pytest
from django.test import Client

from catalog.models import Product
from core.tests.factories import make_category, make_faq, make_product

pytestmark = pytest.mark.django_db


def test_list_without_lang_returns_all_language_fields(client: Client) -> None:
    make_product(slug="landing")

    response = client.get("/api/products")

    assert response.status_code == 200
    item = response.json()[0]
    assert item["title_ru"] == "Услуга landing"
    assert item["title_kk"] == "Қызмет landing"
    assert item["title_en"] == "Service landing"
    assert item["includes_kk"] == ["Дизайн-кк"]
    assert item["category"] == "web"


def test_list_with_lang_returns_flat_localized_fields(client: Client) -> None:
    product = make_product(slug="landing")
    make_faq(product, "Срок")

    response = client.get("/api/products", {"lang": "en"})

    assert response.status_code == 200
    item = response.json()[0]
    assert set(item) == {
        "slug",
        "category",
        "title",
        "short",
        "description",
        "for_whom",
        "includes",
        "not_included",
        "price_from_kzt",
        "unit",
        "days_min",
        "days_max",
        "is_onsite",
        "faqs",
        "related",
        "updated_at",
    }
    assert item["title"] == "Service landing"
    assert item["includes"] == ["Design"]
    assert item["faqs"] == [{"question": "Срок en", "answer": "a en Срок"}]


def test_list_orders_by_category_sort_then_product_sort(client: Client) -> None:
    late = make_category(slug="late", sort=2)
    early = make_category(slug="early", sort=1)
    make_product(slug="late-b", category=late, sort=1)
    make_product(slug="late-a", category=late, sort=0)
    make_product(slug="early-a", category=early, sort=5)

    slugs = [item["slug"] for item in client.get("/api/products").json()]

    assert slugs == ["early-a", "late-a", "late-b"]


def test_list_filters_by_category_and_unknown_category_is_empty(client: Client) -> None:
    other = make_category(slug="other")
    make_product(slug="landing")
    make_product(slug="shop", category=other)

    filtered = client.get("/api/products", {"category": "other"}).json()
    unknown = client.get("/api/products", {"category": "nope"})

    assert [item["slug"] for item in filtered] == ["shop"]
    assert unknown.status_code == 200
    assert unknown.json() == []


def test_list_hides_inactive_products(client: Client) -> None:
    make_product(slug="live")
    make_product(slug="hidden", is_active=False)

    slugs = [item["slug"] for item in client.get("/api/products", {"lang": "ru"}).json()]

    assert slugs == ["live"]


@pytest.mark.parametrize("lang", ["fr", "RU", "de"])
def test_list_rejects_unsupported_lang(client: Client, lang: str) -> None:
    response = client.get("/api/products", {"lang": lang})

    assert response.status_code == 400


def test_list_query_count_stays_constant(
    client: Client, django_assert_max_num_queries: Any
) -> None:
    for index in range(5):
        make_faq(make_product(slug=f"p{index}"), f"f{index}")
    products = list(Product.objects.order_by("id"))
    products[0].related.set(products[1:])

    with django_assert_max_num_queries(4):
        response = client.get("/api/products", {"lang": "ru"})

    assert response.status_code == 200
    assert len(response.json()) == 5


def test_product_list_cards_include_unit_and_days(client: Client) -> None:
    category = make_category(slug="days-list")
    make_product(slug="days-card", category=category, days_min=2, days_max=4, unit="month")

    body = client.get("/api/products", {"lang": "ru", "category": "days-list"}).json()

    assert body[0]["unit"] == "month"
    assert body[0]["days_min"] == 2
    assert body[0]["days_max"] == 4
