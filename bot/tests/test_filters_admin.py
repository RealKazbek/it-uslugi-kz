from types import SimpleNamespace
from unittest.mock import MagicMock

from app.config import Settings
from app.filters.admin import AdminChatFilter
from tests.factories import ADMIN_CHAT_ID, CLIENT_CHAT_ID, make_callback, make_message


async def test_admin_chat_message_passes(settings: Settings) -> None:
    message = make_message("/leads", chat_id=ADMIN_CHAT_ID)
    assert await AdminChatFilter()(message, settings=settings) is True


async def test_other_chat_message_is_rejected(settings: Settings) -> None:
    message = make_message("/leads", chat_id=CLIENT_CHAT_ID)
    assert await AdminChatFilter()(message, settings=settings) is False


async def test_callback_from_admin_chat_passes(settings: Settings) -> None:
    callback = make_callback("lead:1:won", message=make_message(chat_id=ADMIN_CHAT_ID))
    assert await AdminChatFilter()(callback, settings=settings) is True


async def test_callback_from_other_chat_is_rejected(settings: Settings) -> None:
    callback = make_callback("lead:1:won", message=make_message(chat_id=CLIENT_CHAT_ID))
    assert await AdminChatFilter()(callback, settings=settings) is False


async def test_callback_without_accessible_message_is_rejected(settings: Settings) -> None:
    callback = MagicMock()
    callback.message = SimpleNamespace()
    assert await AdminChatFilter()(callback, settings=settings) is False
