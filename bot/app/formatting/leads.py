"""Admin views of leads and statistics (always in Russian)."""

from datetime import datetime
from html import escape
from typing import Final

from app.services.backend_models import LeadDict, LeadStatsDict, StatusCountsDict
from app.texts.lookup import t

ADMIN_LANG: Final = "ru"
STATUS_ORDER: Final = ("new", "in_progress", "won", "lost")


def status_label(status: str) -> str:
    """Known statuses get their label; an unknown value is shown as the backend sent it."""
    try:
        return t(ADMIN_LANG, f"status.{status}")
    except KeyError:
        return status


def format_created(created_at: str) -> str:
    try:
        return datetime.fromisoformat(created_at).strftime("%d.%m %H:%M")
    except ValueError:
        return created_at


def format_lead_line(lead: LeadDict) -> str:
    return t(
        ADMIN_LANG,
        "admin.leads_line",
        id=lead["id"],
        date=escape(format_created(lead["created_at"])),
        name=escape(lead["name"]),
        contact=escape(lead["contact"]),
        product=escape(lead["product_slug"] or "—"),
        status=escape(status_label(lead["status"])),
    )


def format_leads(leads: list[LeadDict]) -> str:
    if not leads:
        return t(ADMIN_LANG, "admin.leads_empty")
    lines = [t(ADMIN_LANG, "admin.leads_title"), *(format_lead_line(lead) for lead in leads)]
    return "\n".join(lines)


def _by_status(counts: StatusCountsDict) -> dict[str, int]:
    return {
        "new": counts["new"],
        "in_progress": counts["in_progress"],
        "won": counts["won"],
        "lost": counts["lost"],
    }


def format_stats(stats: LeadStatsDict) -> str:
    total = _by_status(stats["total"])
    week = _by_status(stats["last_7_days"])
    lines = [t(ADMIN_LANG, "admin.stats_title")]
    for status in STATUS_ORDER:
        row = t(
            ADMIN_LANG,
            "admin.stats_row",
            label=escape(status_label(status)),
            total=total[status],
            week=week[status],
        )
        lines.append(row)
    lines.append(
        t(ADMIN_LANG, "admin.stats_sum", total=sum(total.values()), week=sum(week.values()))
    )
    return "\n".join(lines)
