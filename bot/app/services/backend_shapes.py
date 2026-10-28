"""Shape checks for backend JSON. A payload missing a required key is a BackendError."""

from collections.abc import Sequence
from typing import Any, cast

from app.services.backend_errors import BackendError


def expect_dict(data: object, required: Sequence[str]) -> dict[str, Any]:
    if not isinstance(data, dict) or not all(key in data for key in required):
        raise BackendError("backend returned an unexpected payload")
    return cast(dict[str, Any], data)


def expect_list(data: object, required: Sequence[str]) -> list[dict[str, Any]]:
    if not isinstance(data, list):
        raise BackendError("backend returned an unexpected payload")
    return [expect_dict(item, required) for item in data]
