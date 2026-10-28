"""Django settings. The only module in the project that reads environment variables."""

import os
from pathlib import Path
from typing import Any

from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

_DEV_SECRET_KEY = "dev-only-insecure-key-do-not-use-in-production"


def _env(name: str, default: str = "") -> str:
    return os.environ.get(name, "").strip() or default


def _env_list(name: str, default: str) -> list[str]:
    return [item.strip() for item in _env(name, default).split(",") if item.strip()]


DEBUG = _env("DJANGO_DEBUG") == "1"

SECRET_KEY = _env("DJANGO_SECRET_KEY")
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured(
            "DJANGO_SECRET_KEY must be set (use DJANGO_DEBUG=1 for local development only)."
        )
    SECRET_KEY = _DEV_SECRET_KEY

ALLOWED_HOSTS = _env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "drf_spectacular",
    "core",
    "catalog",
    "cities",
    "leads",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES: list[dict[str, Any]] = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

POSTGRES_HOST = _env("POSTGRES_HOST")
if POSTGRES_HOST:
    DATABASES: dict[str, dict[str, Any]] = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": _env("POSTGRES_DB"),
            "USER": _env("POSTGRES_USER"),
            "PASSWORD": _env("POSTGRES_PASSWORD"),
            "HOST": POSTGRES_HOST,
            "PORT": _env("POSTGRES_PORT", "5432"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS: list[dict[str, str]] = []

LANGUAGE_CODE = "ru"
TIME_ZONE = "Asia/Almaty"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK: dict[str, Any] = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS: dict[str, Any] = {
    "TITLE": "RK Dev API",
    "VERSION": "1.0.0",
}

# Project settings consumed by later milestones (leads, notifications, revalidation).
TELEGRAM_BOT_TOKEN = _env("TELEGRAM_BOT_TOKEN")
ADMIN_CHAT_ID = _env("ADMIN_CHAT_ID")
INTERNAL_API_TOKEN = _env("INTERNAL_API_TOKEN")
FRONTEND_INTERNAL_URL = _env("FRONTEND_INTERNAL_URL", "http://frontend:3000")
SITE_URL = _env("SITE_URL", "https://uslugi.realkazbek.site")

LOGGING: dict[str, Any] = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "%(asctime)s %(levelname)s %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
            "formatter": "standard",
        },
    },
    "root": {"handlers": ["console"], "level": _env("LOG_LEVEL", "INFO")},
}
