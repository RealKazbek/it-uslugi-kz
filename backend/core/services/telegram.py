"""Thin Telegram Bot API client. Errors propagate; callers decide on retries and logging."""

from typing import Any

import httpx
from django.conf import settings

TELEGRAM_API_BASE = "https://api.telegram.org"
TELEGRAM_TIMEOUT_SECONDS = 5.0


def send_message(chat_id: str, text: str, reply_markup: dict[str, Any] | None = None) -> None:
    """Send an HTML message via sendMessage. Raises httpx errors on transport or API failure."""
    url = f"{TELEGRAM_API_BASE}/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
    payload: dict[str, Any] = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    if reply_markup is not None:
        payload["reply_markup"] = reply_markup
    response = httpx.post(url, json=payload, timeout=TELEGRAM_TIMEOUT_SECONDS)
    response.raise_for_status()
