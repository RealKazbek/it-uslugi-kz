"""Admin filter: the event must come from the chat named by ADMIN_CHAT_ID."""

from aiogram.filters import BaseFilter
from aiogram.types import CallbackQuery, Message

from app.config import Settings


def _chat_id(event: Message | CallbackQuery) -> int | None:
    if isinstance(event, Message):
        return event.chat.id
    if isinstance(event.message, Message):
        return event.message.chat.id
    return None


class AdminChatFilter(BaseFilter):
    """Passes only events from the admin chat. Other chats get no admin behaviour at all."""

    async def __call__(self, event: Message | CallbackQuery, settings: Settings) -> bool:
        chat_id = _chat_id(event)
        return chat_id is not None and chat_id == settings.admin_chat_id
