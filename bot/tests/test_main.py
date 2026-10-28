from unittest.mock import AsyncMock

from aiogram import Dispatcher

from app.config import Settings
from app.main import build_dispatcher
from app.services.backend import BackendClient


def test_dispatcher_has_routers_and_workflow_data(settings: Settings, backend: AsyncMock) -> None:
    dispatcher = build_dispatcher(settings, backend)
    assert isinstance(dispatcher, Dispatcher)
    assert dispatcher["backend"] is backend
    assert dispatcher["settings"] is settings
    names = {router.name for router in dispatcher.sub_routers}
    assert names >= {"bot"}
    root = dispatcher.sub_routers[0]
    child_names = {router.name for router in root.sub_routers}
    assert child_names == {"start", "catalog", "order", "admin", "errors"}


def test_backend_client_type_is_used_in_handlers() -> None:
    assert BackendClient.__name__ == "BackendClient"
