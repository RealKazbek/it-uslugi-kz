from collections.abc import Iterator
from typing import Any

import pytest
from django.core.cache import cache

LOCMEM = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}


@pytest.fixture(autouse=True)
def _locmem_cache(settings: Any) -> Iterator[None]:
    """Tests use LocMem so no cache table is needed. The project default is DatabaseCache."""
    settings.CACHES = LOCMEM
    cache.clear()
    yield
    cache.clear()
