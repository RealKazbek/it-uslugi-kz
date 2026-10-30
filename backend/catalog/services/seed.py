"""Idempotent loader for the catalog and city fixtures.

Records are matched by slug (update_or_create); M2M links and FAQs are replaced
on every run, so running the seed twice leaves the same rows behind.
"""

import logging
from dataclasses import dataclass
from typing import Any

from django.db import transaction

from catalog.models import Category, Product, ProductFAQ
from catalog.services.fixtures import (
    SeedError,
    load_faq_overrides,
    load_fixture,
    load_fixture_dir,
    model_fields,
    resolve_slugs,
)
from catalog.services.tags import all_tags
from catalog.signals import revalidation_suppressed
from cities.services.seed import seed_cities
from core.services.revalidate import post_revalidate

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class SeedResult:
    categories: int
    products: int
    faqs: int
    cities: int


def seed_all() -> SeedResult:
    """Load all fixtures. Revalidation is suppressed while writing and fired once at the end."""
    with revalidation_suppressed(), transaction.atomic():
        categories = seed_categories(load_fixture("categories.json"))
        products, faqs = seed_products(
            load_fixture_dir("products"), faq_overrides=load_faq_overrides("study_faqs.json")
        )
        cities = seed_cities(load_fixture_dir("cities"))
    result = SeedResult(categories=categories, products=products, faqs=faqs, cities=cities)
    post_revalidate(all_tags())
    logger.info("Seed finished: %s", result)
    return result


def seed_categories(items: list[dict[str, Any]]) -> int:
    for item in items:
        Category.objects.update_or_create(
            slug=item["slug"],
            defaults=model_fields(item, exclude=("slug",)),
        )
    return len(items)


def seed_products(
    items: list[dict[str, Any]],
    faq_overrides: dict[str, list[dict[str, Any]]] | None = None,
) -> tuple[int, int]:
    """Load products; a slug in `faq_overrides` gets those FAQs instead of its own."""
    overrides = faq_overrides or {}
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
        faq_count += _replace_faqs(product, overrides.get(slug, item["faqs"]))
    unknown = sorted(set(overrides) - set(products))
    if unknown:
        raise SeedError(f"study_faqs.json: no product fixture for slugs {', '.join(unknown)}")
    for item in items:
        related = resolve_slugs(Product.objects.all(), item["related"], f"product {item['slug']}")
        products[item["slug"]].related.set(related)
    _prune_stale_products(set(products))
    return len(items), faq_count


def _prune_stale_products(slugs: set[str]) -> int:
    """Delete products whose slug is no longer in the fixtures (renamed or removed)."""
    stale = Product.objects.exclude(slug__in=slugs)
    removed = list(stale.values_list("slug", flat=True))
    if removed:
        stale.delete()
        logger.info("Pruned products missing from fixtures: %s", ", ".join(sorted(removed)))
    return len(removed)


def _replace_faqs(product: Product, faqs: list[dict[str, Any]]) -> int:
    ProductFAQ.objects.filter(product=product).delete()
    ProductFAQ.objects.bulk_create(ProductFAQ(product=product, **faq) for faq in faqs)
    return len(faqs)
