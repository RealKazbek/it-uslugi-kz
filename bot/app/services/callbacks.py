"""Strict parsing of inline button callback data. Anything unexpected parses to None."""

import re
from dataclasses import dataclass
from typing import Final

# Telegram caps callback_data at 64 bytes: "<action>:<value>" stays well below that.
_ACTION_RE: Final = re.compile(r"^([a-z]{2,8}):([a-z0-9-]{1,59})$")
_LEAD_RE: Final = re.compile(r"^lead:([1-9][0-9]{0,18}):(in_progress|won|lost)$")


@dataclass(frozen=True)
class ButtonAction:
    action: str
    value: str


@dataclass(frozen=True)
class LeadStatusAction:
    lead_id: int
    status: str


def parse_action(data: str | None) -> ButtonAction | None:
    match = _ACTION_RE.fullmatch(data) if data else None
    if match is None:
        return None
    return ButtonAction(action=match.group(1), value=match.group(2))


def parse_lead_action(data: str | None) -> LeadStatusAction | None:
    match = _LEAD_RE.fullmatch(data) if data else None
    if match is None:
        return None
    return LeadStatusAction(lead_id=int(match.group(1)), status=match.group(2))
