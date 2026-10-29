"""Heartbeat for the container healthcheck. Written only after a successful getMe call.

A bot that cannot reach Telegram (or whose loop is blocked) stops refreshing the file, so
app.healthcheck fails and the container is reported unhealthy.
"""

import asyncio
import logging
import time
from pathlib import Path
from typing import Final

from aiogram import Bot
from aiogram.exceptions import TelegramAPIError, TelegramNetworkError

logger = logging.getLogger(__name__)

HEARTBEAT_PATH: Final = Path("/tmp/bot-heartbeat")
HEARTBEAT_INTERVAL_SECONDS: Final = 30.0


def write_heartbeat(path: Path) -> None:
    path.write_text(str(time.time()), encoding="utf-8")


async def heartbeat_tick(bot: Bot, path: Path) -> bool:
    """One check: getMe, then write the file. Returns False (and logs) when either step fails."""
    try:
        await bot.get_me()
    except (TelegramAPIError, TelegramNetworkError) as exc:
        logger.warning("Heartbeat skipped: getMe failed (%s)", type(exc).__name__)
        return False
    try:
        write_heartbeat(path)
    except OSError:
        logger.exception("Could not write heartbeat file %s", path)
        return False
    return True


async def run_heartbeat(bot: Bot, path: Path = HEARTBEAT_PATH) -> None:
    """Runs until cancelled. A failed tick is logged and retried on the next interval."""
    while True:
        await heartbeat_tick(bot, path)
        await asyncio.sleep(HEARTBEAT_INTERVAL_SECONDS)
