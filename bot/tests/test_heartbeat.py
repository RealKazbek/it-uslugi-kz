import logging
import os
import time
from pathlib import Path
from unittest.mock import AsyncMock

import pytest
from aiogram.exceptions import TelegramNetworkError
from aiogram.methods import GetMe

from app.healthcheck import is_fresh
from app.heartbeat import heartbeat_tick, write_heartbeat


def test_write_heartbeat_and_freshness(tmp_path: Path) -> None:
    path = tmp_path / "heartbeat"
    assert is_fresh(path) is False
    write_heartbeat(path)
    assert is_fresh(path) is True
    old = time.time() - 300
    os.utime(path, (old, old))
    assert is_fresh(path) is False


def test_is_fresh_respects_explicit_clock(tmp_path: Path) -> None:
    path = tmp_path / "heartbeat"
    path.write_text("x")
    modified = path.stat().st_mtime
    assert is_fresh(path, max_age=10, now=modified + 5) is True
    assert is_fresh(path, max_age=10, now=modified + 11) is False


async def test_tick_writes_only_after_get_me_succeeds(tmp_path: Path) -> None:
    path = tmp_path / "heartbeat"
    bot = AsyncMock()
    assert await heartbeat_tick(bot, path) is True
    bot.get_me.assert_awaited_once()
    assert is_fresh(path) is True


async def test_failed_get_me_does_not_refresh_and_logs_warning(
    tmp_path: Path, caplog: pytest.LogCaptureFixture
) -> None:
    path = tmp_path / "heartbeat"
    old = time.time() - 300
    write_heartbeat(path)
    os.utime(path, (old, old))
    bot = AsyncMock()
    bot.get_me.side_effect = TelegramNetworkError(method=GetMe(), message="unreachable")
    with caplog.at_level(logging.WARNING):
        assert await heartbeat_tick(bot, path) is False
    assert is_fresh(path) is False
    assert "getMe failed (TelegramNetworkError)" in caplog.text
