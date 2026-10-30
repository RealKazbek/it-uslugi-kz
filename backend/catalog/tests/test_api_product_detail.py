import pytest
from django.test import Client

from core.tests.factories import make_faq, make_product

pytestmark = pytest.mark.django_db


def test_detail_with_lang_returns_flat_fields_with_related(client: Client) -> None:
    product = make_product(slug="landing")
    make_faq(product, "срок")
    make_product(slug="card", sort=2, category=product.category)
    product.related.add(make_product(slug="seo", sort=1, category=product.category))

    response = client.get("/api/products/landing", {"lang": "kk"})

    assert response.status_code == 200
    body = response.json()
    assert body["slug"] == "landing"
    assert body["title"] == "Қызмет landing"
    assert body["includes"] == ["Дизайн-кк"]
    assert body["faqs"] == [{"question": "срок kk", "answer": "a kk срок"}]
    assert [item["slug"] for item in body["related"]] == ["seo"]
    assert set(body["related"][0]) == {
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
    assert body["related"][0]["category"] == "web"
    assert "updated_at" in body


def test_detail_without_lang_returns_all_language_fields(client: Client) -> None:
    make_product(slug="landing")

    body = client.get("/api/products/landing").json()

    assert body["title_ru"] == "Услуга landing"
    assert body["title_en"] == "Service landing"
    assert body["not_included_ru"] == ["Хостинг"]
    assert body["related"] == []


def test_detail_hides_inactive_related_products(client: Client) -> None:
    product = make_product(slug="landing")
    product.related.add(make_product(slug="gone", is_active=False))

    body = client.get("/api/products/landing", {"lang": "ru"}).json()

    assert body["related"] == []


def test_inactive_product_is_not_found(client: Client) -> None:
    make_product(slug="hidden", is_active=False)

    response = client.get("/api/products/hidden")

    assert response.status_code == 404


def test_unknown_product_is_not_found(client: Client) -> None:
    response = client.get("/api/products/nope", {"lang": "ru"})

    assert response.status_code == 404


def test_detail_rejects_bad_lang(client: Client) -> None:
    make_product(slug="landing")

    response = client.get("/api/products/landing", {"lang": "de"})

    assert response.status_code == 400
