from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import HasInternalToken
from leads.selectors.leads import get_lead
from leads.serializers.admin import LeadAdminSerializer, LeadStatusSerializer
from leads.services.lead_status import update_lead_status


class InternalLeadDetailView(APIView):
    authentication_classes: list[Any] = []
    permission_classes = [HasInternalToken]

    @extend_schema(request=LeadStatusSerializer, responses={200: LeadAdminSerializer})
    def patch(self, request: Request, id: int) -> Response:
        serializer = LeadStatusSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = get_lead(id)
        if lead is None:
            raise NotFound("Lead not found.")
        lead = update_lead_status(lead, serializer.validated_data["status"])
        return Response(LeadAdminSerializer(lead).data)
