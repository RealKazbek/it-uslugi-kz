import pytest

from catalog.models import Category, Product
from catalog.services.fixtures import load_fixture, model_fields

pytestmark = pytest.mark.django_db


def test_category_fixtures_pass_full_clean() -> None:
    for item in load_fixture("categories.json"):
        Category(**item).full_clean(validate_unique=False)


def test_product_fixtures_pass_full_clean() -> None:
    relations = ("category", "related", "faqs")
    for item in load_fixture("products.json"):
        product = Product(**model_fields(item, exclude=relations))
        product.full_clean(exclude=["category"], validate_unique=False)
