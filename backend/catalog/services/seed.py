"""Idempotent loader for the catalog and city fixtures.

Records are matched by slug (update_or_create); M2M links and FAQs are replaced
on every run, so running the seed twice leaves the same rows behind.
"""

import logging
from dataclasses import dataclass
from typing import Any

from django.db import transaction

from catalog.models import Category, Product, ProductFAQ
from catalog.services.fixtures import SeedError, load_fixture, model_fields, resolve_slugs
from cities.services.seed import seed_cities

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class SeedResult:
    categories: int
    products: int
    faqs: int
    cities: int


def seed_all() -> SeedResult:
    with transaction.atomic():
        categories = seed_categories(load_fixture("categories.json"))
        products, faqs = seed_products(load_fixture("products.json"))
        cities = seed_cities(load_fixture("cities.json"))
    result = SeedResult(categories=categories, products=products, faqs=faqs, cities=cities)
    logger.info("Seed finished: %s", result)
    return result


def seed_categories(items: list[dict[str, Any]]) -> int:
    for item in items:
        Category.objects.update_or_create(
            slug=item["slug"],
            defaults=model_fields(item, exclude=("slug",)),
        )
    return len(items)


def seed_products(items: list[dict[str, Any]]) -> tuple[int, int]:
    categories = {category.slug: category for category in Category.objects.all()}
    products: dict[str, Product] = {}
    faq_count = 0
    for item in items:
        slug = item["slug"]
        category = categories.get(item["category"])
        if category is None:
            raise SeedError(f"product {slug}: unknown category {item['category']}")
        defaults = model_fields(item, exclude=("slug", "category", "related", "faqs"))
        product, _ = Product.objects.update_or_create(
            slug=slug,
            defaults={**defaults, "category": category},
        )
        products[slug] = product
        faq_count += _replace_faqs(product, item["faqs"])
    for item in items:
        related = resolve_slugs(Product.objects.all(), item["related"], f"product {item['slug']}")
        products[item["slug"]].related.set(related)
    return len(items), faq_count


def _replace_faqs(product: Product, faqs: list[dict[str, Any]]) -> int:
    ProductFAQ.objects.filter(product=product).delete()
    ProductFAQ.objects.bulk_create(ProductFAQ(product=product, **faq) for faq in faqs)
    return len(faqs)
