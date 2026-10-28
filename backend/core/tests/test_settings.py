import config.settings as project_settings


def test_default_cache_is_database_not_locmem() -> None:
    # Throttle counters must be shared across gunicorn workers.
    backend = project_settings.CACHES["default"]["BACKEND"]

    assert backend == "django.core.cache.backends.db.DatabaseCache"
    assert project_settings.CACHES["default"]["LOCATION"] == "cache"


def test_api_does_not_parse_authorization_headers() -> None:
    assert project_settings.REST_FRAMEWORK["DEFAULT_AUTHENTICATION_CLASSES"] == []
