import json
from collections.abc import Callable

import httpx
import pytest

from app.services.backend import BackendClient
from app.services.backend_errors import BackendError
from app.services.order_draft import OrderDraft, build_lead_payload
from tests.factories import card, category, detail, lead

Handler = Callable[[httpx.Request], httpx.Response]


def client_with(handler: Handler) -> BackendClient:
    return BackendClient(
        "http://backend.test", "internal-test-token", transport=httpx.MockTransport(handler)
    )


def json_response(payload: object, status: int = 200) -> httpx.Response:
    return httpx.Response(status, json=payload)


async def test_list_categories_success() -> None:
    client = client_with(lambda request: json_response([category()]))
    result = await client.list_categories()
    assert result == [category()]
    await client.aclose()


async def test_public_calls_do_not_send_internal_token() -> None:
    seen: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        return json_response([])

    client = client_with(handler)
    await client.list_categories()
    assert "x-internal-token" not in seen[0].headers
    await client.aclose()


async def test_list_products_sends_category_and_lang() -> None:
    seen: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        return json_response([card()])

    client = client_with(handler)
    assert await client.list_products("websites", "kk") == [card()]
    assert seen[0].url.params["category"] == "websites"
    assert seen[0].url.params["lang"] == "kk"
    await client.aclose()


async def test_get_product_returns_detail_and_404_is_backend_error() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.path == "/api/products/lending":
            return json_response(detail())
        return json_response({"detail": "Product not found."}, status=404)

    client = client_with(handler)
    assert await client.get_product("lending", "ru") == detail()
    with pytest.raises(BackendError) as info:
        await client.get_product("missing", "ru")
    assert info.value.status_code == 404
    await client.aclose()


async def test_create_lead_posts_payload_with_internal_token() -> None:
    seen: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        return json_response({"ok": True, "id": 42}, status=201)

    draft = OrderDraft("Айгерим", "+77011234567", "", "lending", "Лендинг")
    payload = build_lead_payload(draft, "ru", 555)
    client = client_with(handler)
    assert await client.create_lead(payload) == 42
    request = seen[0]
    assert request.method == "POST"
    assert request.url.path == "/api/internal/leads"
    assert request.headers["x-internal-token"] == "internal-test-token"
    assert json.loads(request.content) == dict(payload)
    await client.aclose()


async def test_create_lead_rejects_unexpected_payload() -> None:
    client = client_with(lambda request: json_response({"ok": False, "id": 1}, status=201))
    draft = OrderDraft("Айгерим", "+77011234567", "", None, None)
    with pytest.raises(BackendError, match="unexpected"):
        await client.create_lead(build_lead_payload(draft, "ru", None))
    await client.aclose()


async def test_list_recent_leads_sends_limit_and_token() -> None:
    seen: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        return json_response([lead()])

    client = client_with(handler)
    assert await client.list_recent_leads(10) == [lead()]
    assert seen[0].url.params["limit"] == "10"
    assert seen[0].headers["x-internal-token"] == "internal-test-token"
    await client.aclose()


async def test_get_stats_and_update_status() -> None:
    counts = {"new": 1, "in_progress": 0, "won": 0, "lost": 0}
    stats = {"total": counts, "last_7_days": counts}
    seen: list[httpx.Request] = []

    def handler(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        if request.method == "GET":
            return json_response(stats)
        return json_response(lead(status="won"))

    client = client_with(handler)
    assert await client.get_stats() == stats
    updated = await client.update_lead_status(7, "won")
    assert updated["status"] == "won"
    assert seen[1].method == "PATCH"
    assert seen[1].url.path == "/api/internal/leads/7"
    assert json.loads(seen[1].content) == {"status": "won"}
    await client.aclose()


@pytest.mark.parametrize("status", [400, 404, 500, 503])
async def test_http_errors_become_backend_error(status: int) -> None:
    client = client_with(lambda request: json_response({"detail": "x"}, status=status))
    with pytest.raises(BackendError) as info:
        await client.list_categories()
    assert info.value.status_code == status
    await client.aclose()


async def test_timeout_becomes_backend_error() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        raise httpx.ReadTimeout("timed out", request=request)

    client = client_with(handler)
    with pytest.raises(BackendError, match="timeout") as info:
        await client.list_categories()
    assert info.value.status_code is None
    await client.aclose()


async def test_transport_error_becomes_backend_error() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        raise httpx.ConnectError("refused", request=request)

    client = client_with(handler)
    with pytest.raises(BackendError, match="transport"):
        await client.get_stats()
    await client.aclose()


async def test_invalid_json_becomes_backend_error() -> None:
    client = client_with(lambda request: httpx.Response(200, content=b"<html>"))
    with pytest.raises(BackendError, match="invalid JSON"):
        await client.list_categories()
    await client.aclose()


async def test_missing_keys_become_backend_error() -> None:
    client = client_with(lambda request: json_response([{"slug": "x"}]))
    with pytest.raises(BackendError, match="unexpected"):
        await client.list_categories()
    await client.aclose()
