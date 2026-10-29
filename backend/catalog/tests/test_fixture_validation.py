import pytest

from catalog.models import Category, Product
from catalog.services.fixtures import load_fixture, load_fixture_dir, model_fields

pytestmark = pytest.mark.django_db


def test_category_fixtures_pass_full_clean() -> None:
    for item in load_fixture("categories.json"):
        Category(**item).full_clean(validate_unique=False)


def test_product_fixtures_pass_full_clean() -> None:
    relations = ("category", "related", "faqs")
    for item in load_fixture_dir("products"):
        product = Product(**model_fields(item, exclude=relations))
        product.full_clean(exclude=["category"], validate_unique=False)


def test_city_fixture_files_are_one_object_each() -> None:
    cities = load_fixture_dir("cities")
    assert len(cities) == 25
    assert len({city["slug"] for city in cities}) == 25
