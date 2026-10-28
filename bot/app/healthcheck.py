"""Container healthcheck: exit 0 while the heartbeat file is fresh, otherwise exit 1."""

import sys
import time
from pathlib import Path

from app.heartbeat import HEARTBEAT_PATH

MAX_AGE_SECONDS = 90.0  # three missed 30 s heartbeats


def is_fresh(path: Path, max_age: float = MAX_AGE_SECONDS, now: float | None = None) -> bool:
    try:
        modified = path.stat().st_mtime
    except OSError:
        return False
    current = time.time() if now is None else now
    return current - modified <= max_age


def main() -> None:
    sys.exit(0 if is_fresh(HEARTBEAT_PATH) else 1)


if __name__ == "__main__":
    main()
