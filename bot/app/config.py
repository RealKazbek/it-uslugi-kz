"""Runtime settings. This is the only module that reads environment variables."""

import os
from collections.abc import Mapping
from dataclasses import dataclass, field

DEFAULT_BACKEND_URL = "http://backend:8000"
DEFAULT_SITE_URL = "https://uslugi.realkazbek.site"


class ConfigError(ValueError):
    """A required environment variable is missing or malformed."""


@dataclass(frozen=True)
class Settings:
    bot_token: str = field(repr=False)
    admin_chat_id: int
    backend_url: str
    internal_api_token: str = field(repr=False)
    site_url: str


def _required(env: Mapping[str, str], name: str) -> str:
    value = env.get(name, "").strip()
    if not value:
        raise ConfigError(f"{name} is not set")
    return value


def _admin_chat_id(env: Mapping[str, str]) -> int:
    raw = _required(env, "ADMIN_CHAT_ID")
    try:
        return int(raw)
    except ValueError as exc:
        raise ConfigError("ADMIN_CHAT_ID must be an integer") from exc


def _url(env: Mapping[str, str], name: str, default: str) -> str:
    value = env.get(name, "").strip() or default
    if not value.startswith(("http://", "https://")):
        raise ConfigError(f"{name} must start with http:// or https://")
    return value.rstrip("/")


def load_settings(environ: Mapping[str, str] | None = None) -> Settings:
    """Read settings from the environment (or a given mapping, for tests)."""
    env: Mapping[str, str] = os.environ if environ is None else environ
    return Settings(
        bot_token=_required(env, "TELEGRAM_BOT_TOKEN"),
        admin_chat_id=_admin_chat_id(env),
        backend_url=_url(env, "BACKEND_URL", DEFAULT_BACKEND_URL),
        internal_api_token=_required(env, "INTERNAL_API_TOKEN"),
        site_url=_url(env, "SITE_URL", DEFAULT_SITE_URL),
    )
