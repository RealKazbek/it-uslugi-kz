"""Order summary shown before sending."""

from html import escape

from app.services.order_draft import OrderDraft
from app.texts.lookup import Lang, t


def order_summary(lang: Lang, draft: OrderDraft) -> str:
    return t(
        lang,
        "order.summary",
        name=escape(draft.name),
        contact=escape(draft.contact),
        product=escape(draft.product_title or "—"),
        message=escape(draft.message) or "—",
    )
