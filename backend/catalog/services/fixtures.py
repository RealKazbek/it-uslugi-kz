"""Helpers for loading the JSON fixtures that the seed command consumes."""

import json
from pathlib import Path
from typing import Any

from django.db.models import QuerySet

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures"


class SeedError(Exception):
    """Fixture data is inconsistent (for example, a slug points at nothing)."""


def load_fixture(name: str) -> list[dict[str, Any]]:
    with (FIXTURES_DIR / name).open(encoding="utf-8") as handle:
        data: list[dict[str, Any]] = json.load(handle)
    return data


def model_fields(item: dict[str, Any], exclude: tuple[str, ...]) -> dict[str, Any]:
    """Keep only the keys that map 1:1 onto model columns."""
    return {key: value for key, value in item.items() if key not in exclude}


def resolve_slugs(queryset: QuerySet[Any], slugs: list[str], owner: str) -> list[Any]:
    """Return objects for `slugs`; raise SeedError naming any unknown slug."""
    found = list(queryset.filter(slug__in=slugs))
    missing = sorted(set(slugs) - {obj.slug for obj in found})
    if missing:
        raise SeedError(f"{owner}: unknown slugs {', '.join(missing)}")
    return found
