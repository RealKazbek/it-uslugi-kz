"""Frontend cache tags per record type. Next.js fetches are tagged with exactly these strings."""

from catalog.models import Product
from cities.models import City


def product_tags(slug: str) -> list[str]:
    return ["products", f"product:{slug}", "categories"]


def category_tags() -> list[str]:
    return ["categories", "products"]


def city_tags(slug: str) -> list[str]:
    return ["cities", f"city:{slug}"]


def all_tags() -> list[str]:
    """Every tag the frontend may hold; used once after a full seed."""
    tags = ["products", "categories", "cities"]
    tags.extend(f"product:{slug}" for slug in Product.objects.values_list("slug", flat=True))
    tags.extend(f"city:{slug}" for slug in City.objects.values_list("slug", flat=True))
    return tags
