from app.formatting.leads import format_leads, format_stats, status_label
from app.formatting.status import with_status_line
from app.services.backend_models import StatusCountsDict
from tests.factories import lead


def test_format_leads_and_empty_list() -> None:
    assert format_leads([]) == "Заявок пока нет."
    text = format_leads([lead(7, "in_progress")])
    assert text.splitlines()[0] == "Последние заявки:"
    assert "#7 · 29.10 10:15 · Айгерим · +77011234567 · lending · в работе" in text


def test_format_stats_lists_statuses_and_totals() -> None:
    total: StatusCountsDict = {"new": 2, "in_progress": 1, "won": 0, "lost": 3}
    week: StatusCountsDict = {"new": 1, "in_progress": 1, "won": 0, "lost": 3}
    text = format_stats({"total": total, "last_7_days": week})
    assert "новая: 2 (за 7 дней: 1)" in text
    assert "проиграна: 3 (за 7 дней: 3)" in text
    assert "Всего: 6 (за 7 дней: 5)" in text


def test_status_line_is_replaced_not_duplicated() -> None:
    once = with_status_line("<b>Заявка</b>\nИмя: A", "в работе")
    twice = with_status_line(once, "выиграна")
    assert twice.count("Статус:") == 1
    assert twice.endswith("Статус: выиграна")
    assert "Имя: A" in twice


def test_unknown_status_is_shown_raw() -> None:
    assert status_label("archived") == "archived"
    assert "archived" in format_leads([{**lead(3), "status": "archived"}])
