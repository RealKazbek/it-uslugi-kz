import logging
from unittest.mock import AsyncMock, MagicMock

import pytest
from aiogram.types import ErrorEvent

from app.handlers.errors import on_error
from tests.factories import make_callback, make_message


def _event(update: MagicMock, exc: Exception) -> ErrorEvent:
    event = MagicMock(spec=ErrorEvent)
    event.update = update
    event.exception = exc
    return event


def _update(message: AsyncMock | None = None, callback: AsyncMock | None = None) -> MagicMock:
    update = MagicMock()
    update.update_id = 99
    update.event_type = "message"
    update.message = message
    update.callback_query = callback
    return update


async def test_error_on_message_replies_generically_and_logs(
    caplog: pytest.LogCaptureFixture,
) -> None:
    message = make_message("/start")
    with caplog.at_level(logging.ERROR):
        handled = await on_error(_event(_update(message=message), RuntimeError("boom")))
    assert handled is True
    assert "update 99" in caplog.text
    assert "RuntimeError" in caplog.text
    reply = message.answer.await_args.args[0]
    assert reply.startswith("Что-то пошло не так")
    assert "wa.me/77066620060" in reply


async def test_error_on_callback_shows_alert() -> None:
    callback = make_callback("cat:x")
    update = _update(callback=callback)
    update.event_type = "callback_query"
    await on_error(_event(update, ValueError("bad")))
    assert callback.answer.await_args.kwargs["show_alert"] is True


async def test_error_without_user_facing_update_still_handled() -> None:
    assert await on_error(_event(_update(), KeyError("x"))) is True
