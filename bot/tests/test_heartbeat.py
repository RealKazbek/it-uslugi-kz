import asyncio
import os
import time
from pathlib import Path

import pytest

from app.healthcheck import is_fresh
from app.heartbeat import run_heartbeat, write_heartbeat


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


async def test_run_heartbeat_writes_then_stops_when_cancelled(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    path = tmp_path / "heartbeat"
    task = asyncio.create_task(run_heartbeat(path))
    for _ in range(50):
        if path.exists():
            break
        await asyncio.sleep(0.01)
    task.cancel()
    with pytest.raises(asyncio.CancelledError):
        await task
    assert path.exists()
