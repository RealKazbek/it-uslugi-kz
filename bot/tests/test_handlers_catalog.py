from unittest.mock import AsyncMock

import pytest
from aiogram.fsm.context import FSMContext

from app.config import Settings
from app.handlers.catalog import show_categories, show_product, show_products
from app.services.backend_errors import BackendError
from app.services.session import set_lang
from app.texts.lookup import t
from tests.factories import card, category, detail, make_callback


async def test_categories_hide_empty_ones(state: FSMContext, backend: AsyncMock) -> None:
    backend.list_categories.return_value = [category("a", 2), category("b", 0)]
    callback = make_callback("menu:catalog")
    await show_categories(callback, state, backend)
    markup = callback.message.answer.await_args.kwargs["reply_markup"]
    assert [row[0].callback_data for row in markup.inline_keyboard] == ["cat:a", "menu:home"]
    assert markup.inline_keyboard[0][0].text == "Сайты (2)"


async def test_categories_empty_message(state: FSMContext, backend: AsyncMock) -> None:
    backend.list_categories.return_value = [category("b", 0)]
    callback = make_callback("menu:catalog")
    await show_categories(callback, state, backend)
    assert callback.message.answer.await_args.args[0] == t("ru", "catalog.empty")


async def test_categories_backend_error_shows_contacts(
    state: FSMContext, backend: AsyncMock
) -> None:
    backend.list_categories.side_effect = BackendError("down")
    callback = make_callback("menu:catalog")
    await show_categories(callback, state, backend)
    text = callback.message.answer.await_args.args[0]
    assert "wa.me/77066620060" in text


async def test_products_list_uses_language_and_links_cards(
    state: FSMContext, backend: AsyncMock
) -> None:
    await set_lang(state, "en")
    backend.list_products.return_value = [card("lending")]
    callback = make_callback("cat:websites")
    await show_products(callback, state, backend)
    backend.list_products.assert_awaited_once_with("websites", "en")
    markup = callback.message.answer.await_args.kwargs["reply_markup"]
    assert markup.inline_keyboard[0][0].callback_data == "prod:lending"
    assert markup.inline_keyboard[0][0].text == "Лендинг, from 150 000 ₸"
    assert markup.inline_keyboard[-1][0].callback_data == "menu:catalog"


async def test_products_empty_category(state: FSMContext, backend: AsyncMock) -> None:
    backend.list_products.return_value = []
    callback = make_callback("cat:websites")
    await show_products(callback, state, backend)
    assert callback.message.answer.await_args.args[0] == t("ru", "catalog.products_empty")


@pytest.mark.parametrize("data", ["cat:", "cat:Bad Slug", "prod:x", None])
async def test_invalid_category_callback_makes_no_backend_call(
    state: FSMContext, backend: AsyncMock, data: str | None
) -> None:
    callback = make_callback(data)
    await show_products(callback, state, backend)
    backend.list_products.assert_not_awaited()
    callback.message.answer.assert_not_awaited()


async def test_product_card_has_order_and_back_buttons(
    state: FSMContext, backend: AsyncMock, settings: Settings
) -> None:
    backend.get_product.return_value = detail("lending")
    callback = make_callback("prod:lending")
    await show_product(callback, state, backend, settings)
    text = callback.message.answer.await_args.args[0]
    assert "https://site.test/products/lending" in text
    markup = callback.message.answer.await_args.kwargs["reply_markup"]
    assert [row[0].callback_data for row in markup.inline_keyboard] == [
        "buy:lending",
        "cat:websites",
    ]


async def test_product_404_says_not_available(
    state: FSMContext, backend: AsyncMock, settings: Settings
) -> None:
    backend.get_product.side_effect = BackendError("HTTP 404", 404)
    callback = make_callback("prod:missing")
    await show_product(callback, state, backend, settings)
    assert callback.message.answer.await_args.args[0] == t("ru", "product.not_found")


async def test_product_server_error_shows_contacts(
    state: FSMContext, backend: AsyncMock, settings: Settings
) -> None:
    backend.get_product.side_effect = BackendError("HTTP 500", 500)
    callback = make_callback("prod:lending")
    await show_product(callback, state, backend, settings)
    assert "wa.me/77066620060" in callback.message.answer.await_args.args[0]
