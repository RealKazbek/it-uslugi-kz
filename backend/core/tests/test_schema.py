from typing import Any

import pytest
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory

from core.views import DocsView, SchemaView

pytestmark = pytest.mark.django_db


def _get_schema(user: Any = None) -> Any:
    request = RequestFactory().get("/api/schema", {"format": "json"})
    request.user = user
    response = SchemaView.as_view()(request)
    response.render()
    return response


def test_openapi_schema_lists_public_and_internal_paths(settings: Any) -> None:
    settings.DEBUG = True

    response = _get_schema()

    assert response.status_code == 200
    paths = response.data["paths"]
    for path in (
        "/api/categories",
        "/api/products",
        "/api/products/{slug}",
        "/api/cities/{slug}",
        "/api/leads",
        "/api/internal/leads",
        "/api/internal/leads/{id}",
        "/api/internal/stats",
    ):
        assert path in paths


def test_swagger_ui_is_served_in_debug(settings: Any) -> None:
    settings.DEBUG = True
    request = RequestFactory().get("/api/docs")
    request.user = AnonymousUser()

    response = DocsView.as_view(url_name="schema")(request)
    response.render()

    assert response.status_code == 200


def test_docs_are_hidden_from_anonymous_users_outside_debug(settings: Any) -> None:
    settings.DEBUG = False
    anonymous = RequestFactory().get("/api/schema")
    anonymous.user = AnonymousUser()

    assert SchemaView.as_view()(anonymous).status_code == 403
    assert DocsView.as_view(url_name="schema")(anonymous).status_code == 403


def test_docs_are_open_to_staff_outside_debug(settings: Any) -> None:
    settings.DEBUG = False
    staff = get_user_model().objects.create_user("staff", password="x" * 20, is_staff=True)

    response = _get_schema(staff)

    assert response.status_code == 200


def test_non_staff_user_is_refused_outside_debug(settings: Any) -> None:
    settings.DEBUG = False
    member = get_user_model().objects.create_user("member", password="x" * 20)

    response = _get_schema(member)

    assert response.status_code == 403
