import logging
import sys

from app.logging_setup import RedactingFormatter, configure_logging

TOKEN = "123456:SECRET-TOKEN-VALUE"


def test_formatter_redacts_token_in_message_and_traceback() -> None:
    formatter = RedactingFormatter([TOKEN])
    try:
        raise RuntimeError(f"failed at https://api.telegram.org/bot{TOKEN}/getMe")
    except RuntimeError:
        record = logging.LogRecord("x", logging.ERROR, __file__, 1, "call %s", (TOKEN,), None)
        record.exc_info = sys.exc_info()
        output = formatter.format(record)
    assert TOKEN not in output
    assert "***" in output


def test_configure_logging_quiets_httpx_and_redacts() -> None:
    configure_logging([TOKEN])
    assert logging.getLogger("httpx").level == logging.WARNING
    assert logging.getLogger("httpcore").level == logging.WARNING
    handler = logging.getLogger().handlers[0]
    assert isinstance(handler.formatter, RedactingFormatter)
