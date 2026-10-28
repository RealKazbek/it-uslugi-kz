# SPEC v3 — full-stack rewrite (supersedes SPEC.md and SPEC-v2.md)

GOAL: Freelance IT services site "RK Dev" as a real full-stack app: Next.js frontend + Django REST backend + PostgreSQL + aiogram Telegram bot. Product-catalog model (like Kaspi): one template, products live in the DB, adding a product in Django admin creates its pages in ru/kk/en automatically. Follow CLAUDE.md for all code.

REUSE: product/city/category content from the current static generator (src/data/*, partial SPEC-v2 work) -> convert to JSON fixtures + `manage.py seed`. After migration, delete the old generator and the GitHub Pages deploy workflow.

CONTACTS: Telegram @RealKazbek (t.me/RealKazbek); phone "8 706 662 00 60", tel:+77066620060; WhatsApp wa.me/77066620060 (primary CTA); email 37765@iitu.edu.kz.
LEGAL: self-employed individual, NO IP/TOO. Never claim invoices, VAT or a legal entity. Allowed: written agreement on scope/price, 50% prepay / 50% after delivery, Kaspi transfer.
BRANDING: text wordmark "RK Dev" + inline SVG "RK" monogram, SVG favicon.
HONESTY: no fake reviews, ratings, client counts, years, guarantees of rankings.

## backend/ (Django 5 + DRF + PostgreSQL 16)
- Models: Category; Product (slug, category, title/short/description/includes/not_included/for_whom per language ru/kk/en, price_from_kzt, unit, days, is_active, sort); ProductFAQ (per language); City (slug, names ru/kk, locative forms, region, context ru/kk, nearby M2M); Lead (name, contact, channel, product FK null, message, page_url, lang, status new/in_progress/won/lost, created_at).
- Django admin = owner panel: filters, search, list_editable status, inline FAQ.
- API (read): /api/categories, /api/products?category=&lang=, /api/products/{slug}, /api/cities, /api/cities/{slug}. (write): POST /api/leads — validation, throttling, honeypot field. Internal: POST /api/internal/leads (bot -> backend, auth by INTERNAL_API_TOKEN header).
- On lead created (transaction.on_commit): send Telegram message to ADMIN_CHAT_ID via Bot API with inline buttons for status; failures logged + retried, never break the request.
- On product save: call frontend on-demand revalidation webhook.
- drf-spectacular OpenAPI. pytest-django tests for models, services, every endpoint.

## frontend/ (Next.js App Router, TypeScript strict, Tailwind; use frontend-design skill)
- Locales: ru at /, kk at /kk/, en at /en/. Pages from API with ISR (revalidate 3600 + on-demand).
- Pages: home, /catalog (cards, category filter, search), category hubs, /products/{slug} (price, days, includes / not included, 4-step process, FAQ, related, lead form + WhatsApp/Telegram CTA prefilled with product name and URL), /city/{slug} ru+kk for all 25 cities (city context, "remote across Kazakhstan, in-person in Almaty", catalog by category, city FAQ, nearby cities), prices table, portfolio (honest text cards; optional screenshots public/portfolio/{slug}.webp), contacts, 404. EN shows approx USD next to KZT (rate in env).
- SEO: unique title/description, canonical, hreflang ru/kk/en + x-default, JSON-LD (Service+Offer KZT, FAQPage, BreadcrumbList, ProfessionalService), dynamic sitemap.xml + robots.txt, OG tags. Lighthouse mobile >= 90.

## bot/ (aiogram 3)
- Admin (only ADMIN_CHAT_ID): receives lead notifications; inline buttons change lead status via backend internal API; /leads (last 10), /stats (counts by status, last 7 days).
- Clients: /start in ru/kk/en (pick language), browse categories -> products (price, link to site), "Order" -> collect name + contact + message -> POST /api/internal/leads.
- Long polling; graceful errors; handler tests with mocked backend client.

## infra
- docker-compose.yml: db, backend, frontend, bot (healthchecks, named volume). Makefile: up, down, seed, test, lint. .env.example with empty values.
- GitHub Actions CI: ruff, mypy, pytest, eslint, tsc, vitest, next build. No deploy yet.
- docs/DEPLOY.md: VPS deploy (Docker + Nginx + Let's Encrypt) for uslugi.realkazbek.site.

## Milestones (reviewer after each, fix until clean, commit + push)
M1 infra + backend models + admin + seed. M2 API + leads + Telegram notification. M3 frontend all pages + SEO. M4 bot. M5 end-to-end check: `docker compose up`, seed, open pages, submit lead from site and from bot, admin receives both. Update README.md, DECISIONS.md, REPORT.md.
