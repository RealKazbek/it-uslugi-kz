import logging
from collections.abc import Mapping
from functools import partial
from typing import Any

from django.db import transaction

from leads.models import Lead
from leads.serializers.lead import lead_kwargs
from leads.services.notifications import notify_new_lead

logger = logging.getLogger(__name__)


def create_lead(data: Mapping[str, Any], source: str) -> Lead:
    """Save a validated lead; the Telegram notification is scheduled after commit."""
    lead = Lead.objects.create(source=source, **lead_kwargs(dict(data)))
    transaction.on_commit(partial(notify_new_lead, lead))
    logger.info("Lead %s created (source=%s)", lead.pk, source)
    return lead
