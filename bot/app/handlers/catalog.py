"""Catalog browsing: categories, products in a category, product card."""

import logging

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery

from app.config import Settings
from app.formatting.catalog import product_card_text
from app.formatting.contacts import unavailable_text
from app.handlers.common import reply_to_callback
from app.keyboards.catalog import categories_keyboard, product_card_keyboard, products_keyboard
from app.services.backend import BackendClient
from app.services.backend_errors import BackendError
from app.services.callbacks import parse_action
from app.services.session import get_lang
from app.texts.lookup import t

logger = logging.getLogger(__name__)
router = Router(name="catalog")


@router.callback_query(F.data == "menu:catalog")
async def show_categories(
    callback: CallbackQuery, state: FSMContext, backend: BackendClient
) -> None:
    lang = await get_lang(state)
    await callback.answer()
    try:
        categories = await backend.list_categories()
    except BackendError:
        await reply_to_callback(callback, unavailable_text(lang))
        return
    visible = [category for category in categories if category["product_count"] > 0]
    if not visible:
        await reply_to_callback(callback, t(lang, "catalog.empty"))
        return
    await reply_to_callback(callback, t(lang, "catalog.title"), categories_keyboard(lang, visible))


@router.callback_query(F.data.startswith("cat:"))
async def show_products(callback: CallbackQuery, state: FSMContext, backend: BackendClient) -> None:
    lang = await get_lang(state)
    action = parse_action(callback.data)
    await callback.answer()
    if action is None or action.action != "cat":
        return
    try:
        products = await backend.list_products(action.value, lang)
    except BackendError:
        await reply_to_callback(callback, unavailable_text(lang))
        return
    if not products:
        await reply_to_callback(callback, t(lang, "catalog.products_empty"))
        return
    await reply_to_callback(
        callback, t(lang, "catalog.products_title"), products_keyboard(lang, products)
    )


@router.callback_query(F.data.startswith("prod:"))
async def show_product(
    callback: CallbackQuery, state: FSMContext, backend: BackendClient, settings: Settings
) -> None:
    lang = await get_lang(state)
    action = parse_action(callback.data)
    await callback.answer()
    if action is None or action.action != "prod":
        return
    try:
        detail = await backend.get_product(action.value, lang)
    except BackendError as exc:
        text = t(lang, "product.not_found") if exc.status_code == 404 else unavailable_text(lang)
        await reply_to_callback(callback, text)
        return
    await reply_to_callback(
        callback,
        product_card_text(lang, detail, settings.site_url),
        product_card_keyboard(lang, detail["slug"], detail["category"]),
    )
