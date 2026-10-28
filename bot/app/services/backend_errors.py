"""Error raised by the backend client for any failed call."""


class BackendError(Exception):
    """A backend call failed: HTTP error, timeout, transport error or unexpected payload."""

    def __init__(self, message: str, status_code: int | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code
