"""Telegram notification for new leads: built in the request's commit hook, sent in a thread."""

import logging
import time
from collections.abc import Callable
from typing import Any

from django.conf import settings

from core.services.background import run_in_daemon_thread
from core.services.errors import describe_error
from core.services.telegram import send_message
from leads.models import Lead
from leads.services.notification_text import build_lead_message, status_keyboard

logger = logging.getLogger(__name__)

MAX_ATTEMPTS = 3
BACKOFF_SECONDS = (1.0, 2.0)  # sleep after attempt 1 and after attempt 2


def notify_new_lead(lead: Lead) -> None:
    """Called after commit on the request thread. Builds the text here (DB access), sends async."""
    text = build_lead_message(lead)
    run_in_daemon_thread(send_with_retries, lead.pk, text, status_keyboard(lead.pk))


def send_with_retries(
    lead_id: int,
    text: str,
    reply_markup: dict[str, Any],
    sleep: Callable[[float], None] = time.sleep,
) -> bool:
    """Send to the admin chat with up to MAX_ATTEMPTS tries. Never raises; returns success."""
    token = settings.TELEGRAM_BOT_TOKEN
    chat_id = settings.ADMIN_CHAT_ID
    if not token or not chat_id:
        logger.warning("Telegram notification skipped for lead %s: token or chat id unset", lead_id)
        return False
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            message_id = send_message(chat_id, text, reply_markup)
        except Exception as exc:
            logger.warning(
                "Telegram notification for lead %s failed (attempt %d/%d): %s",
                lead_id,
                attempt,
                MAX_ATTEMPTS,
                describe_error(exc),
            )
            if attempt < MAX_ATTEMPTS:
                sleep(BACKOFF_SECONDS[attempt - 1])
            continue
        logger.info("Telegram notification sent for lead %s (message_id %s)", lead_id, message_id)
        return True
    logger.error(
        "Telegram notification for lead %s gave up after %d attempts", lead_id, MAX_ATTEMPTS
    )
    return False
