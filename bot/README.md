# bot (aiogram 3)

Telegram bot for RK Dev: language picker, catalog browsing, order intake (POST /api/internal/leads)
and admin commands for the admin chat (`/leads`, `/stats`, status buttons on lead notifications).

## Layout

- `app/config.py` is the only module that reads environment variables.
- `app/main.py` long polling with MemoryStorage, SIGTERM stops polling, closes the httpx client.
- `app/handlers/` one module per feature (start, catalog, order, admin, errors). Handlers only validate, call a service and reply.
- `app/services/` backend client (`backend.py`, `BackendError` on any failure), validation, callback parsing, FSM helpers.
- `app/formatting/` pure text builders. `app/keyboards/` inline and reply keyboards.
- `app/texts/` ru, kk, en tables with the same keys; `t(lang, key, **params)` looks them up.
- `app/logging_setup.py` redacts the bot token from all log output and keeps httpx/httpcore at WARNING.

## Environment

Required: `TELEGRAM_BOT_TOKEN`, `ADMIN_CHAT_ID` (integer), `INTERNAL_API_TOKEN`.
Optional: `BACKEND_URL` (default `http://backend:8000`), `SITE_URL` (default `https://uslugi.realkazbek.site`).
Values come from `.env` through docker compose; they are never written to code or logs.

## Healthcheck

The bot serves no HTTP. A background task writes the current time to `/tmp/bot-heartbeat` every
30 seconds. The container healthcheck runs `python -m app.healthcheck`, which exits 0 while that file
is at most 90 seconds old and 1 otherwise. A blocked or dead event loop therefore turns the container unhealthy.

## Tests

```
pip install -r requirements.txt -r requirements-dev.txt
ruff check . && ruff format --check . && mypy . && pytest
```

Backend calls are mocked (`httpx.MockTransport` for the client, `AsyncMock(spec=BackendClient)` for handlers).
