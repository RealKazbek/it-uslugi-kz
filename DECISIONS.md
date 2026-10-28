# Decisions

## v3 (SPEC-v3.md) — CURRENT CONTRACT
SPEC-v3.md supersedes SPEC.md and SPEC-v2.md. Engineering rules: CLAUDE.md. v1/v2 history is in docs/history/DECISIONS-v1-v2.md; content rules from it (legal text, honesty, contacts, English tone, USD hints) still apply.

### Layout
```
backend/   Django 5.1 + DRF + drf-spectacular, Python 3.12, psycopg 3
  config/            settings.py (the ONLY place reading env), urls.py, wsgi.py
  core/              health endpoint, internal-token permission, frontend revalidation client
  catalog/           Category, Product, ProductFAQ; read API; seed command + fixtures
  cities/            City; read API
  leads/             Lead; public + internal API; Telegram notifier
frontend/  Next.js 15 App Router, React 19, TS strict, Tailwind 3
bot/       aiogram 3, httpx backend client, long polling
docs/DEPLOY.md, docker-compose.yml, Makefile, .env.example, .github/workflows/ci.yml
```

### Environment variables (.env, never committed; .env.example has empty values)
Secrets: TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DJANGO_SECRET_KEY, INTERNAL_API_TOKEN.
Non-secret, defaults set in docker-compose.yml: DJANGO_DEBUG (0), DJANGO_ALLOWED_HOSTS, POSTGRES_HOST (db), POSTGRES_PORT (5432), FRONTEND_INTERNAL_URL (http://frontend:3000), API_INTERNAL_URL (http://backend:8000), BACKEND_URL for bot (http://backend:8000), SITE_URL (https://uslugi.realkazbek.site), USD_RATE (500).
- INTERNAL_API_TOKEN is reused for the frontend revalidation webhook (header `X-Internal-Token`), so no extra secret is needed.
- If POSTGRES_HOST is empty, Django falls back to SQLite (local tests without Docker). CI and Docker use PostgreSQL 16.

### Data model (per-language columns, no i18n library)
- Category: slug (unique), name_ru/kk/en, short_ru/kk/en, intro_ru/kk/en, sort.
- Product: slug (unique), category FK, title_*, short_*, description_*, for_whom_*, includes_* (JSON list of str), not_included_* (JSON list of str), price_from_kzt (PositiveInteger), unit (once|month|lesson|hour), days_min, days_max, related (M2M self, symmetrical=False), is_active, sort, updated_at.
- ProductFAQ: product FK (related_name="faqs"), question_*, answer_*, sort.
- City: slug, name_ru, name_kk, loc_ru ("в Алматы"), gen_ru, loc_kk ("Алматыда"), attr_kk ("Алматыдағы"), region_ru/kk, context_ru/kk, sectors_ru/kk (JSON list), product_focus (M2M Product), nearby (M2M self, symmetrical=False), in_person (bool), sort. No EN city fields: city pages are ru+kk only.
- Lead: name, contact, channel (whatsapp|telegram|phone|email|other = how to reply), source (site|bot), product FK null (SET_NULL), message, page_url, lang (ru|kk|en), status (new|in_progress|won|lost), telegram_user_id (nullable BigInt, bot leads), created_at. Ordering -created_at.

### Seed
`backend/catalog/fixtures/{categories,products,cities}.json` were generated once from the old static generator (src/data/*) and are now the content source. `python manage.py seed` is idempotent (update_or_create by slug, then M2M). The old generator, scripts/, test/, review/, dist*, package.json and the GitHub Pages workflow are deleted after conversion.

### API (DRF, JSON, no trailing slash)
Read (AllowAny, cached by Next ISR): GET /api/categories, /api/products?category=&lang=, /api/products/{slug}, /api/cities, /api/cities/{slug}, /api/health. Products list/detail return all three languages when `lang` is absent; with `lang` they return flat localized fields (title, short, ...). Inactive products are 404/omitted.
Write: POST /api/leads — serializer validation (name 2..80, contact 3..100, message <= 2000, lang choice, product slug optional), honeypot field `website` (non-empty → 201 with no lead saved, logged), AnonRateThrottle scope "leads" 5/min + 30/day.
Internal (header `X-Internal-Token` == INTERNAL_API_TOKEN, constant-time compare): POST /api/internal/leads, GET /api/internal/leads?limit=10, PATCH /api/internal/leads/{id} {status}, GET /api/internal/stats (counts by status, all-time and last 7 days).
Docs: /api/schema, /api/docs (open when DEBUG; otherwise staff session only).
Proxy chain for client IPs: browser -> nginx (sets X-Forwarded-For via $proxy_add_x_forwarded_for) -> Next route handler /api/lead (forwards the incoming X-Forwarded-For unchanged; implemented in M3) -> backend. NUM_PROXIES=1 makes DRF key throttles on the last hop, which nginx appended, so client-supplied XFF entries cannot grow the bucket. Backend port is bound to 127.0.0.1 only.
Throttle counters use the database cache (DatabaseCache table "cache", created by createcachetable at start), so limits are shared across gunicorn workers. The public API does not parse Authorization headers (DEFAULT_AUTHENTICATION_CLASSES empty).

### Telegram notification (backend)
`leads.services.notifications` builds the text + inline keyboard (callback_data `lead:{id}:{status}`) and sends via Bot API sendMessage with httpx. Called from `transaction.on_commit`, executed in a daemon thread: 3 attempts, backoff 1s/2s/4s, timeout 5s, every failure logged with lead id; never raises into the request. If token/chat id are empty, it logs a warning and skips. The bot (long polling with the same token) receives the button callbacks and PATCHes the status through the internal API.

### Revalidation
Product/Category post_save → on_commit → POST {FRONTEND_INTERNAL_URL}/api/revalidate with X-Internal-Token and {"tags": ["products", "product:{slug}"]}; failures logged, never raised. Next uses fetch tags: categories, products, product:{slug}, cities.

### Frontend routing
Middleware rewrites un-prefixed paths to `/ru/...`; app/[lang]/ is the only root. ru `/`, kk `/kk`, en `/en`. Same path segments in all locales: `/catalog`, `/catalog/{category}`, `/products/{slug}`, `/city/{slug}` (ru, kk only; en → 404), `/prices`, `/portfolio`, `/contacts`. No trailing slash. Old v1/v2 static URLs are not redirected (static site was only live for hours). Pages use `revalidate = 3600` + tags. Because ISR pages need the API at build time, the frontend container runs `next build` on start after the backend is healthy; CI builds against a backend started with SQLite + seed.
- EN prices: "≈ $N" = price / USD_RATE, rounded to 5 USD (>= 50) or 1 USD.

### Bot
handlers/{start,catalog,order,admin}.py, keyboards/, services/backend.py (httpx client to internal + read API), i18n texts in texts/{ru,kk,en}.py, config.py reads env. Language per user kept in FSM storage (MemoryStorage). Admin handlers filtered by ADMIN_CHAT_ID.

### Milestone log
- M1 (2026-10-28) approved by reviewer: fixtures from old generator (0 diffs), generator removed, models/admin/seed/health, docker compose db+backend. Seed overwrites admin edits by design. M2M order is not stored; API orders related/nearby/product_focus by target `sort`. Prod settings: secure cookies, HSTS 3600, CSRF trusted origin SITE_URL; SSL redirect left to nginx.
- M2 review fixes: notifier and revalidation run in daemon threads, so a notification or webhook may be lost if the gunicorn worker is recycled before it is sent. Accepted for this site's volume.
- M2 (2026-10-29) implemented: read API, public + internal leads API, Telegram notifier, revalidation webhook, OpenAPI. Decisions beyond the contract: `?lang=` absent returns the full shape; an empty `?lang=` is treated as absent (DRF behaviour). Cities with lang: `gen` is ru-only and `attr` is kk-only (null otherwise); the city's market text key is `market_context`. Internal POST /api/internal/leads returns {"ok", "id"}. Internal list `limit` outside 1..50 gives 400. Notifier: 3 attempts with 1 s and 2 s sleeps between them (the 4 s step is unused). Empty FRONTEND_INTERNAL_URL disables the webhook. Seed fires one revalidation with all tags. Revalidation tags raised in one transaction are sent as one webhook after commit. httpx and httpcore log at WARNING because request URLs contain the bot token; failures log the exception type or HTTP status only.
- M2 approved by reviewer (2026-10-29, after fixes): public POST /api/leads returns only {"ok": true} (no id, same as honeypot); unknown/inactive product slug -> lead saved with product=None and "[product: slug]" appended to message. DatabaseCache for throttles; DRF auth classes disabled on public API; backend port bound to 127.0.0.1; revalidation webhooks coalesced per transaction; /api/schema and /api/docs staff-only outside DEBUG. Django pinned ~=5.1.0 (revalidate batch reads connection.run_on_commit; covered by test).
