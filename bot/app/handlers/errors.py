"""Global error handler: logs with update context and replies in the user's language."""

import logging

from aiogram import Router
from aiogram.exceptions import TelegramAPIError
from aiogram.fsm.storage.base import BaseStorage, StorageKey
from aiogram.types import ErrorEvent, Message, Update

from app.formatting.contacts import contacts_block
from app.handlers.common import notify_callback
from app.services.session import LANG_KEY
from app.texts.lookup import DEFAULT_LANG, Lang, parse_lang, t

logger = logging.getLogger(__name__)


async def _user_lang(storage: BaseStorage, update: Update) -> Lang:
    """The error handler gets no FSM context from aiogram, so the language is read from storage."""
    source = update.message or (update.callback_query.message if update.callback_query else None)
    user = update.message.from_user if update.message else None
    if update.callback_query is not None:
        user = update.callback_query.from_user
    if not isinstance(source, Message) or user is None:
        return DEFAULT_LANG
    bot = source.bot
    if bot is None:
        return DEFAULT_LANG
    key = StorageKey(bot_id=bot.id, chat_id=source.chat.id, user_id=user.id)
    data = await storage.get_data(key)
    return parse_lang(data.get(LANG_KEY)) or DEFAULT_LANG


async def _reply(update: Update, lang: Lang) -> None:
    text = t(lang, "error.generic", contacts=contacts_block(lang))
    try:
        if update.message is not None:
            await update.message.answer(text)
        elif update.callback_query is not None:
            if isinstance(update.callback_query.message, Message):
                await update.callback_query.message.answer(text)
            await notify_callback(update.callback_query, t(lang, "error.short"))
    except TelegramAPIError as exc:
        logger.warning("Could not send the error reply: %s", type(exc).__name__)


def build_errors_router(storage: BaseStorage) -> Router:
    router = Router(name="errors")

    @router.errors()
    async def on_error(event: ErrorEvent) -> bool:
        update = event.update
        logger.error(
            "Unhandled %s for update %s: %s",
            update.event_type,
            update.update_id,
            type(event.exception).__name__,
            exc_info=event.exception,
        )
        await _reply(update, await _user_lang(storage, update))
        return True

    return router
