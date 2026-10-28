import pytest
from django.test import Client

from core.tests.factories import make_category, make_city, make_product

pytestmark = pytest.mark.django_db


def test_slugs_lists_active_products_categories_with_active_products_and_cities(
    client: Client,
) -> None:
    web = make_category(slug="web")
    bots = make_category(slug="bots")
    make_product(slug="lending", category=web)
    make_product(slug="hidden", category=bots, is_active=False)
    make_city(slug="almaty")

    response = client.get("/api/slugs")

    assert response.status_code == 200
    body = response.json()
    assert body == {"products": ["lending"], "categories": ["web"], "cities": ["almaty"]}


def test_slugs_is_public_and_needs_no_auth(client: Client) -> None:
    assert client.get("/api/slugs").status_code == 200
