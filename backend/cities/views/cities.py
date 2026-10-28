from drf_spectacular.utils import extend_schema
from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from cities.selectors.cities import cities_list, city_by_slug
from cities.serializers.city import city_data, city_response
from core.serializers.lang import CityLangQuery


class CityListView(APIView):
    @extend_schema(parameters=[CityLangQuery], responses=city_response(many=True))
    def get(self, request: Request) -> Response:
        query = CityLangQuery(data=request.query_params)
        query.is_valid(raise_exception=True)
        cities = cities_list()
        return Response(city_data(cities, query.validated_data.get("lang"), many=True))


class CityDetailView(APIView):
    @extend_schema(parameters=[CityLangQuery], responses=city_response(many=False))
    def get(self, request: Request, slug: str) -> Response:
        query = CityLangQuery(data=request.query_params)
        query.is_valid(raise_exception=True)
        city = city_by_slug(slug)
        if city is None:
            raise NotFound("City not found.")
        return Response(city_data(city, query.validated_data.get("lang"), many=False))
