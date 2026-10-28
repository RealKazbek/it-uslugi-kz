import logging

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from leads.models import Lead
from leads.serializers.lead import LeadOkSerializer, LeadPublicSerializer
from leads.services.create_lead import create_lead
from leads.throttles import LeadBurstThrottle, LeadDailyThrottle

logger = logging.getLogger(__name__)


class PublicLeadView(APIView):
    authentication_classes = []
    throttle_classes = [LeadBurstThrottle, LeadDailyThrottle]

    @extend_schema(request=LeadPublicSerializer, responses={201: LeadOkSerializer})
    def post(self, request: Request) -> Response:
        serializer = LeadPublicSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        # Same response for real and honeypot submissions, so bots cannot tell them apart.
        if data.get("website"):
            logger.info("Public lead dropped: honeypot field was filled")
        else:
            create_lead(data, source=Lead.Source.SITE)
        return Response({"ok": True}, status=status.HTTP_201_CREATED)
