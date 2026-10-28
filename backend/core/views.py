from django.http import HttpRequest, JsonResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.authentication import SessionAuthentication

from core.permissions import SchemaAccess
from core.services.health import database_is_available


def health(request: HttpRequest) -> JsonResponse:
    if database_is_available():
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "error", "database": "unavailable"}, status=503)


class SchemaView(SpectacularAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [SchemaAccess]


class DocsView(SpectacularSwaggerView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [SchemaAccess]
