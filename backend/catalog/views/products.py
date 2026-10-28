from drf_spectacular.utils import extend_schema
from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from catalog.selectors.products import active_product, active_products
from catalog.serializers.product import product_data, product_response
from catalog.serializers.query import ProductListQuery
from core.serializers.lang import LangQuery


class ProductListView(APIView):
    @extend_schema(parameters=[ProductListQuery], responses=product_response(many=True))
    def get(self, request: Request) -> Response:
        query = ProductListQuery(data=request.query_params)
        query.is_valid(raise_exception=True)
        params = query.validated_data
        products = active_products(params.get("category"))
        return Response(product_data(products, params.get("lang"), many=True))


class ProductDetailView(APIView):
    @extend_schema(parameters=[LangQuery], responses=product_response(many=False))
    def get(self, request: Request, slug: str) -> Response:
        query = LangQuery(data=request.query_params)
        query.is_valid(raise_exception=True)
        product = active_product(slug)
        if product is None:
            raise NotFound("Product not found.")
        return Response(product_data(product, query.validated_data.get("lang"), many=False))
