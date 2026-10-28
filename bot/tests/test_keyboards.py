from app.keyboards.catalog import categories_keyboard, product_card_keyboard
from app.keyboards.order import confirm_keyboard, share_contact_keyboard, skip_keyboard
from tests.factories import card, category


def test_share_contact_button_requests_contact() -> None:
    markup = share_contact_keyboard("ru")
    button = markup.keyboard[0][0]
    assert button.request_contact is True
    assert button.text == "Поделиться номером"


def test_skip_and_confirm_keyboards() -> None:
    assert skip_keyboard("en").keyboard[0][0].text == "Skip"
    rows = confirm_keyboard("kk").inline_keyboard
    assert [row[0].callback_data for row in rows] == ["order:confirm", "order:cancel"]


def test_categories_keyboard_ends_with_menu_button() -> None:
    markup = categories_keyboard("ru", [category("websites", 2)])
    assert markup.inline_keyboard[-1][0].callback_data == "menu:home"


def test_product_card_keyboard_callbacks() -> None:
    markup = product_card_keyboard("en", "lending", "websites")
    assert [row[0].callback_data for row in markup.inline_keyboard] == [
        "buy:lending",
        "cat:websites",
    ]
    assert card()["slug"] == "lending"
