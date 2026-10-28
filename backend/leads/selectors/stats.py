from datetime import timedelta
from typing import Any

from django.db.models import Count, QuerySet
from django.utils import timezone

from leads.models import Lead

STATUSES = [status.value for status in Lead.Status]


def _status_counts(queryset: QuerySet[Lead]) -> dict[str, int]:
    counts = {status: 0 for status in STATUSES}
    for row in queryset.values("status").annotate(count=Count("id")):
        counts[row["status"]] = row["count"]
    return counts


def lead_stats() -> dict[str, Any]:
    """Lead counts by status, all-time and for the last 7 days."""
    since = timezone.now() - timedelta(days=7)
    return {
        "total": _status_counts(Lead.objects.all()),
        "last_7_days": _status_counts(Lead.objects.filter(created_at__gte=since)),
    }
