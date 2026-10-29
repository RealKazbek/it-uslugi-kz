# Report: SPEC v3 full-stack rewrite

RK Dev (uslugi.realkazbek.site) rebuilt from a static generator into a full-stack app: Django REST backend + PostgreSQL 16, Next.js 15 frontend (ru/kk/en, ISR), aiogram 3 Telegram bot, Docker Compose. Products, categories and cities live in the database; adding or editing a product in Django admin revalidates its ru/kk/en pages on demand. Old static-site report: [docs/history/REPORT-v1.md](docs/history/REPORT-v1.md).

## Result

| Area | State |
|---|---|
| Milestones | M1–M5 implemented by the coder agent, each approved by the reviewer agent after fix rounds (table below) |
| `docker compose up` | db, backend, frontend, bot all healthy |
| Seed | 8 categories, 59 products (177 FAQs), 25 cities; ru/kk/en (cities ru/kk) |
| Pages | 266 sitemap URLs: 72 pages × 3 languages + 25 cities × 2 |
| Lint / types / tests | `make lint` clean (ruff, mypy strict, eslint, tsc); `make test`: backend 148, bot 160, frontend 115 passed |
| CI (GitHub Actions) | backend, frontend (incl. `next build` + 404 check), bot (incl. image build): green on `main` |
| Lighthouse (mobile) | 100 / 100 / 100 / 100 on home, product and city pages |
| End-to-end leads | Site lead #14 → Telegram message 15; bot lead #15 → Telegram message 16 (see [docs/e2e-results.md](docs/e2e-results.md)) |
| File size | No source/doc file over 300 lines (fixtures split per product and per city) |
| Secrets | `git grep` for Telegram token patterns: no matches in tree or history; `.env.example` values empty |

## Architecture

- **backend/**: apps `core` (health, internal-token permission, Telegram client, revalidation webhook), `catalog` (Category, Product, ProductFAQ, seed, `/api/slugs`), `cities` (City with hand-written per-product reasons), `leads` (Lead, public and internal API, notifier). Views are thin; logic is in `services/`, reads in `selectors/`. drf-spectacular schema (staff-only outside DEBUG).
- **frontend/**: one root `app/[lang]`; middleware rewrites un-prefixed paths to ru and serves real 404s itself. Typed API client in `lib/api` with fetch tags; SEO builders in `lib/seo` (canonical, hreflang, OG, JSON-LD Service/Offer KZT, FAQPage, BreadcrumbList, ProfessionalService); dynamic sitemap and robots. Only the catalog filter, lead form and language switcher are client components.
- **bot/**: handlers per feature, keyboards, typed backend client, ru/kk/en texts; admin commands `/leads` and `/stats` and status buttons limited to ADMIN_CHAT_ID; order flow → `POST /api/internal/leads`.
- **Infra**: `docker-compose.yml`, `Makefile` (`init`, `up`, `down`, `seed`, `lint`, `test`, `e2e`), `.github/workflows/ci.yml`, [docs/DEPLOY.md](docs/DEPLOY.md) + `deploy/nginx/uslugi.conf`.

## Security and reliability decisions (from reviews)

- Lead endpoint: serializer validation, honeypot (indistinguishable response), DB-backed throttle 5/min + 30/day shared by all gunicorn workers, client IP from the last X-Forwarded-For hop (nginx → Next → backend), DRF auth classes disabled on the public API.
- Internal API and revalidation: `X-Internal-Token` compared in constant time; nginx denies `/api/internal`, `/api/revalidate`, `/api/docs` publicly; backend port bound to 127.0.0.1.
- The bot token never reaches logs: httpx/httpcore log at WARNING, errors log only status + Telegram description, the bot uses a redacting log formatter.
- Telegram notifications and revalidation webhooks run after commit in a background thread with retries; failures are logged and never break the request.
- Revalidation webhooks are coalesced per transaction; the frontend's missing-page check uses a 2 KB slug index with a shared load, TTL and backoff.

## Review rounds

| Milestone | Rounds | Main findings fixed |
|---|---|---|
| M1 infra, models, admin, seed | 2 | committed sed backup files, untested error paths, proxy/HTTPS settings, password validators |
| M2 API, leads, notifications | 2 | per-worker throttle, Basic auth as password oracle, XFF spoofing, webhook per save, honeypot distinguishable |
| M3 frontend + SEO | 5 | stale prices after edits, near-duplicate city pages (0.74 → 0.58), 404 not server-rendered, slug-check request amplification, function size limits |
| M4 bot | 2 | error handler failing on callbacks, double status press, healthcheck not reflecting polling, commands taken as input |
| M5 end-to-end, docs | see DECISIONS.md | |

## Known limitations and owner actions

- **Rotate the Telegram bot token** in BotFather and update `.env`: during M2 the token appeared once in the local backend container log and in a local agent tool output (never in git).
- `DJANGO_SECRET_KEY` in the local `.env` was flagged as weak by `check --deploy`; generate a new one for production.
- Kazakh copy (UI strings and city reasons) was written by agents and needs a native-speaker pass; reasons are editable in admin.
- A deleted product shows Next's blank 404 (status 404) for up to 60 s; during a backend outage, unknown slugs may return 500.
- Deploy is documented but not performed: DNS A record, `make init` on the VPS, nginx + certbot (see docs/DEPLOY.md).
- Test leads #7–#15 exist in the local development database volume only.
