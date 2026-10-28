"""Read queries for products. Each query prefetches what the serializers touch (no N+1)."""

from django.db.models import Prefetch, QuerySet

from catalog.models import Product


def _card_queryset() -> QuerySet[Product]:
    """Active products with their category, in catalog order (used for `related`)."""
    return Product.objects.filter(is_active=True).select_related("category").order_by("sort", "id")


def _with_details(queryset: QuerySet[Product]) -> QuerySet[Product]:
    return queryset.select_related("category").prefetch_related(
        "faqs",
        Prefetch("related", queryset=_card_queryset()),
    )


def active_products(category_slug: str | None) -> QuerySet[Product]:
    """Active products ordered by category sort, then product sort."""
    queryset = Product.objects.filter(is_active=True)
    if category_slug:
        queryset = queryset.filter(category__slug=category_slug)
    return _with_details(queryset).order_by("category__sort", "sort", "id")


def active_product(slug: str) -> Product | None:
    return _with_details(Product.objects.filter(is_active=True, slug=slug)).first()
