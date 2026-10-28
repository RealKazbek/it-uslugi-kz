"""Heartbeat file for the container healthcheck: written every 30 s, checked by app.healthcheck."""

import asyncio
import logging
import time
from pathlib import Path
from typing import Final

logger = logging.getLogger(__name__)

HEARTBEAT_PATH: Final = Path("/tmp/bot-heartbeat")
HEARTBEAT_INTERVAL_SECONDS: Final = 30.0


def write_heartbeat(path: Path) -> None:
    path.write_text(str(time.time()), encoding="utf-8")


async def run_heartbeat(path: Path = HEARTBEAT_PATH) -> None:
    """Runs until cancelled. A failed write is logged and retried on the next tick."""
    while True:
        try:
            write_heartbeat(path)
        except OSError:
            logger.exception("Could not write heartbeat file %s", path)
        await asyncio.sleep(HEARTBEAT_INTERVAL_SECONDS)
