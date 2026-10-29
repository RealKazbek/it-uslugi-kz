import logging
from unittest.mock import AsyncMock, MagicMock

import pytest
from aiogram.fsm.context import FSMContext
from aiogram.fsm.storage.base import StorageKey
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import ErrorEvent

from app.formatting.contacts import contacts_block
from app.handlers.errors import build_errors_router
from app.services.session import set_lang
from app.texts.lookup import t
from tests.factories import BOT_ID, CLIENT_CHAT_ID, USER_ID, make_callback, make_message


def _update(message: AsyncMock | None = None, callback: AsyncMock | None = None) -> MagicMock:
    update = MagicMock()
    update.update_id = 99
    update.event_type = "message" if message is not None else "callback_query"
    update.message = message
    update.callback_query = callback
    return update


async def _fire(storage: MemoryStorage, update: MagicMock, exc: Exception) -> bool:
    router = build_errors_router(storage)
    handler = router.errors.handlers[0].callback
    event = MagicMock(spec=ErrorEvent)
    event.update = update
    event.exception = exc
    handled: bool = await handler(event)
    return handled


async def test_message_error_replies_in_fsm_language(caplog: pytest.LogCaptureFixture) -> None:
    storage = MemoryStorage()
    key = StorageKey(bot_id=BOT_ID, chat_id=CLIENT_CHAT_ID, user_id=USER_ID)
    await set_lang(FSMContext(storage=storage, key=key), "kk")
    message = make_message("/start")
    with caplog.at_level(logging.ERROR):
        handled = await _fire(storage, _update(message=message), RuntimeError("boom"))
    assert handled is True
    assert "update 99" in caplog.text
    expected = t("kk", "error.generic", contacts=contacts_block("kk"))
    assert message.answer.await_args.args[0] == expected


async def test_callback_error_sends_message_and_short_plain_answer() -> None:
    callback = make_callback("cat:x")
    await _fire(MemoryStorage(), _update(callback=callback), ValueError("bad"))
    callback.message.answer.assert_awaited_once()
    callback.answer.assert_awaited_once_with(t("ru", "error.short"))
    assert "show_alert" not in callback.answer.await_args.kwargs


async def test_missing_state_falls_back_to_russian() -> None:
    callback = make_callback("cat:x")
    await _fire(MemoryStorage(), _update(callback=callback), ValueError("bad"))
    assert callback.message.answer.await_args.args[0].startswith("Что-то пошло не так")
