from typing import Any

import pytest

from catalog.models import Product, ProductFAQ
from catalog.services.fixtures import SeedError, load_faq_overrides, load_fixture, load_fixture_dir
from catalog.services.seed import seed_categories, seed_products

pytestmark = pytest.mark.django_db

LANGS = ("ru", "kk", "en")


def _product_item(slug: str, faqs: list[dict[str, Any]]) -> dict[str, Any]:
    """A complete product record: a real fixture's columns under a different slug."""
    base = next(
        item for item in load_fixture_dir("products") if item["slug"] == "razbor-laboratornyh"
    )
    return {**base, "slug": slug, "faqs": faqs, "related": []}


def _faq(tag: str, sort: int = 0) -> dict[str, Any]:
    faq: dict[str, Any] = {"sort": sort}
    for lang in LANGS:
        faq[f"question_{lang}"] = f"{tag} q {lang}"
        faq[f"answer_{lang}"] = f"{tag} a {lang}"
    return faq


@pytest.fixture
def categories() -> None:
    seed_categories(load_fixture("categories.json"))


def test_override_replaces_product_own_faqs(categories: None) -> None:
    items = [_product_item("demo", [_faq("own", 0)])]
    overrides = {"demo": [_faq("study", 0), _faq("study", 1)]}

    _, faq_count = seed_products(items, faq_overrides=overrides)

    assert faq_count == 2
    product = Product.objects.get(slug="demo")
    assert [faq.question_en for faq in product.faqs.all()] == ["study q en", "study q en"]
    assert not ProductFAQ.objects.filter(answer_ru="own a ru").exists()


def test_products_without_override_keep_own_faqs(categories: None) -> None:
    items = [_product_item("demo", [_faq("own")]), _product_item("other", [_faq("kept")])]

    seed_products(items, faq_overrides={"demo": [_faq("study")]})

    assert Product.objects.get(slug="other").faqs.get().answer_en == "kept a en"


def test_override_for_unknown_product_is_a_seed_error(categories: None) -> None:
    items = [_product_item("demo", [_faq("own")])]

    with pytest.raises(SeedError, match="no product fixture for slugs missing-product"):
        seed_products(items, faq_overrides={"missing-product": [_faq("study")]})


def test_study_faq_fixture_has_seven_complete_faqs_per_product() -> None:
    overrides = load_faq_overrides("study_faqs.json")

    assert len(overrides) == 7
    for slug, faqs in overrides.items():
        assert [faq["sort"] for faq in faqs] == list(range(7)), slug
        for faq in faqs:
            for lang in LANGS:
                assert faq[f"question_{lang}"].strip(), slug
                assert faq[f"answer_{lang}"].strip(), slug


def test_study_faqs_are_applied_to_existing_products(categories: None) -> None:
    overrides = load_faq_overrides("study_faqs.json")
    # Study products only; relations are dropped so the subset loads on its own.
    items = [
        {**item, "related": []}
        for item in load_fixture_dir("products")
        if item["slug"] in overrides
    ]
    assert items, "no study product fixtures found"

    seed_products(items, faq_overrides=overrides)

    for slug in (item["slug"] for item in items):
        product = Product.objects.get(slug=slug)
        assert product.faqs.count() == 7, slug
        assert product.faqs.get(sort=0).question_ru == overrides[slug][0]["question_ru"]
