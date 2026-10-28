from rest_framework import serializers

from catalog.models import Category


class CategorySerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    product_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = [
            "slug",
            "sort",
            "name_ru",
            "name_kk",
            "name_en",
            "short_ru",
            "short_kk",
            "short_en",
            "intro_ru",
            "intro_kk",
            "intro_en",
            "product_count",
        ]
