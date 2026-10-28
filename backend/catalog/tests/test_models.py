from typing import Any

import pytest
from django.db import IntegrityError, transaction

from catalog.models import Category, Product, ProductFAQ

pytestmark = pytest.mark.django_db


def make_category(slug: str = "websites") -> Category:
    return Category.objects.create(
        slug=slug,
        name_ru="Сайты",
        name_kk="Сайттар",
        name_en="Websites",
    )


def make_product(category: Category, **overrides: Any) -> Product:
    values: dict[str, Any] = {
        "slug": "lending",
        "category": category,
        "title_ru": "Лендинг",
        "title_kk": "Лендинг",
        "title_en": "Landing page",
        "price_from_kzt": 45000,
        "days_min": 3,
        "days_max": 7,
    }
    values.update(overrides)
    return Product.objects.create(**values)


def test_category_str_uses_russian_name() -> None:
    assert str(make_category()) == "Сайты"


def test_product_str_and_defaults() -> None:
    product = make_product(make_category())

    assert str(product) == "Лендинг"
    assert product.unit == Product.Unit.ONCE
    assert product.is_active is True
    assert product.includes_ru == []


def test_product_slug_is_unique() -> None:
    category = make_category()
    make_product(category)

    with pytest.raises(IntegrityError), transaction.atomic():
        make_product(category)


def test_product_days_max_must_not_be_less_than_min() -> None:
    category = make_category()

    with pytest.raises(IntegrityError), transaction.atomic():
        make_product(category, slug="bad-days", days_min=7, days_max=3)


def test_faq_belongs_to_product_and_is_ordered() -> None:
    product = make_product(make_category())
    ProductFAQ.objects.create(
        product=product,
        question_ru="Второй?",
        question_kk="Екінші?",
        question_en="Second?",
        answer_ru="a",
        answer_kk="a",
        answer_en="a",
        sort=2,
    )
    first = ProductFAQ.objects.create(
        product=product,
        question_ru="Первый?",
        question_kk="Бірінші?",
        question_en="First?",
        answer_ru="a",
        answer_kk="a",
        answer_en="a",
        sort=1,
    )

    assert list(product.faqs.all())[0] == first
    assert str(first) == "Первый?"
