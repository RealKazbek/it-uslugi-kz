from app.formatting.catalog import (
    category_button_label,
    product_button_label,
    product_card_text,
    product_url,
)
from app.formatting.contacts import contacts_block
from app.formatting.order import order_summary
from app.formatting.prices import days_line, format_amount, price_line
from app.services.order_draft import OrderDraft
from tests.factories import card, category, detail

SITE = "https://site.test"


def test_format_amount_uses_space_separator() -> None:
    assert format_amount(1500000) == "1 500 000 ₸"
    assert format_amount(0) == "0 ₸"


def test_price_line_adds_unit_suffix() -> None:
    assert price_line("ru", 150000, "once") == "от 150 000 ₸"
    assert price_line("ru", 50000, "month") == "от 50 000 ₸ / мес."
    assert price_line("en", 5000, "hour") == "from 5 000 ₸ / hour"


def test_days_line_single_and_range() -> None:
    assert days_line("ru", 3, 3) == "Срок: 3 дн."
    assert days_line("en", 3, 5) == "Timeline: 3–5 days"


def test_product_url_prefixes_by_language() -> None:
    assert product_url(SITE, "ru", "lending") == f"{SITE}/products/lending"
    assert product_url(SITE, "kk", "lending") == f"{SITE}/kk/products/lending"
    assert product_url(SITE, "en", "lending") == f"{SITE}/en/products/lending"


def test_category_and_product_buttons() -> None:
    assert category_button_label("ru", category(count=2)) == "Сайты (2)"
    assert category_button_label("en", category(count=2)) == "Websites (2)"
    assert product_button_label("ru", card()) == "Лендинг, от 150 000 ₸"


def test_product_card_contains_link_and_escapes_text() -> None:
    text = product_card_text("ru", {**detail(), "title": "<b>X</b>"}, SITE)
    assert "&lt;b&gt;X&lt;/b&gt;" in text
    assert f'href="{SITE}/products/lending"' in text
    assert "Срок: 3–5 дн." in text


def test_contacts_block_lists_all_channels() -> None:
    block = contacts_block("ru")
    assert "https://wa.me/77066620060" in block
    assert "https://t.me/RealKazbek" in block
    assert "8 706 662 00 60" in block
    assert "37765@iitu.edu.kz" in block


def test_order_summary_escapes_and_defaults() -> None:
    draft = OrderDraft("<i>A</i>", "@x", "", None, None)
    text = order_summary("ru", draft)
    assert "&lt;i&gt;A&lt;/i&gt;" in text
    assert "Услуга: —" in text
    assert "Сообщение: —" in text
