from leads.models import Lead


def recent_leads(limit: int) -> list[Lead]:
    """Newest first, with the product joined for its title."""
    return list(Lead.objects.select_related("product").order_by("-created_at", "-id")[:limit])


def get_lead(pk: int) -> Lead | None:
    return Lead.objects.select_related("product").filter(pk=pk).first()
