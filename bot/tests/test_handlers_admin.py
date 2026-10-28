from unittest.mock import AsyncMock

from app.handlers.admin import cmd_leads, cmd_stats, set_lead_status
from app.services.backend_errors import BackendError
from tests.factories import lead, make_callback, make_message

STATS = {
    "total": {"new": 2, "in_progress": 1, "won": 0, "lost": 0},
    "last_7_days": {"new": 1, "in_progress": 0, "won": 0, "lost": 0},
}
CARD = "<b>Новая заявка #7</b>\nИмя: Айгерим"


async def test_leads_command_lists_recent_leads(backend: AsyncMock) -> None:
    backend.list_recent_leads.return_value = [lead(7), lead(6, "won")]
    message = make_message("/leads")
    await cmd_leads(message, backend)
    backend.list_recent_leads.assert_awaited_once_with(10)
    text = message.answer.await_args.args[0]
    assert "#7 · 29.10 10:15 · Айгерим" in text
    assert "#6" in text and "выиграна" in text


async def test_leads_command_backend_error(backend: AsyncMock) -> None:
    backend.list_recent_leads.side_effect = BackendError("down")
    message = make_message("/leads")
    await cmd_leads(message, backend)
    assert message.answer.await_args.args[0] == "Бэкенд недоступен, попробуйте позже."


async def test_stats_command_replies_with_counts(backend: AsyncMock) -> None:
    backend.get_stats.return_value = STATS
    message = make_message("/stats")
    await cmd_stats(message, backend)
    assert "Всего: 3 (за 7 дней: 1)" in message.answer.await_args.args[0]


async def test_status_button_updates_backend_and_edits_message(backend: AsyncMock) -> None:
    backend.update_lead_status.return_value = lead(7, "won")
    markup = object()
    source = make_message(html_text=CARD, reply_markup=markup)
    callback = make_callback("lead:7:won", message=source)
    await set_lead_status(callback, backend)
    backend.update_lead_status.assert_awaited_once_with(7, "won")
    callback.answer.assert_awaited_once_with("Статус обновлён: выиграна")
    source.edit_text.assert_awaited_once_with(f"{CARD}\nСтатус: выиграна", reply_markup=markup)


async def test_repeated_status_replaces_previous_status_line(backend: AsyncMock) -> None:
    backend.update_lead_status.return_value = lead(7, "lost")
    source = make_message(html_text=f"{CARD}\nСтатус: в работе")
    await set_lead_status(make_callback("lead:7:lost", message=source), backend)
    edited = source.edit_text.await_args.args[0]
    assert edited == f"{CARD}\nСтатус: проиграна"


async def test_status_failure_answers_with_alert(backend: AsyncMock) -> None:
    backend.update_lead_status.side_effect = BackendError("HTTP 404", 404)
    source = make_message(html_text=CARD)
    callback = make_callback("lead:7:won", message=source)
    await set_lead_status(callback, backend)
    callback.answer.assert_awaited_once_with(
        "Не удалось обновить статус. Попробуйте позже.", show_alert=True
    )
    source.edit_text.assert_not_awaited()


async def test_invalid_status_callback_never_calls_backend(backend: AsyncMock) -> None:
    callback = make_callback("lead:7:new")
    await set_lead_status(callback, backend)
    backend.update_lead_status.assert_not_awaited()
    callback.answer.assert_awaited_once_with()
