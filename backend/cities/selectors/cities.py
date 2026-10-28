"""Read queries for cities. Related products and nearby cities are prefetched in sort order."""

from django.db.models import Prefetch, QuerySet

from catalog.models import Product
from cities.models import City


def _focus_queryset() -> QuerySet[Product]:
    return Product.objects.filter(is_active=True).select_related("category").order_by("sort", "id")


def _with_relations(queryset: QuerySet[City]) -> QuerySet[City]:
    return queryset.prefetch_related(
        Prefetch("product_focus", queryset=_focus_queryset()),
        Prefetch("nearby", queryset=City.objects.order_by("sort", "id")),
    ).order_by("sort", "id")


def cities_list() -> QuerySet[City]:
    return _with_relations(City.objects.all())


def city_by_slug(slug: str) -> City | None:
    return _with_relations(City.objects.filter(slug=slug)).first()
