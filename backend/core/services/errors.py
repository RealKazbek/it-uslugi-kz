import httpx

from core.services.telegram import TelegramError


def describe_error(exc: BaseException) -> str:
    """Short description for logs. Never str(exc): httpx messages can contain the bot token URL."""
    if isinstance(exc, TelegramError):
        if exc.description:
            return f"HTTP {exc.status_code}: {exc.description}"
        return f"HTTP {exc.status_code}"
    if isinstance(exc, httpx.HTTPStatusError):
        return f"HTTP {exc.response.status_code}"
    return type(exc).__name__
