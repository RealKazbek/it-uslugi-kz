import logging

from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from reviews.selectors.approved import approved_reviews
from reviews.serializers.review import (
    ReviewOkSerializer,
    ReviewPublicSerializer,
    ReviewSubmitSerializer,
)
from reviews.services.submit_review import submit_review
from reviews.throttles import ReviewBurstThrottle, ReviewDailyThrottle

logger = logging.getLogger(__name__)


class ReviewListView(APIView):
    """GET: approved reviews and the optional 2GIS link. POST: submit a review for moderation."""

    authentication_classes = []

    def get_throttles(self) -> list:  # type: ignore[type-arg]
        if self.request.method == "POST":
            return [ReviewBurstThrottle(), ReviewDailyThrottle()]
        return []

    @extend_schema(responses={200: ReviewPublicSerializer(many=True)})
    def get(self, request: Request) -> Response:
        items = ReviewPublicSerializer(approved_reviews(), many=True).data
        return Response({"results": items, "gis_url": settings.REVIEWS_2GIS_URL})

    @extend_schema(request=ReviewSubmitSerializer, responses={201: ReviewOkSerializer})
    def post(self, request: Request) -> Response:
        serializer = ReviewSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        # Same response for real and honeypot submissions, so bots cannot tell them apart.
        if data.get("website"):
            logger.info("Review dropped: honeypot field was filled")
        else:
            submit_review(data)
        return Response({"ok": True}, status=status.HTTP_201_CREATED)
