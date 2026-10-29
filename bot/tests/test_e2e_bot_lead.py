"""Unit tests for the end-to-end bot module: lead selection and failure reporting, offline."""

from typing import Any
from unittest.mock import AsyncMock

import pytest

from app.e2e import bot_lead
from app.e2e.bot_lead import E2ECheckError, check_lead, newest_id, run, select_lead
from app.e2e.updates import E2E_USER_ID
from app.services.backend import BackendClient
from app.services.backend_errors import BackendError
from app.services.backend_models import LeadDict
from tests.factories import lead as make_lead


def _e2e(lead_id: int, source: str = "bot", name: str = bot_lead.E2E_NAME) -> LeadDict:
    row = make_lead(lead_id)
    return {
        **row,
        "name": name,
        "contact": bot_lead.E2E_CONTACT + " (@e2e_m5)",
        "source": source,
        "telegram_user_id": E2E_USER_ID,
    }


def test_select_lead_ignores_leads_at_or_below_baseline() -> None:
    leads = [_e2e(15), _e2e(14), _e2e(9)]
    assert select_lead(leads, baseline=14, created_id=None)["id"] == 15


def test_select_lead_fails_when_only_old_leads_exist() -> None:
    with pytest.raises(E2ECheckError):
        select_lead([_e2e(14)], baseline=14, created_id=None)


def test_select_lead_prefers_the_created_id() -> None:
    leads = [_e2e(16), _e2e(15)]
    assert select_lead(leads, baseline=10, created_id=15)["id"] == 15


def test_select_lead_fails_when_created_id_is_missing() -> None:
    with pytest.raises(E2ECheckError):
        select_lead([_e2e(16)], baseline=10, created_id=15)


def test_select_lead_ignores_site_leads_and_other_names() -> None:
    leads = [_e2e(20, source="site"), _e2e(21, name="Someone else")]
    with pytest.raises(E2ECheckError):
        select_lead(leads, baseline=0, created_id=None)


def test_check_lead_rejects_wrong_user() -> None:
    row: LeadDict = {**_e2e(30), "telegram_user_id": 1}
    with pytest.raises(E2ECheckError):
        check_lead(row)


def test_check_lead_accepts_expected_lead() -> None:
    row: LeadDict = {**_e2e(31), "product_slug": "lending", "lang": "ru"}
    check_lead(row)


def test_newest_id_of_empty_list_is_zero() -> None:
    assert newest_id([]) == 0
    assert newest_id([_e2e(3), _e2e(7)]) == 7


async def test_run_reports_backend_error_as_failure(
    settings: Any, capsys: pytest.CaptureFixture[str]
) -> None:
    backend = AsyncMock(spec=BackendClient)
    backend.list_recent_leads.side_effect = BackendError("backend down")
    code = await run(settings, backend)
    assert code == 1
    assert "E2E_BOT_FAILED: BackendError: backend down" in capsys.readouterr().out


async def test_run_fails_when_no_new_lead_is_created(
    settings: Any, capsys: pytest.CaptureFixture[str]
) -> None:
    backend = AsyncMock(spec=BackendClient)
    backend.list_recent_leads.return_value = [_e2e(14)]
    backend.create_lead.return_value = 15
    code = await run(settings, backend)
    out = capsys.readouterr().out
    assert code == 1
    assert "E2E_BOT_FAILED" in out
    assert "E2E_LEAD_ID" not in out
