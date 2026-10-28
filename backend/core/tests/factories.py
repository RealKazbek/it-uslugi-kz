"""Small builders for test data. Defaults are valid; override any field by keyword."""

from typing import Any

from catalog.models import Category, Product, ProductFAQ
from cities.models import City


def make_category(slug: str = "web", **overrides: Any) -> Category:
    fields: dict[str, Any] = {
        "slug": slug,
        "name_ru": "Веб",
        "name_kk": "Веб",
        "name_en": "Web",
        "sort": 0,
    }
    return Category.objects.create(**{**fields, **overrides})


def default_category() -> Category:
    """The shared "web" category, created once per test."""
    category, _ = Category.objects.get_or_create(
        slug="web",
        defaults={"name_ru": "Веб", "name_kk": "Веб", "name_en": "Web", "sort": 0},
    )
    return category


def make_product(
    slug: str = "landing", category: Category | None = None, **overrides: Any
) -> Product:
    fields: dict[str, Any] = {
        "slug": slug,
        "category": category or default_category(),
        "title_ru": f"Услуга {slug}",
        "title_kk": f"Қызмет {slug}",
        "title_en": f"Service {slug}",
        "short_ru": "коротко",
        "short_kk": "қысқаша",
        "short_en": "short",
        "description_ru": "описание",
        "description_kk": "сипаттама",
        "description_en": "description",
        "for_whom_ru": "для всех",
        "for_whom_kk": "барлығына",
        "for_whom_en": "for all",
        "includes_ru": ["Дизайн"],
        "includes_kk": ["Дизайн-кк"],
        "includes_en": ["Design"],
        "not_included_ru": ["Хостинг"],
        "not_included_kk": ["Хостинг-кк"],
        "not_included_en": ["Hosting"],
        "price_from_kzt": 50000,
        "unit": "once",
        "days_min": 3,
        "days_max": 7,
        "is_active": True,
        "sort": 0,
    }
    return Product.objects.create(**{**fields, **overrides})


def make_faq(product: Product, label: str = "q", sort: int = 0) -> ProductFAQ:
    return ProductFAQ.objects.create(
        product=product,
        question_ru=f"{label} ru",
        question_kk=f"{label} kk",
        question_en=f"{label} en",
        answer_ru=f"a ru {label}",
        answer_kk=f"a kk {label}",
        answer_en=f"a en {label}",
        sort=sort,
    )


def make_city(slug: str = "almaty", **overrides: Any) -> City:
    fields: dict[str, Any] = {
        "slug": slug,
        "name_ru": "Алматы",
        "name_kk": "Алматы",
        "loc_ru": "в Алматы",
        "gen_ru": "Алматы",
        "loc_kk": "Алматыда",
        "attr_kk": "Алматыдағы",
        "region_ru": "Крупнейший город",
        "region_kk": "Ірі қала",
        "context_ru": "контекст ru",
        "context_kk": "контекст kk",
        "sectors_ru": ["Торговля"],
        "sectors_kk": ["Сауда"],
        "in_person": True,
        "sort": 0,
    }
    return City.objects.create(**{**fields, **overrides})
