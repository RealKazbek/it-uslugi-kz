"""Appends the admin's status line to a lead message, replacing any earlier one."""

from typing import Final

from app.texts.lookup import t

ADMIN_LANG: Final = "ru"
_PREFIX: Final = t(ADMIN_LANG, "admin.status_line", label="").strip()


def with_status_line(html_text: str, label: str) -> str:
    kept = [line for line in html_text.split("\n") if not line.startswith(_PREFIX)]
    kept.append(t(ADMIN_LANG, "admin.status_line", label=label))
    return "\n".join(kept)
