"""Entry point: long polling with MemoryStorage, graceful shutdown, getMe-backed heartbeat."""

import asyncio
import logging
from contextlib import suppress

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage

from app.config import Settings, load_settings
from app.handlers import build_router
from app.heartbeat import HEARTBEAT_PATH, run_heartbeat
from app.logging_setup import configure_logging
from app.services.backend import BackendClient

logger = logging.getLogger(__name__)


def build_dispatcher(settings: Settings, backend: BackendClient) -> Dispatcher:
    storage = MemoryStorage()
    dispatcher = Dispatcher(storage=storage)
    dispatcher["backend"] = backend
    dispatcher["settings"] = settings
    dispatcher.include_router(build_router(storage))
    return dispatcher


async def run() -> None:
    settings = load_settings()
    configure_logging([settings.bot_token, settings.internal_api_token])
    backend = BackendClient(settings.backend_url, settings.internal_api_token)
    bot = Bot(
        token=settings.bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dispatcher = build_dispatcher(settings, backend)
    heartbeat = asyncio.create_task(run_heartbeat(bot, HEARTBEAT_PATH))
    logger.info("Bot starting: backend=%s", settings.backend_url)
    try:
        await dispatcher.start_polling(bot, allowed_updates=dispatcher.resolve_used_update_types())
    finally:
        heartbeat.cancel()
        with suppress(asyncio.CancelledError):
            await heartbeat
        await backend.aclose()
        await bot.session.close()
        logger.info("Bot stopped")


def main() -> None:
    asyncio.run(run())


if __name__ == "__main__":
    main()
