"""Recording aiogram session: Bot calls are captured instead of sent to Telegram."""

import datetime as dt
from collections.abc import AsyncIterator
from typing import Any

from aiogram import Bot
from aiogram.client.session.base import BaseSession
from aiogram.exceptions import TelegramBadRequest
from aiogram.methods import AnswerCallbackQuery, EditMessageText, SendMessage, TelegramMethod
from aiogram.types import CallbackQuery, Chat, Message, Update, User

NOW = dt.datetime(2026, 10, 29, 10, 0, tzinfo=dt.UTC)


class RecordingSession(BaseSession):
    def __init__(self) -> None:
        super().__init__()
        self.calls: list[TelegramMethod[Any]] = []
        self.fail_edits = False

    async def close(self) -> None:
        return None

    async def stream_content(  # type: ignore[override]
        self, *args: Any, **kwargs: Any
    ) -> AsyncIterator[bytes]:
        yield b""

    async def make_request(
        self, bot: Bot, method: TelegramMethod[Any], timeout: int | None = None
    ) -> Any:
        self.calls.append(method)
        if isinstance(method, EditMessageText) and self.fail_edits:
            raise TelegramBadRequest(method=method, message="Bad Request: message is too old")
        return True

    def of_type(self, kind: type[TelegramMethod[Any]]) -> list[Any]:
        return [call for call in self.calls if isinstance(call, kind)]


def sent_texts(session: RecordingSession) -> list[str]:
    return [call.text for call in session.of_type(SendMessage)]


def callback_answers(session: RecordingSession) -> list[AnswerCallbackQuery]:
    return session.of_type(AnswerCallbackQuery)


def _user(user_id: int, username: str | None = None) -> User:
    return User(id=user_id, is_bot=False, first_name="Tester", username=username)


def message_update(
    text: str | None, *, chat_id: int, user_id: int, username: str | None = None
) -> Update:
    message = Message(
        message_id=1,
        date=NOW,
        chat=Chat(id=chat_id, type="private"),
        from_user=_user(user_id, username),
        text=text,
    )
    return Update(update_id=1, message=message)


def callback_update(
    data: str, *, chat_id: int, user_id: int, message_text: str = "card", message_id: int = 10
) -> Update:
    source = Message(
        message_id=message_id,
        date=NOW,
        chat=Chat(id=chat_id, type="private"),
        text=message_text,
    )
    query = CallbackQuery(
        id="cq-1",
        from_user=_user(user_id),
        chat_instance="ci",
        message=source,
        data=data,
    )
    return Update(update_id=2, callback_query=query)
