"""Drives the real dispatcher (routers, FSM, filters) with a mocked backend and a recorder."""

from unittest.mock import AsyncMock

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.methods import EditMessageText

from app.config import Settings
from app.main import build_dispatcher
from app.services.backend_errors import BackendError
from app.texts.lookup import t
from tests.factories import card, lead
from tests.fake_telegram import (
    RecordingSession,
    callback_answers,
    callback_update,
    message_update,
    sent_texts,
)

CLIENT = 555
CARD_TEXT = "Новая заявка #7\nИмя: Айгерим"


def _bot(session: RecordingSession) -> Bot:
    return Bot(
        token="42:fake-token",
        session=session,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )


async def test_backend_failure_in_callback_uses_error_handler(
    settings: Settings, backend: AsyncMock
) -> None:
    backend.list_categories.side_effect = RuntimeError("unexpected")
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    await dispatcher.feed_update(
        bot, callback_update("menu:catalog", chat_id=CLIENT, user_id=CLIENT)
    )
    assert sent_texts(session)[-1].startswith("Что-то пошло не так")
    answer = callback_answers(session)[-1]
    assert answer.text == t("ru", "error.short")
    assert answer.show_alert is None


async def test_double_status_press_edits_once_and_answers_silently(
    settings: Settings, backend: AsyncMock
) -> None:
    backend.update_lead_status.return_value = lead(7, "won")
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    admin = settings.admin_chat_id
    await dispatcher.feed_update(
        bot,
        callback_update("lead:7:won", chat_id=admin, user_id=admin, message_text=CARD_TEXT),
    )
    edited = session.of_type(EditMessageText)
    assert len(edited) == 1
    assert edited[0].text == f"{CARD_TEXT}\nСтатус: выиграна"
    await dispatcher.feed_update(
        bot,
        callback_update("lead:7:won", chat_id=admin, user_id=admin, message_text=edited[0].text),
    )
    assert len(session.of_type(EditMessageText)) == 1
    assert callback_answers(session)[-1].text is None


async def test_command_during_order_flow_is_rejected_not_swallowed(
    settings: Settings, backend: AsyncMock
) -> None:
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    await dispatcher.feed_update(bot, callback_update("menu:order", chat_id=CLIENT, user_id=CLIENT))
    await dispatcher.feed_update(bot, message_update("/leads", chat_id=CLIENT, user_id=CLIENT))
    assert sent_texts(session)[-1] == t("ru", "order.command_like")
    backend.list_recent_leads.assert_not_awaited()


async def test_non_admin_status_callback_is_ignored(settings: Settings, backend: AsyncMock) -> None:
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    await dispatcher.feed_update(bot, callback_update("lead:7:won", chat_id=CLIENT, user_id=CLIENT))
    backend.update_lead_status.assert_not_awaited()
    assert sent_texts(session) == []
    answer = callback_answers(session)[-1]
    assert answer.text is None


async def test_stray_text_outside_flow_gets_start_hint(
    settings: Settings, backend: AsyncMock
) -> None:
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    await dispatcher.feed_update(bot, message_update("hello", chat_id=CLIENT, user_id=CLIENT))
    assert sent_texts(session) == [t("ru", "hint.start")]


async def test_client_catalog_flow_reaches_backend_through_routers(
    settings: Settings, backend: AsyncMock
) -> None:
    backend.get_product.return_value = {**card("lending"), "days_min": 3, "days_max": 5}
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    await dispatcher.feed_update(
        bot, callback_update("prod:lending", chat_id=CLIENT, user_id=CLIENT)
    )
    backend.get_product.assert_awaited_once_with("lending", "ru")
    assert "https://site.test/products/lending" in sent_texts(session)[-1]


async def test_backend_error_on_product_card_shows_contacts(
    settings: Settings, backend: AsyncMock
) -> None:
    backend.get_product.side_effect = BackendError("HTTP 500", 500)
    session = RecordingSession()
    bot = _bot(session)
    dispatcher = build_dispatcher(settings, backend)
    await dispatcher.feed_update(
        bot, callback_update("prod:lending", chat_id=CLIENT, user_id=CLIENT)
    )
    assert "wa.me/77066620060" in sent_texts(session)[-1]
