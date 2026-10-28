from django.test import Client, RequestFactory
from drf_spectacular.views import SpectacularSwaggerView


def test_openapi_schema_lists_public_and_internal_paths(client: Client) -> None:
    response = client.get("/api/schema", {"format": "json"})

    assert response.status_code == 200
    paths = response.json()["paths"]
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


def test_swagger_ui_is_served() -> None:
    # Called directly: Django's test client copies template contexts, which breaks on the
    # Python 3.15 interpreter used locally. The view itself renders fine.
    request = RequestFactory().get("/api/docs")

    response = SpectacularSwaggerView.as_view(url_name="schema")(request)
    response.render()

    assert response.status_code == 200
