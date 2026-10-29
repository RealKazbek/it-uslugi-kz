"""Telegram updates for the end-to-end client, a private user with a username."""

import datetime as dt

from aiogram.types import CallbackQuery, Chat, Message, Update, User

E2E_USER_ID = 777000111
E2E_USERNAME = "e2e_m5"
_NOW = dt.datetime(2026, 10, 29, 10, 0, tzinfo=dt.UTC)


def _user() -> User:
    return User(id=E2E_USER_ID, is_bot=False, first_name="E2E", username=E2E_USERNAME)


def _chat() -> Chat:
    return Chat(id=E2E_USER_ID, type="private")


def text_update(text: str) -> Update:
    message = Message(message_id=1, date=_NOW, chat=_chat(), from_user=_user(), text=text)
    return Update(update_id=1, message=message)


def callback_update(data: str) -> Update:
    message = Message(message_id=2, date=_NOW, chat=_chat(), from_user=_user(), text="menu")
    query = CallbackQuery(
        id="e2e-callback",
        from_user=_user(),
        chat_instance="e2e",
        message=message,
        data=data,
    )
    return Update(update_id=2, callback_query=query)
