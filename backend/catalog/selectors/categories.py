from django.db.models import Count, Q, QuerySet

from catalog.models import Category


def categories_with_counts() -> QuerySet[Category]:
    """Categories in sort order, annotated with the number of active products."""
    return Category.objects.annotate(
        product_count=Count("products", filter=Q(products__is_active=True)),
    ).order_by("sort", "id")
