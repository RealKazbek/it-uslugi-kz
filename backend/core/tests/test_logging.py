import logging


def test_httpx_request_urls_are_not_logged_at_info() -> None:
    # Telegram request URLs contain the bot token; httpx must stay at WARNING.
    assert logging.getLogger("httpx").getEffectiveLevel() >= logging.WARNING
    assert logging.getLogger("httpcore").getEffectiveLevel() >= logging.WARNING
