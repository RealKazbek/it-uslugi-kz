from drf_spectacular.utils import extend_schema
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from catalog.selectors.slugs import public_slugs
from catalog.serializers.slugs import SlugSetsSerializer


class SlugsView(APIView):
    """Public, cached by the frontend. Returns slug lists only."""

    @extend_schema(responses=SlugSetsSerializer)
    def get(self, request: Request) -> Response:
        return Response(SlugSetsSerializer(public_slugs()).data)
