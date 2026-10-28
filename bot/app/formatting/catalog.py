"""Category buttons, product buttons and the product card (HTML)."""

from html import escape

from app.formatting.prices import days_line, price_line
from app.services.backend_models import CategoryDict, ProductCardDict, ProductDetailDict
from app.texts.lookup import Lang, t


def localized_name(category: CategoryDict, lang: Lang) -> str:
    names = {"ru": category["name_ru"], "kk": category["name_kk"], "en": category["name_en"]}
    return names[lang]


def category_button_label(lang: Lang, category: CategoryDict) -> str:
    return t(
        lang,
        "catalog.category_button",
        name=localized_name(category, lang),
        count=category["product_count"],
    )


def product_button_label(lang: Lang, card: ProductCardDict) -> str:
    price = price_line(lang, card["price_from_kzt"], card["unit"])
    return t(lang, "catalog.product_button", title=card["title"], price=price)


def product_url(site_url: str, lang: Lang, slug: str) -> str:
    """Russian has no URL prefix; kk and en live under /kk and /en."""
    prefix = "" if lang == "ru" else f"/{lang}"
    return f"{site_url}{prefix}/products/{slug}"


def product_card_text(lang: Lang, detail: ProductDetailDict, site_url: str) -> str:
    url = product_url(site_url, lang, detail["slug"])
    lines = [
        f"<b>{escape(detail['title'])}</b>",
        escape(detail["short"]),
        "",
        price_line(lang, detail["price_from_kzt"], detail["unit"]),
        days_line(lang, detail["days_min"], detail["days_max"]),
        "",
        t(lang, "product.more", url=f'<a href="{escape(url)}">{escape(url)}</a>'),
    ]
    return "\n".join(lines)
