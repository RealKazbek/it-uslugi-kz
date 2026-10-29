"""Recording aiogram session for the end-to-end run: nothing is sent to Telegram."""

import datetime as dt
from collections.abc import AsyncIterator
from typing import Any

from aiogram import Bot
from aiogram.client.session.base import BaseSession
from aiogram.methods import SendMessage, TelegramMethod
from aiogram.types import Chat, Message

_NOW = dt.datetime(2026, 10, 29, 10, 0, tzinfo=dt.UTC)


class RecordingSession(BaseSession):
    """Keeps the text of every sendMessage call. Other methods return True."""

    def __init__(self) -> None:
        super().__init__()
        self.sent_texts: list[str] = []

    async def close(self) -> None:
        return None

    async def stream_content(  # type: ignore[override]
        self, *args: Any, **kwargs: Any
    ) -> AsyncIterator[bytes]:
        yield b""

    async def make_request(
        self, bot: Bot, method: TelegramMethod[Any], timeout: int | None = None
    ) -> Any:
        if not isinstance(method, SendMessage):
            return True
        self.sent_texts.append(method.text)
        chat_id = int(method.chat_id)
        return Message(
            message_id=len(self.sent_texts),
            date=_NOW,
            chat=Chat(id=chat_id, type="private"),
            text=method.text,
        )
