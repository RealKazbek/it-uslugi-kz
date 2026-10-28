import httpx


def describe_error(exc: BaseException) -> str:
    """Short description for logs. Never str(exc): httpx messages can contain the bot token URL."""
    if isinstance(exc, httpx.HTTPStatusError):
        return f"HTTP {exc.response.status_code}"
    return type(exc).__name__
