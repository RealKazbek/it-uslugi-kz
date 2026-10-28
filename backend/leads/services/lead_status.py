from leads.models import Lead


def update_lead_status(lead: Lead, status: str) -> Lead:
    lead.status = status
    lead.save(update_fields=["status"])
    return lead
