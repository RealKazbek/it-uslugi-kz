"""Thin Telegram Bot API client. Errors propagate; callers decide on retries and logging."""

from typing import Any

import httpx
from django.conf import settings

TELEGRAM_API_BASE = "https://api.telegram.org"
TELEGRAM_TIMEOUT_SECONDS = 5.0


class TelegramError(Exception):
    """Telegram answered with an error status. `description` is Telegram's text, never the token."""

    def __init__(self, status_code: int, description: str | None) -> None:
        super().__init__(f"Telegram API error {status_code}")
        self.status_code = status_code
        self.description = description


def send_message(chat_id: str, text: str, reply_markup: dict[str, Any] | None = None) -> None:
    """Send an HTML message via sendMessage. Raises TelegramError or httpx transport errors."""
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
    if response.status_code >= 400:
        raise TelegramError(response.status_code, _description(response))


def _description(response: httpx.Response) -> str | None:
    try:
        body = response.json()
    except ValueError:
        return None
    if isinstance(body, dict) and isinstance(body.get("description"), str):
        return str(body["description"])[:200]
    return None
