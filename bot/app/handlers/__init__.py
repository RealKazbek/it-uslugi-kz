"""aiogram handlers, one module per feature. Thin: validate, call a service, respond."""

from aiogram import Router

from app.handlers import catalog, errors, order, start


def build_router() -> Router:
    root = Router(name="bot")
    root.include_routers(start.router, catalog.router, order.router, errors.router)
    return root
