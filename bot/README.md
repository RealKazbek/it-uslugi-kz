# bot (aiogram 3)

Telegram bot for Perne: language picker, catalog browsing, order intake (POST /api/internal/leads)
and admin commands for the admin chat (`/leads`, `/stats`, status buttons on lead notifications).

## Layout

- `app/config.py` is the only module that reads environment variables.
- `app/main.py` long polling with MemoryStorage (aiogram handles SIGTERM), closes the httpx client.
- `app/handlers/` one module per feature (start, catalog, order, admin, errors, fallback). Handlers only validate, call a service and reply. Router order: start, catalog, admin, order, errors, fallback (catch-alls last).
- `app/services/` backend client (`backend.py`, `BackendError` on any failure), validation, callback parsing, FSM helpers.
- `app/formatting/` pure text builders. `app/keyboards/` inline and reply keyboards.
- `app/texts/` ru, kk, en tables with the same keys; `t(lang, key, **params)` looks them up.
- `app/logging_setup.py` redacts the bot token from all log output and keeps httpx/httpcore at WARNING.

## Environment

Required: `TELEGRAM_BOT_TOKEN`, `ADMIN_CHAT_ID` (integer), `INTERNAL_API_TOKEN`.
Optional: `BACKEND_URL` (default `http://backend:8000`), `SITE_URL` (default `https://uslugi.realkazbek.site`).
Values come from `.env` through docker compose; they are never written to code or logs.

## Healthcheck

The bot serves no HTTP. Every 30 seconds it calls `getMe` and, only if that succeeds, writes the current
time to `/tmp/bot-heartbeat`. A failed `getMe` (Telegram unreachable, bad token) is logged as a warning
and leaves the file stale. The container healthcheck (defined once, in the Dockerfile) runs
`python -m app.healthcheck`, which exits 0 while the file is at most 90 seconds old and 1 otherwise.
So the container is healthy only while Telegram answers and the event loop runs.

Limitation: the check does not detect a `409 Conflict` from a second poller running with the same token. `getMe` still succeeds, so the container stays healthy while the other poller takes updates. Run exactly one bot instance per token.

## Tests

```
pip install -r requirements.txt -r requirements-dev.txt
ruff check . && ruff format --check . && mypy . && pytest
```

Backend calls are mocked (`httpx.MockTransport` for the client, `AsyncMock(spec=BackendClient)` for handlers).
