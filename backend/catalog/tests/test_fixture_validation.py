from pathlib import Path

import pytest

from catalog.models import Category, Product
from catalog.services.fixtures import (
    SeedError,
    load_fixture,
    load_fixture_dir,
    model_fields,
)

pytestmark = pytest.mark.django_db


def test_category_fixtures_pass_full_clean() -> None:
    for item in load_fixture("categories.json"):
        Category(**item).full_clean(validate_unique=False)


def test_product_fixtures_pass_full_clean() -> None:
    relations = ("category", "related", "faqs")
    products = load_fixture_dir("products")
    assert len(products) == 59
    for item in products:
        product = Product(**model_fields(item, exclude=relations))
        product.full_clean(exclude=["category"], validate_unique=False)


def test_city_fixture_files_are_one_object_each() -> None:
    cities = load_fixture_dir("cities")
    assert len(cities) == 25
    assert len({city["slug"] for city in cities}) == 25


def test_empty_fixture_directory_is_a_seed_error(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    from catalog.services import fixtures

    monkeypatch.setattr(fixtures, "FIXTURES_DIR", tmp_path)
    (tmp_path / "empty").mkdir()
    with pytest.raises(SeedError, match="no fixture files"):
        fixtures.load_fixture_dir("empty")
