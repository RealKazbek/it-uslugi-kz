"""Idempotent loader for city fixtures (ru + kk city pages)."""

from typing import Any

from catalog.models import Product
from catalog.services.fixtures import model_fields, resolve_slugs
from cities.models import City


def seed_cities(items: list[dict[str, Any]]) -> int:
    cities: dict[str, City] = {}
    for item in items:
        city, _ = City.objects.update_or_create(
            slug=item["slug"],
            defaults=model_fields(item, exclude=("slug", "product_focus", "nearby")),
        )
        cities[item["slug"]] = city
    for item in items:
        city = cities[item["slug"]]
        owner = f"city {item['slug']}"
        city.product_focus.set(resolve_slugs(Product.objects.all(), item["product_focus"], owner))
        city.nearby.set(resolve_slugs(City.objects.all(), item["nearby"], owner))
    return len(items)
