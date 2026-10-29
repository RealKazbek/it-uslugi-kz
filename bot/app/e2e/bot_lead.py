"""End-to-end order through the real dispatcher and the real backend (run inside the bot container).

    docker compose exec -T bot python -m app.e2e.bot_lead

Telegram is not called: the recording session captures replies. The backend stores the lead
and sends the real admin notification. Prints `E2E_LEAD_ID=<id>` on success and exits 1 otherwise.
"""

import asyncio
import logging
import sys

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.types import Update

from app.config import Settings, load_settings
from app.e2e.recording import RecordingSession
from app.e2e.updates import E2E_USER_ID, callback_update, text_update
from app.main import build_dispatcher
from app.services.backend import BackendClient
from app.services.backend_models import LeadDict
from app.texts.lookup import t

E2E_NAME = "E2E bot test"
E2E_CONTACT = "+77000000002"
E2E_MESSAGE = "M5 end-to-end test from the bot"
STEPS: tuple[Update, ...] = (
    text_update("/start"),
    callback_update("lang:ru"),
    callback_update("menu:catalog"),
    callback_update("cat:websites"),
    callback_update("prod:lending"),
    callback_update("buy:lending"),
    text_update(E2E_NAME),
    text_update(E2E_CONTACT),
    text_update(E2E_MESSAGE),
    callback_update("order:confirm"),
)


class E2ECheckError(Exception):
    """A check of the end-to-end run did not hold."""


async def _run_steps(settings: Settings, backend: BackendClient, session: RecordingSession) -> None:
    bot = Bot(
        token=settings.bot_token,
        session=session,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    dispatcher = build_dispatcher(settings, backend)
    for update in STEPS:
        await dispatcher.feed_update(bot, update)


def _find_lead(leads: list[LeadDict]) -> LeadDict:
    for lead in leads:
        if lead["name"] == E2E_NAME and lead["source"] == "bot":
            return lead
    raise E2ECheckError("no bot lead named E2E_NAME in GET /api/internal/leads?limit=5")


def _check_lead(lead: LeadDict) -> None:
    if lead["telegram_user_id"] != E2E_USER_ID:
        raise E2ECheckError(f"lead {lead['id']} has telegram_user_id {lead['telegram_user_id']}")
    if E2E_CONTACT not in lead["contact"]:
        raise E2ECheckError(f"lead {lead['id']} contact is {lead['contact']!r}")
    if lead["product_slug"] != "lending" or lead["lang"] != "ru":
        raise E2ECheckError(f"lead {lead['id']} product/lang mismatch")


async def run() -> int:
    logging.basicConfig(level=logging.WARNING)
    settings = load_settings()
    backend = BackendClient(settings.backend_url, settings.internal_api_token)
    session = RecordingSession()
    try:
        await _run_steps(settings, backend, session)
        if t("ru", "order.sent") not in session.sent_texts:
            raise E2ECheckError("thank-you text was not sent to the user")
        lead = _find_lead(await backend.list_recent_leads(5))
        _check_lead(lead)
    except E2ECheckError as exc:
        print(f"E2E_BOT_FAILED: {exc}")
        return 1
    finally:
        await backend.aclose()
    print(f"E2E_BOT_OK replies={len(session.sent_texts)} user={E2E_USER_ID}")
    print(f"E2E_LEAD_ID={lead['id']}")
    return 0


def main() -> None:
    sys.exit(asyncio.run(run()))


if __name__ == "__main__":
    main()
