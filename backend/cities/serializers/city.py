"""City shapes: every language column, or the flat shape for one language (ru or kk)."""

from typing import Any

from drf_spectacular.utils import PolymorphicProxySerializer
from rest_framework import serializers

from catalog.serializers.product_full import ProductCardFullSerializer
from catalog.serializers.product_local import ProductCardLocalSerializer
from cities.models import City
from core.serializers.fields import LocalizedList, LocalizedText, str_list_field


class CityRefSerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    class Meta:
        model = City
        fields = ["slug", "name_ru", "name_kk"]


class CityFullSerializer(serializers.ModelSerializer):  # type: ignore[type-arg]
    sectors_ru = str_list_field()
    sectors_kk = str_list_field()
    product_focus = ProductCardFullSerializer(many=True, read_only=True)
    nearby = CityRefSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = [
            "slug",
            "name_ru",
            "name_kk",
            "loc_ru",
            "gen_ru",
            "loc_kk",
            "attr_kk",
            "region_ru",
            "region_kk",
            "context_ru",
            "context_kk",
            "sectors_ru",
            "sectors_kk",
            "in_person",
            "product_focus",
            "nearby",
        ]


class CityLocalSerializer(serializers.Serializer):  # type: ignore[type-arg]
    slug = serializers.CharField(read_only=True)
    name = LocalizedText("name")
    loc = LocalizedText("loc")
    region = LocalizedText("region")
    market_context = LocalizedText("context")
    sectors = LocalizedList("sectors")
    in_person = serializers.BooleanField(read_only=True)
    gen = serializers.SerializerMethodField()
    attr = serializers.SerializerMethodField()
    product_focus = ProductCardLocalSerializer(many=True, read_only=True)
    nearby = CityRefSerializer(many=True, read_only=True)

    def get_gen(self, obj: City) -> str | None:
        """Genitive form exists for Russian only (null for kk)."""
        return obj.gen_ru if self.context["lang"] == "ru" else None

    def get_attr(self, obj: City) -> str | None:
        """Kazakh attributive form ("Алматыдағы") exists for kk only (null for ru)."""
        return obj.attr_kk if self.context["lang"] == "kk" else None


def city_data(cities: Any, lang: str | None, many: bool) -> Any:
    if lang is None:
        return CityFullSerializer(cities, many=many).data
    return CityLocalSerializer(cities, many=many, context={"lang": lang}).data


def city_response(many: bool) -> PolymorphicProxySerializer:
    """OpenAPI-only: the response is either the full shape or the flat shape, by `lang`."""
    return PolymorphicProxySerializer(
        component_name="City",
        serializers=[CityFullSerializer, CityLocalSerializer],
        resource_type_field_name=None,
        many=many,
    )
