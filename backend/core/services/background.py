import threading
from collections.abc import Callable
from typing import Any


def run_in_daemon_thread(target: Callable[..., Any], *args: Any) -> None:
    """Run `target(*args)` in a daemon thread so the HTTP request never waits for it."""
    thread = threading.Thread(target=target, args=args, daemon=True)
    thread.start()
