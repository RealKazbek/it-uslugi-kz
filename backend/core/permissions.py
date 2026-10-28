import hmac

from django.conf import settings
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.views import APIView

INTERNAL_TOKEN_HEADER = "X-Internal-Token"


class HasInternalToken(BasePermission):
    """Grants access only with a matching X-Internal-Token. Denies everything if unset."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        expected = settings.INTERNAL_API_TOKEN
        if not expected:
            return False
        provided = request.headers.get(INTERNAL_TOKEN_HEADER, "")
        return hmac.compare_digest(provided.encode(), expected.encode())


class SchemaAccess(BasePermission):
    """API docs are open in DEBUG; otherwise only logged-in staff users (session auth)."""

    def has_permission(self, request: Request, view: APIView) -> bool:
        if settings.DEBUG:
            return True
        user = request.user
        return bool(user and user.is_authenticated and user.is_staff)
