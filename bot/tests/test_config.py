import pytest

from app.config import ConfigError, load_settings

VALID = {
    "TELEGRAM_BOT_TOKEN": "123456:secret-token",
    "ADMIN_CHAT_ID": "-1001",
    "INTERNAL_API_TOKEN": "internal-secret",
}


def test_loads_required_values_and_defaults() -> None:
    settings = load_settings(VALID)
    assert settings.bot_token == "123456:secret-token"
    assert settings.admin_chat_id == -1001
    assert settings.internal_api_token == "internal-secret"
    assert settings.backend_url == "http://backend:8000"
    assert settings.site_url == "https://uslugi.realkazbek.site"


def test_urls_are_overridable_and_trailing_slash_removed() -> None:
    env = {**VALID, "BACKEND_URL": "http://localhost:8000/", "SITE_URL": "https://x.test/"}
    settings = load_settings(env)
    assert settings.backend_url == "http://localhost:8000"
    assert settings.site_url == "https://x.test"


@pytest.mark.parametrize("missing", ["TELEGRAM_BOT_TOKEN", "ADMIN_CHAT_ID", "INTERNAL_API_TOKEN"])
def test_missing_required_value_raises(missing: str) -> None:
    env = {key: value for key, value in VALID.items() if key != missing}
    with pytest.raises(ConfigError, match=missing):
        load_settings(env)


def test_blank_required_value_raises() -> None:
    with pytest.raises(ConfigError):
        load_settings({**VALID, "TELEGRAM_BOT_TOKEN": "   "})


def test_admin_chat_id_must_be_integer() -> None:
    with pytest.raises(ConfigError, match="integer"):
        load_settings({**VALID, "ADMIN_CHAT_ID": "abc"})


def test_url_must_have_http_scheme() -> None:
    with pytest.raises(ConfigError, match="BACKEND_URL"):
        load_settings({**VALID, "BACKEND_URL": "backend:8000"})


def test_repr_hides_secrets() -> None:
    text = repr(load_settings(VALID))
    assert "secret-token" not in text
    assert "internal-secret" not in text
