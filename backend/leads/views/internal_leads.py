from typing import Any

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import HasInternalToken
from leads.models import Lead
from leads.selectors.leads import recent_leads
from leads.serializers.admin import LeadAdminSerializer, LeadListQuery
from leads.serializers.lead import LeadCreatedSerializer, LeadInternalSerializer
from leads.services.create_lead import create_lead


class InternalLeadsView(APIView):
    authentication_classes: list[Any] = []
    permission_classes = [HasInternalToken]

    @extend_schema(parameters=[LeadListQuery], responses={200: LeadAdminSerializer(many=True)})
    def get(self, request: Request) -> Response:
        query = LeadListQuery(data=request.query_params)
        query.is_valid(raise_exception=True)
        limit = query.validated_data.get("limit", 10)
        return Response(LeadAdminSerializer(recent_leads(limit), many=True).data)

    @extend_schema(request=LeadInternalSerializer, responses={201: LeadCreatedSerializer})
    def post(self, request: Request) -> Response:
        serializer = LeadInternalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = create_lead(serializer.validated_data, source=Lead.Source.BOT)
        return Response({"ok": True, "id": lead.pk}, status=status.HTTP_201_CREATED)
