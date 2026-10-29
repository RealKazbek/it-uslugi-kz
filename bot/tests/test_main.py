from unittest.mock import AsyncMock

from aiogram import Dispatcher

from app.config import Settings
from app.main import build_dispatcher


def test_dispatcher_wires_workflow_data_and_routers(settings: Settings, backend: AsyncMock) -> None:
    dispatcher = build_dispatcher(settings, backend)
    assert isinstance(dispatcher, Dispatcher)
    assert dispatcher["backend"] is backend
    assert dispatcher["settings"] is settings
    root = dispatcher.sub_routers[0]
    child_names = [router.name for router in root.sub_routers]
    assert child_names == ["start", "catalog", "admin", "order", "errors", "fallback"]
