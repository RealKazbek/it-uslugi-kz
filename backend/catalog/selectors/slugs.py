"""Light read of which slugs exist now, for the frontend missing-page check."""

from typing import TypedDict

from catalog.models import Product
from cities.models import City


class SlugSets(TypedDict):
    products: list[str]
    categories: list[str]
    cities: list[str]


def public_slugs() -> SlugSets:
    """Active product slugs, categories with active products, and city slugs (one query per set)."""
    products = list(Product.objects.filter(is_active=True).values_list("slug", flat=True))
    categories = list(
        Product.objects.filter(is_active=True).values_list("category__slug", flat=True).distinct()
    )
    cities = list(City.objects.values_list("slug", flat=True))
    return {"products": products, "categories": categories, "cities": cities}
