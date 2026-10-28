import io

import pytest
from django.core.management import call_command

from catalog.models import Category, Product, ProductFAQ
from catalog.services.seed import seed_all
from cities.models import City

pytestmark = pytest.mark.django_db


def test_seed_loads_expected_counts() -> None:
    result = seed_all()

    assert (result.categories, result.products, result.cities) == (8, 59, 25)
    assert result.faqs == 59 * 3
    assert Category.objects.count() == 8
    assert Product.objects.count() == 59
    assert ProductFAQ.objects.count() == 59 * 3
    assert City.objects.count() == 25


def test_every_product_has_three_faqs_in_all_languages() -> None:
    seed_all()

    for product in Product.objects.all():
        faqs = list(product.faqs.all())
        assert len(faqs) == 3, product.slug
        for faq in faqs:
            for lang in ("ru", "kk", "en"):
                assert getattr(faq, f"question_{lang}"), product.slug
                assert getattr(faq, f"answer_{lang}"), product.slug


def test_seed_is_idempotent() -> None:
    seed_all()
    seed_all()

    assert Category.objects.count() == 8
    assert Product.objects.count() == 59
    assert ProductFAQ.objects.count() == 59 * 3
    assert City.objects.count() == 25


def test_seed_restores_edited_product_and_keeps_relations() -> None:
    seed_all()
    Product.objects.filter(slug="lending").update(title_ru="Изменено")

    seed_all()

    lending = Product.objects.get(slug="lending")
    assert lending.title_ru == "Лендинг для бизнеса"
    assert lending.related.filter(slug="sait-vizitka").exists()


def test_seed_command_prints_counts() -> None:
    out = io.StringIO()

    call_command("seed", stdout=out)

    assert "59 products" in out.getvalue()
    assert "25 cities" in out.getvalue()
