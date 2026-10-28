from rest_framework import serializers

PRODUCT_LANGS = ("ru", "kk", "en")
CITY_LANGS = ("ru", "kk")


class LangQuery(serializers.Serializer):  # type: ignore[type-arg]
    """Optional `?lang=` for product endpoints. Absent means all per-language fields."""

    lang = serializers.ChoiceField(choices=PRODUCT_LANGS, required=False)


class CityLangQuery(serializers.Serializer):  # type: ignore[type-arg]
    """Optional `?lang=` for city endpoints. Cities have no English content."""

    lang = serializers.ChoiceField(choices=CITY_LANGS, required=False)
