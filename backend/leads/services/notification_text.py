"""Telegram message body and status buttons for a new lead. Pure functions, no I/O."""

from html import escape
from typing import Any

from django.conf import settings

from leads.models import Lead

STATUS_BUTTONS = (
    (Lead.Status.IN_PROGRESS, "В работе"),
    (Lead.Status.WON, "Выиграна"),
    (Lead.Status.LOST, "Проиграна"),
)


def build_lead_message(lead: Lead) -> str:
    """HTML body. Every user-supplied value is escaped."""
    product = lead.product
    if product is None:
        product_line = "—"
    else:
        url = f"{settings.SITE_URL}/products/{product.slug}"
        product_line = f"{escape(product.title_ru)} ({escape(url)})"
    rows = [
        f"<b>Новая заявка #{lead.pk}</b>",
        f"Имя: {escape(lead.name)}",
        f"Контакт: {escape(lead.contact)}",
        f"Как ответить: {escape(lead.get_channel_display())}",
        f"Источник: {escape(lead.get_source_display())}",
        f"Услуга: {product_line}",
        f"Язык: {escape(lead.lang)}",
        f"Сообщение: {escape(lead.message) or '—'}",
        f"Страница: {escape(lead.page_url) or '—'}",
    ]
    return "\n".join(rows)


def status_keyboard(lead_id: int) -> dict[str, Any]:
    """One row of three inline buttons; callback_data is `lead:{id}:{status}`."""
    row = [
        {"text": label, "callback_data": f"lead:{lead_id}:{status.value}"}
        for status, label in STATUS_BUTTONS
    ]
    return {"inline_keyboard": [row]}
