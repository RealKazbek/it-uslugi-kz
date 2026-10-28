"""httpx client for the backend's public read API and internal (bot) API.

Every failure (HTTP error, timeout, transport error, unexpected payload) is raised as BackendError.
The internal token is sent only on internal calls and never logged.
"""

import logging
from collections.abc import Mapping
from typing import Final, cast

import httpx

from app.services.backend_errors import BackendError
from app.services.backend_models import (
    CategoryDict,
    LeadDict,
    LeadPayload,
    LeadStatsDict,
    ProductCardDict,
    ProductDetailDict,
)
from app.services.backend_shapes import expect_dict, expect_list

logger = logging.getLogger(__name__)

INTERNAL_TOKEN_HEADER: Final = "X-Internal-Token"
DEFAULT_TIMEOUT_SECONDS: Final = 10.0

CATEGORY_FIELDS: Final = ("slug", "name_ru", "name_kk", "name_en", "product_count")
CARD_FIELDS: Final = ("slug", "category", "title", "short", "price_from_kzt", "unit")
DETAIL_FIELDS: Final = (*CARD_FIELDS, "days_min", "days_max")
LEAD_FIELDS: Final = ("id", "name", "contact", "product_slug", "lang", "status", "created_at")
STATS_FIELDS: Final = ("total", "last_7_days")


class BackendClient:
    def __init__(
        self,
        base_url: str,
        internal_token: str,
        *,
        transport: httpx.AsyncBaseTransport | None = None,
        timeout: float = DEFAULT_TIMEOUT_SECONDS,
    ) -> None:
        self._token = internal_token
        self._http = httpx.AsyncClient(
            base_url=base_url,
            timeout=timeout,
            transport=transport,
            headers={"Accept": "application/json"},
        )

    async def aclose(self) -> None:
        await self._http.aclose()

    async def list_categories(self) -> list[CategoryDict]:
        data = await self._request("GET", "/api/categories")
        return cast(list[CategoryDict], expect_list(data, CATEGORY_FIELDS))

    async def list_products(self, category: str, lang: str) -> list[ProductCardDict]:
        data = await self._request(
            "GET", "/api/products", params={"category": category, "lang": lang}
        )
        return cast(list[ProductCardDict], expect_list(data, CARD_FIELDS))

    async def get_product(self, slug: str, lang: str) -> ProductDetailDict:
        data = await self._request("GET", f"/api/products/{slug}", params={"lang": lang})
        return cast(ProductDetailDict, expect_dict(data, DETAIL_FIELDS))

    async def create_lead(self, payload: LeadPayload) -> int:
        data = await self._request(
            "POST", "/api/internal/leads", json=cast(Mapping[str, object], payload), internal=True
        )
        checked = expect_dict(data, ("ok", "id"))
        if checked["ok"] is not True or not isinstance(checked["id"], int):
            raise BackendError("backend returned an unexpected payload")
        return checked["id"]

    async def list_recent_leads(self, limit: int = 10) -> list[LeadDict]:
        data = await self._request(
            "GET", "/api/internal/leads", params={"limit": limit}, internal=True
        )
        return cast(list[LeadDict], expect_list(data, LEAD_FIELDS))

    async def get_stats(self) -> LeadStatsDict:
        data = await self._request("GET", "/api/internal/stats", internal=True)
        return cast(LeadStatsDict, expect_dict(data, STATS_FIELDS))

    async def update_lead_status(self, lead_id: int, status: str) -> LeadDict:
        data = await self._request(
            "PATCH",
            f"/api/internal/leads/{lead_id}",
            json={"status": status},
            internal=True,
        )
        return cast(LeadDict, expect_dict(data, LEAD_FIELDS))

    async def _request(
        self,
        method: str,
        path: str,
        *,
        params: Mapping[str, str | int] | None = None,
        json: Mapping[str, object] | None = None,
        internal: bool = False,
    ) -> object:
        headers = {INTERNAL_TOKEN_HEADER: self._token} if internal else None
        try:
            response = await self._http.request(
                method, path, params=params, json=json, headers=headers
            )
        except httpx.TimeoutException as exc:
            logger.warning("Backend timeout on %s %s", method, path)
            raise BackendError("backend timeout") from exc
        except httpx.HTTPError as exc:
            logger.warning("Backend transport error on %s %s: %s", method, path, type(exc).__name__)
            raise BackendError("backend transport error") from exc
        if response.status_code >= 400:
            logger.warning("Backend %s %s returned HTTP %d", method, path, response.status_code)
            raise BackendError(
                f"backend returned HTTP {response.status_code}", response.status_code
            )
        try:
            return response.json()
        except ValueError as exc:
            logger.warning("Backend %s %s returned invalid JSON", method, path)
            raise BackendError("backend returned invalid JSON") from exc
