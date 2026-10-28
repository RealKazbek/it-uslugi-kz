"""Logging setup. Redacts the bot token from every formatted record and quiets httpx."""

import logging
from collections.abc import Sequence
from typing import Final

REDACTED: Final = "***"
_QUIET_LOGGERS: Final = ("httpx", "httpcore", "aiohttp")


class RedactingFormatter(logging.Formatter):
    def __init__(self, secrets: Sequence[str]) -> None:
        super().__init__("%(asctime)s %(levelname)s %(name)s: %(message)s")
        self._secrets = [secret for secret in secrets if secret]

    def format(self, record: logging.LogRecord) -> str:
        text = super().format(record)
        for secret in self._secrets:
            text = text.replace(secret, REDACTED)
        return text


def configure_logging(secrets: Sequence[str], level: int = logging.INFO) -> None:
    handler = logging.StreamHandler()
    handler.setFormatter(RedactingFormatter(secrets))
    root = logging.getLogger()
    root.handlers = [handler]
    root.setLevel(level)
    # Request URLs of these libraries contain the bot token; keep them at WARNING.
    for name in _QUIET_LOGGERS:
        logging.getLogger(name).setLevel(logging.WARNING)
