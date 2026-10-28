from collections.abc import Iterator

import pytest
from django.core.cache import cache


@pytest.fixture(autouse=True)
def _clear_cache() -> Iterator[None]:
    """Throttle counters live in the cache; each test starts with a clean slate."""
    cache.clear()
    yield
    cache.clear()
