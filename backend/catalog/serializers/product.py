from typing import Any

from drf_spectacular.utils import PolymorphicProxySerializer

from catalog.serializers.product_full import ProductFullSerializer
from catalog.serializers.product_local import ProductLocalSerializer


def product_data(products: Any, lang: str | None, many: bool) -> Any:
    """Serialize products in the full shape (no lang) or the flat shape for one language."""
    if lang is None:
        return ProductFullSerializer(products, many=many).data
    return ProductLocalSerializer(products, many=many, context={"lang": lang}).data


def product_response(many: bool) -> PolymorphicProxySerializer:
    """OpenAPI-only: the response is either the full shape or the flat shape, by `lang`."""
    return PolymorphicProxySerializer(
        component_name="Product",
        serializers=[ProductFullSerializer, ProductLocalSerializer],
        resource_type_field_name=None,
        many=many,
    )
