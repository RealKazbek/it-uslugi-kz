"""The order being collected in FSM data, and its conversion to a lead payload."""

from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any

from app.services.backend_models import LeadPayload

CHANNEL_TELEGRAM = "telegram"
CHANNEL_PHONE = "phone"


@dataclass(frozen=True)
class OrderDraft:
    name: str
    contact: str
    message: str
    product_slug: str | None
    product_title: str | None
    channel: str = CHANNEL_TELEGRAM

    @classmethod
    def from_data(cls, data: Mapping[str, Any]) -> "OrderDraft | None":
        name = data.get("name")
        contact = data.get("contact")
        if not isinstance(name, str) or not isinstance(contact, str):
            return None
        message = data.get("message")
        slug = data.get("product_slug")
        title = data.get("product_title")
        channel = data.get("channel")
        return cls(
            name=name,
            contact=contact,
            message=message if isinstance(message, str) else "",
            product_slug=slug if isinstance(slug, str) else None,
            product_title=title if isinstance(title, str) else None,
            channel=channel if channel == CHANNEL_PHONE else CHANNEL_TELEGRAM,
        )


def build_lead_payload(draft: OrderDraft, lang: str, telegram_user_id: int | None) -> LeadPayload:
    return LeadPayload(
        name=draft.name,
        contact=draft.contact,
        channel=draft.channel,
        product=draft.product_slug,
        message=draft.message,
        page_url="",
        lang=lang,
        telegram_user_id=telegram_user_id,
    )
