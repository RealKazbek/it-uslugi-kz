"""Flat, single-language product shapes (returned when `lang=ru|kk|en`)."""

from rest_framework import serializers

from core.serializers.fields import LocalizedList, LocalizedText


class FaqLocalSerializer(serializers.Serializer):  # type: ignore[type-arg]
    question = LocalizedText("question")
    answer = LocalizedText("answer")


class ProductCardLocalSerializer(serializers.Serializer):  # type: ignore[type-arg]
    slug = serializers.CharField(read_only=True)
    category = serializers.CharField(source="category.slug", read_only=True)
    title = LocalizedText("title")
    short = LocalizedText("short")
    price_from_kzt = serializers.IntegerField(read_only=True)
    unit = serializers.CharField(read_only=True)
    days_min = serializers.IntegerField(read_only=True)
    days_max = serializers.IntegerField(read_only=True)
    is_onsite = serializers.BooleanField(read_only=True)


class ProductLocalSerializer(ProductCardLocalSerializer):
    description = LocalizedText("description")
    for_whom = LocalizedText("for_whom")
    includes = LocalizedList("includes")
    not_included = LocalizedList("not_included")
    faqs = FaqLocalSerializer(many=True, read_only=True)
    related = ProductCardLocalSerializer(many=True, read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
