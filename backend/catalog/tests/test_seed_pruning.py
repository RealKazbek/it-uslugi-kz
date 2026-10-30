import pytest

from catalog.models import Category, Product
from catalog.services.seed import seed_all

pytestmark = pytest.mark.django_db


def _make_stale_product(slug: str) -> Product:
    return Product.objects.create(
        slug=slug,
        category=Category.objects.get(slug="education"),
        title_ru="Устаревшая услуга",
        title_kk="Ескі қызмет",
        title_en="Stale service",
        price_from_kzt=1000,
        days_min=1,
        days_max=1,
    )


def test_seed_deletes_products_missing_from_fixtures() -> None:
    seed_all()
    _make_stale_product("razbor-old-name")

    seed_all()

    assert not Product.objects.filter(slug="razbor-old-name").exists()
    assert Product.objects.filter(slug="razbor-laboratornyh").exists()


def test_pruning_keeps_fixture_products_and_their_relations() -> None:
    seed_all()
    _make_stale_product("stale-for-relations")

    seed_all()

    diploma = Product.objects.get(slug="diplomnye-proekty")
    assert diploma.related.filter(slug="podgotovka-k-zashite").exists()
    assert not Product.objects.filter(slug="konsultaciya-po-diplomu").exists()


def test_renamed_study_products_are_in_catalog_under_new_slugs() -> None:
    seed_all()

    slugs = set(Product.objects.values_list("slug", flat=True))
    for slug in (
        "razbor-laboratornyh",
        "kursovye-proekty",
        "diplomnye-proekty",
        "praktika-otchet",
        "pomosh-s-kursami",
        "repetitor-programmirovaniya",
        "podgotovka-k-zashite",
    ):
        assert slug in slugs
