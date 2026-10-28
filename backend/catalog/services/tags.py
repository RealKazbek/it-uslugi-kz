"""Frontend cache tags per record type. Next.js fetches are tagged with exactly these strings."""

from catalog.models import Product
from cities.models import City


def product_tags(slug: str) -> list[str]:
    return ["products", f"product:{slug}", "categories", "cities"]


def category_tags(category_id: int) -> list[str]:
    """The category itself plus every product in it (their pages show the category)."""
    slugs = Product.objects.filter(category_id=category_id).values_list("slug", flat=True)
    return ["categories", "products", *(f"product:{slug}" for slug in slugs)]


def city_tags(slug: str) -> list[str]:
    return ["cities", f"city:{slug}"]


def all_tags() -> list[str]:
    """Every tag the frontend may hold; used once after a full seed."""
    tags = ["products", "categories", "cities"]
    tags.extend(f"product:{slug}" for slug in Product.objects.values_list("slug", flat=True))
    tags.extend(f"city:{slug}" for slug in City.objects.values_list("slug", flat=True))
    return tags
