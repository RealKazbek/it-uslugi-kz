from typing import Any

from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers


class LocalizedField(serializers.Field[Any, Any, Any, Any]):
    """Reads `<base>_<lang>` from the model; `lang` comes from the serializer context."""

    def __init__(self, base: str, **kwargs: Any) -> None:
        self.base = base
        kwargs.setdefault("read_only", True)
        super().__init__(**kwargs)

    def get_attribute(self, instance: Any) -> Any:
        return getattr(instance, f"{self.base}_{self.context['lang']}")

    def to_representation(self, value: Any) -> Any:
        return value


@extend_schema_field(OpenApiTypes.STR)
class LocalizedText(LocalizedField):
    """Localized text column."""


@extend_schema_field({"type": "array", "items": {"type": "string"}})
class LocalizedList(LocalizedField):
    """Localized JSON list of strings."""


def str_list_field() -> serializers.ListField:
    return serializers.ListField(child=serializers.CharField(), read_only=True)
