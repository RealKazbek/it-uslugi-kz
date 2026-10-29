"""aiogram handlers, one module per feature. Thin: validate, call a service, respond."""

from aiogram import Router
from aiogram.fsm.storage.base import BaseStorage

from app.handlers import admin, catalog, fallback, order, start
from app.handlers.errors import build_errors_router


def _attach(root: Router, router: Router) -> None:
    """Feature routers are module-level singletons. Detach them first so that several
    dispatchers can be built in one process (tests); production builds exactly one."""
    router._parent_router = None
    root.include_router(router)


def build_router(storage: BaseStorage) -> Router:
    root = Router(name="bot")
    for feature in (start.router, catalog.router, admin.router, order.router):
        _attach(root, feature)
    _attach(root, build_errors_router(storage))
    _attach(root, fallback.router)
    return root
