from django.db.models import QuerySet
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView

from catalog.models import Category
from catalog.selectors.categories import categories_with_counts
from catalog.serializers.category import CategorySerializer


@extend_schema(responses=CategorySerializer(many=True))
class CategoryListView(ListAPIView):  # type: ignore[type-arg]
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self) -> QuerySet[Category]:
        return categories_with_counts()
