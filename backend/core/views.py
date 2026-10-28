from django.http import HttpRequest, JsonResponse

from core.services.health import database_is_available


def health(request: HttpRequest) -> JsonResponse:
    if database_is_available():
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "error", "database": "unavailable"}, status=503)
