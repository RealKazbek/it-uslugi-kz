import pytest
from django.test import Client

from core import views

pytestmark = pytest.mark.django_db


def test_health_reports_ok(client: Client) -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_reports_database_down(client: Client, monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(views, "database_is_available", lambda: False)

    response = client.get("/api/health")

    assert response.status_code == 503
    assert response.json()["status"] == "error"
