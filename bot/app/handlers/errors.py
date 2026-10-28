"""Global error handler: logs with update context and replies with a generic message."""

import logging

from aiogram import Router
from aiogram.types import ErrorEvent

from app.formatting.contacts import contacts_block
from app.texts.lookup import t

logger = logging.getLogger(__name__)
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
    text = t("ru", "error.generic", contacts=contacts_block("ru"))
    if update.message is not None:
        await update.message.answer(text)
    elif update.callback_query is not None:
        await update.callback_query.answer(text, show_alert=True)
    return True
