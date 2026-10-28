import pytest
from django.test import override_settings

from core.tests.factories import make_product
from leads.models import Lead
from leads.services.notification_text import build_lead_message, status_keyboard


@pytest.mark.django_db
@override_settings(SITE_URL="https://uslugi.realkazbek.site")
def test_message_escapes_user_input_and_shows_product() -> None:
    product = make_product(slug="landing", title_ru="Лендинг")
    lead = Lead.objects.create(
        name="<script>alert(1)</script>",
        contact="a & b",
        message="<b>x</b>",
        page_url="https://ex.test/?a=1&b=2",
        product=product,
    )

    text = build_lead_message(lead)

    assert "&lt;script&gt;alert(1)&lt;/script&gt;" in text
    assert "a &amp; b" in text
    assert "&lt;b&gt;x&lt;/b&gt;" in text
    assert "<script>" not in text
    assert "Лендинг (https://uslugi.realkazbek.site/products/landing)" in text
    assert text.startswith(f"<b>Новая заявка #{lead.pk}</b>")


def test_message_without_product_shows_dash() -> None:
    lead = Lead(pk=7, name="Айгүл", contact="c")

    text = build_lead_message(lead)

    assert "Услуга: —" in text
    assert "Сообщение: —" in text


def test_keyboard_has_three_buttons_with_status_callbacks() -> None:
    keyboard = status_keyboard(12)

    row = keyboard["inline_keyboard"][0]
    assert [button["text"] for button in row] == ["В работе", "Выиграна", "Проиграна"]
    assert [button["callback_data"] for button in row] == [
        "lead:12:in_progress",
        "lead:12:won",
        "lead:12:lost",
    ]
