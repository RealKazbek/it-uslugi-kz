from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import HasInternalToken
from leads.selectors.stats import lead_stats
from leads.serializers.admin import LeadStatsSerializer, stats_data


class InternalStatsView(APIView):
    authentication_classes: list[Any] = []
    permission_classes = [HasInternalToken]

    @extend_schema(responses={200: LeadStatsSerializer})
    def get(self, request: Request) -> Response:
        return Response(stats_data(lead_stats()))
