"""Best-effort on-demand revalidation of the Next.js frontend cache (tag based).

Tags raised inside one database transaction are collected into a single batch and
sent as one webhook after the commit. A rolled-back transaction sends nothing.
"""

import logging
from collections.abc import Sequence
from typing import Any

import httpx
from django.conf import settings
from django.db import transaction

from core.services.background import run_in_daemon_thread
from core.services.errors import describe_error

logger = logging.getLogger(__name__)

REVALIDATE_TIMEOUT_SECONDS = 5.0
BATCH_ATTRIBUTE = "revalidation_batch"


def post_revalidate(tags: Sequence[str]) -> bool:
    """POST the tags to the frontend webhook. Logs and returns False on failure; never raises."""
    base_url = settings.FRONTEND_INTERNAL_URL
    if not base_url:
        logger.info("Revalidation skipped: FRONTEND_INTERNAL_URL is not set")
        return False
    if not settings.INTERNAL_API_TOKEN:
        logger.warning("Revalidation skipped: INTERNAL_API_TOKEN is not set")
        return False
    try:
        response = httpx.post(
            f"{base_url.rstrip('/')}/api/revalidate",
            headers={"X-Internal-Token": settings.INTERNAL_API_TOKEN},
            json={"tags": list(tags)},
            timeout=REVALIDATE_TIMEOUT_SECONDS,
        )
        response.raise_for_status()
    except Exception as exc:
        logger.warning("Revalidation failed for %d tags: %s", len(tags), describe_error(exc))
        return False
    return True


class RevalidationBatch:
    """Tags collected for one transaction; calling it sends one webhook (on commit)."""

    def __init__(self) -> None:
        self.tags: set[str] = set()

    def __call__(self) -> None:
        if self.tags:
            run_in_daemon_thread(post_revalidate, sorted(self.tags))
            self.tags.clear()


def _registered_batch(connection: Any) -> RevalidationBatch | None:
    """The open batch of this transaction, if its commit hook is still pending."""
    batch = getattr(connection, BATCH_ATTRIBUTE, None)
    if batch is None:
        return None
    pending = any(callback is batch for _, callback, _ in connection.run_on_commit)
    return batch if pending else None


def schedule_revalidation(tags: Sequence[str]) -> None:
    """Add tags to the current transaction's batch; one webhook fires after commit."""
    if not settings.FRONTEND_INTERNAL_URL or not tags:
        return
    connection = transaction.get_connection()
    batch = _registered_batch(connection)
    if batch is not None:
        batch.tags.update(tags)
        return
    batch = RevalidationBatch()
    batch.tags.update(tags)
    setattr(connection, BATCH_ATTRIBUTE, batch)
    transaction.on_commit(batch, robust=True)
