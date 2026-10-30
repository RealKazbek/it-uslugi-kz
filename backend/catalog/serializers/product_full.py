"""Product shapes with every language column (returned when `lang` is absent)."""

from rest_framework import serializers

from catalog.models import Product, ProductFAQ
from core.serializers.fields import str_list_field


class FaqFullSerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    class Meta:
        model = ProductFAQ
        fields = [
            "question_ru",
            "question_kk",
            "question_en",
            "answer_ru",
            "answer_kk",
            "answer_en",
        ]


class ProductCardFullSerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    category = serializers.CharField(source="category.slug", read_only=True)

    class Meta:
        model = Product
        fields = [
            "slug",
            "category",
            "title_ru",
            "title_kk",
            "title_en",
            "short_ru",
            "short_kk",
            "short_en",
            "price_from_kzt",
            "unit",
            "days_min",
            "days_max",
            "is_onsite",
        ]


class ProductFullSerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    category = serializers.CharField(source="category.slug", read_only=True)
    includes_ru = str_list_field()
    includes_kk = str_list_field()
    includes_en = str_list_field()
    not_included_ru = str_list_field()
    not_included_kk = str_list_field()
    not_included_en = str_list_field()
    faqs = FaqFullSerializer(many=True, read_only=True)
    related = ProductCardFullSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "slug",
            "category",
            "title_ru",
            "title_kk",
            "title_en",
            "short_ru",
            "short_kk",
            "short_en",
            "description_ru",
            "description_kk",
            "description_en",
            "for_whom_ru",
            "for_whom_kk",
            "for_whom_en",
            "includes_ru",
            "includes_kk",
            "includes_en",
            "not_included_ru",
            "not_included_kk",
            "not_included_en",
            "price_from_kzt",
            "unit",
            "days_min",
            "days_max",
            "is_onsite",
            "faqs",
            "related",
            "updated_at",
        ]
