# Perne: IT services site (v3)

Website and order flow for a freelance IT services offer ("Perne"). Products (websites, Telegram bots,
automation, e-commerce, AI, education, and more) live in a database. Adding a product in the Django admin
creates its pages in Russian, Kazakh and English. Each lead from the site or the bot is stored and sent to
the owner's Telegram chat, where the owner can change its status with inline buttons.

The business is run by a self-employed individual (no LLC, no IP). The site makes no claims about invoices,
VAT or a legal entity. Honesty rules for the content are in `docs/history/DECISIONS-v1-v2.md`.

## Architecture

| Part | Stack | Role |
| --- | --- | --- |
| `backend/` | Django 5.1, DRF, PostgreSQL 16, gunicorn | Catalog and city data, admin panel, read API, lead API, Telegram notification, frontend revalidation |
| `frontend/` | Next.js 15 (App Router), React 19, TypeScript strict, Tailwind | Pages in ru (`/`), kk (`/kk`), en (`/en`); ISR with on-demand revalidation; SEO (sitemap, hreflang, JSON-LD) |
| `bot/` | aiogram 3, long polling | Client flow (language, catalog, order) and owner commands (`/leads`, `/stats`, status buttons) |
| `db` | PostgreSQL 16 (Docker) | Named volume `pgdata` |

Data flow: the browser calls the Next route `/api/lead`, which forwards to the backend. The bot calls the
backend internal API with `X-Internal-Token`. The backend notifies the admin chat after the lead commits,
and asks the frontend to revalidate changed pages. Only the backend talks to Telegram's Bot API and only
the bot receives updates from it.

## Run locally (macOS)

Prerequisites: Docker Desktop running (`open -a Docker`), GNU make (ships with Xcode Command Line Tools:
`xcode-select --install`), and python3 (for generating secrets). Nothing else: Node and Python dependencies
are installed inside the images.

```
cp .env.example .env
```

Fill the values in `.env` (table below), then:

```
make dev
docker compose exec backend python manage.py createsuperuser    # once
```

| Variable | Value |
| --- | --- |
| `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` | Required. Any values locally, e.g. `uslugi` / `uslugi` / a random password |
| `DJANGO_SECRET_KEY`, `INTERNAL_API_TOKEN` | Required. Generate with `python3 -c "import secrets;print(secrets.token_urlsafe(50))"` |
| `TELEGRAM_BOT_TOKEN`, `ADMIN_CHAT_ID` | Optional. Bot and lead notifications. Without them the bot is not started and the backend logs a warning instead of notifying |
| `DJANGO_ALLOWED_HOSTS`, `SITE_URL`, `USD_RATE` | Optional. Compose sets defaults |

Leave `DJANGO_DEBUG`, `POSTGRES_HOST`, `POSTGRES_PORT`, `FRONTEND_INTERNAL_URL`, `API_INTERNAL_URL` and
`BACKEND_URL` empty: compose sets them.

Then open:

- Site: http://127.0.0.1:3000 (ru), `/kk`, `/en`
- Admin: http://127.0.0.1:8000/admin/
- Health: http://127.0.0.1:8000/api/health

The database is only reachable inside the compose network:
`docker compose exec db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'`.

Migrations run on every backend start (`entrypoint.sh`). To run them by hand:
`docker compose exec backend python manage.py migrate`. `make dev` seeds only an empty catalog;
`make dev SEED=1` or `make seed` reloads the fixtures and overwrites admin edits to seeded items.

After the first `make dev`, a plain `docker compose up -d --wait` also works (db, backend, frontend; add
`--profile bot` for the bot). Stop with `make down`. Logs: `docker compose logs -f backend frontend`.

Common errors:

- "Cannot connect to the Docker daemon": start Docker Desktop.
- "X is empty in .env": fill that value.
- Port 3000 or 8000 already in use: stop the other process (`lsof -i :3000`).
- The first `make dev` takes a few minutes: the frontend runs `next build` at container start. Wait for healthy.
- `Revalidation failed for N tags: ConnectError` during the first seed: harmless, the frontend is not running yet
  and builds its pages from the seeded data right after.
- Frontend shows an empty catalog: the database was empty when it built. Run `make seed`, then
  `docker compose restart frontend`.
- Bot exits with 409 Conflict: the same token is polling elsewhere (e.g. production). Use a separate test
  bot token locally.
- Admin login loops over http in Safari: the backend runs with production settings (secure cookies). Use
  Chrome or Firefox on http://127.0.0.1:8000, which accept secure cookies on localhost.
- Changed `POSTGRES_PASSWORD` after the first start: the existing `pgdata` volume keeps the old one. Run
  `docker compose down -v` (deletes local data) and start again.

## Quick start

Requirements: Docker with the Compose plugin, GNU make, Python 3 (for generating secrets).

```
cp .env.example .env
```

Fill the empty values in `.env`. Generate the two random secrets with
`python3 -c "import secrets;print(secrets.token_urlsafe(50))"` (`DJANGO_SECRET_KEY`, `INTERNAL_API_TOKEN`).
`TELEGRAM_BOT_TOKEN` comes from BotFather, `ADMIN_CHAT_ID` is the owner's chat id. Never commit `.env`.

```
make init                                      # db + backend, seed, frontend, bot
docker compose exec backend python manage.py createsuperuser
```

Then open:

- http://127.0.0.1:3000/ (ru), `/kk`, `/en`
- http://127.0.0.1:8000/admin/ (backend admin, loopback only)
- http://127.0.0.1:8000/api/health (backend health)

Use `make init` on an empty database. The frontend builds its pages from the API, so seed data must exist
first. Later starts use `make up`.

## Makefile

| Target | What it does |
| --- | --- |
| `make dev` | Local one-command start (see Run locally); seeds an empty catalog |
| `make up` | Build and start db, backend, frontend, bot (bot only when its token is set); wait until healthy |
| `make down` | Stop the stack (volumes are kept) |
| `make init` | First start: db + backend, seed, then frontend and bot |
| `make seed` | Load catalog and city fixtures (idempotent) |
| `make test` | Bot tests (in a python:3.12 container), backend pytest, frontend vitest |
| `make lint` | Bot ruff + mypy, backend ruff + mypy, frontend eslint + tsc |
| `make bot-lint`, `make bot-test` | Bot checks only |
| `make e2e` | End-to-end run against the running stack (creates 2 real leads, see below) |

## Adding a product

1. Open the admin at `/admin/` and go to Products.
2. Create the product: slug (lowercase, digits, hyphens; it becomes the URL `/products/{slug}`),
   category, title, short text, description, for-whom, includes and not-included lists, price from (KZT),
   unit, days min and max, and the ru, kk and en text fields. Add FAQ entries inline.
3. Mark it active and save. The product, catalog and category pages update in ru, kk and en: the backend
   sends a revalidation webhook and the frontend rebuilds those pages.

`make seed` overwrites seeded products and cities with the fixture files, including admin edits to them.
Products created only in the admin are not in the fixtures and are not touched by seed.

Content sources: `backend/catalog/fixtures/` holds `categories.json`, one JSON file per product in
`products/` and one per city in `cities/`. Seed reads each directory in file-name order.

## Tests, lint, CI

- Backend: `cd backend && .venv/bin/pytest`; lint with `.venv/bin/ruff check . && .venv/bin/ruff format --check . && DJANGO_DEBUG=1 .venv/bin/mypy .`
- Frontend: `cd frontend && npm test && npm run lint && npm run typecheck`
- Bot: `make bot-test` and `make bot-lint` (run in a throwaway `python:3.12-slim` container).
- CI (`.github/workflows/ci.yml`) runs all of the above on push and pull request, builds the Next app
  against a SQLite backend with seed data, checks the 404 pages with `next start`, validates the OpenAPI
  schema, and builds the bot image. It deploys nothing.

## End-to-end check

`make e2e` runs against the running stack (`make up` first):

1. `scripts/e2e/site_lead.sh` posts a lead through the frontend route `/api/lead` and checks for `{"ok":true}`.
   It finds the stored lead (source `site`) in the database and waits for the log line
   `Telegram notification sent for lead N (message_id M)`.
2. `scripts/e2e/bot_lead.sh` runs `python -m app.e2e.bot_lead` in the bot container. The script drives the
   real dispatcher through a whole order as a fake private user, with Telegram calls recorded instead of sent.
   It checks the thank-you text and the lead (source `bot`) in the backend, then waits for the same
   admin-notification log line.

Each run creates exactly 2 real leads and 2 real admin notifications in the owner's chat. The last
recorded run is in `docs/e2e-results.md`.

## Deployment

See `docs/DEPLOY.md`: Ubuntu VPS, Docker Compose, Nginx (`deploy/nginx/uslugi.conf`), Let's Encrypt,
firewall, backups, updates and rotating the Telegram token. Production host: `uslugi.realkazbek.site`.

## Project structure

```
backend/        Django project: config/ (settings are the only env reader), core/, catalog/, cities/, leads/
frontend/       Next.js app: app/ (routes only), components/ (ui/, features/), lib/ (api client, i18n, seo), types/
bot/            aiogram bot: app/handlers, keyboards, services (backend client), texts, formatting, e2e/
scripts/e2e/    end-to-end scripts used by `make e2e`
deploy/nginx/   public vhost for the VPS
docs/           DEPLOY.md, e2e-results.md, history/ (v1/v2 decisions)
docker-compose.yml, Makefile, .env.example, .github/workflows/ci.yml
SPEC-v3.md      current specification; DECISIONS.md current contract and milestone log
```

## Honesty and legal notes

- No fake reviews, ratings, client counts, years in business or ranking guarantees. The portfolio section
  shows only real work, described honestly.
- Prices are "from" prices in KZT. EN pages show an approximate USD value (price divided by `USD_RATE`).
- Payment terms offered: a written agreement on scope and price, 50% prepayment and 50% after delivery,
  transfers by Kaspi. No invoices, VAT or legal-entity claims.
- Lead data is personal data. It is kept in the owner's database and shown only to the owner and the bot.
  Back up and delete it under the owner's own policy.
