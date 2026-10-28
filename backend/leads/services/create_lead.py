import logging
from collections.abc import Mapping
from functools import partial
from typing import Any

from django.db import transaction

from catalog.models import Product
from leads.models import Lead
from leads.services.notifications import notify_new_lead

logger = logging.getLogger(__name__)


def create_lead(data: Mapping[str, Any], source: str) -> Lead:
    """Save a validated lead; the Telegram notification is scheduled after commit."""
    product, message = _resolve_product(data.get("product") or None, data.get("message", ""))
    lead = Lead.objects.create(
        source=source,
        name=data["name"],
        contact=data["contact"],
        channel=data.get("channel", Lead.Channel.OTHER),
        product=product,
        message=message,
        page_url=data.get("page_url", ""),
        lang=data.get("lang", Lead.Lang.RU),
        telegram_user_id=data.get("telegram_user_id"),
    )
    transaction.on_commit(partial(notify_new_lead, lead), robust=True)
    logger.info("Lead %s created (source=%s)", lead.pk, source)
    return lead


def _resolve_product(slug: str | None, message: str) -> tuple[Product | None, str]:
    """Active product or None. An unknown or inactive slug is kept as a note in the message."""
    if not slug:
        return None, message
    product = Product.objects.filter(slug=slug, is_active=True).first()
    if product is not None:
        return product, message
    logger.info("Lead saved without product: slug %r is unknown or inactive", slug)
    note = f"[product: {slug}]"
    return None, f"{message}\n{note}" if message else note
