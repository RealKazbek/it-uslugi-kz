"""Best-effort on-demand revalidation of the Next.js frontend cache (tag based)."""

import logging
from collections.abc import Sequence

import httpx
from django.conf import settings
from django.db import transaction

from core.services.background import run_in_daemon_thread
from core.services.errors import describe_error

logger = logging.getLogger(__name__)

REVALIDATE_TIMEOUT_SECONDS = 5.0


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


def schedule_revalidation(tags: Sequence[str]) -> None:
    """Fire the webhook in a daemon thread once the surrounding transaction commits."""
    if not settings.FRONTEND_INTERNAL_URL:
        return
    tag_list = list(tags)
    transaction.on_commit(lambda: run_in_daemon_thread(post_revalidate, tag_list))
