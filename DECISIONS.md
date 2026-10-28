# Decisions

## v3 (SPEC-v3.md) — CURRENT CONTRACT
SPEC-v3.md supersedes SPEC.md and SPEC-v2.md. Engineering rules: CLAUDE.md. Sections "v2" and "v1" below are history; content rules from them (legal text, honesty, contacts, English tone, USD hints) still apply.

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
Docs: /api/schema, /api/docs.

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


## v2 (SPEC-v2.md) — historical
SPEC-v2.md supersedes SPEC.md where they conflict. Everything below "v1 (historical)" describes the old 2189-page site and is kept only as history; where it conflicts with this section, this section wins.

### Page model (target ~270 pages)
| Type | ru | kk | en |
|---|---|---|---|
| Home | `/` | `/kk/` | `/en/` |
| Catalog (grid + filter/search JS, plain list without JS) | `/catalog/` | `/kk/catalog/` | `/en/catalog/` |
| Category hub (8) | `/catalog/{category}/` | `/kk/catalog/{category}/` | `/en/catalog/{category}/` |
| Product (59) | `/products/{slug}/` | `/kk/products/{slug}/` | `/en/products/{slug}/` |
| City (25, ru+kk only, NO en) | `/goroda/{city}/` | `/kk/goroda/{city}/` | — |
| Prices | `/ceny/` | `/kk/bagalar/` | `/en/prices/` |
| Portfolio | `/portfolio/` | `/kk/portfolio/` | `/en/portfolio/` |
| Contacts | `/kontakty/` | `/kk/bailanys/` | `/en/contacts/` |
| 404 | `/404.html` (one trilingual noindex page; GitHub Pages serves only the root 404) | | |

Expected: 59×3 + 3 + 24 + 50 + 12 + 1 = 267 HTML pages. ~300 in the spec is approximate; "quality over quantity" wins, so no filler pages were added to reach exactly 300.
- REMOVED: all service×city, niche×city, service hubs, niche hubs, `/sait-dlya/`. The site went live on 2026-10-28 and those URLs were not indexed yet, so there are no redirects.
- hreflang: ru/kk/en + x-default(→ru) on every page that exists in more than one language; city pages have ru/kk + x-default only.
- `src/data/services.js` and `src/data/niches.js` are replaced by products and deleted; the best niches became website products.

### Data
- `src/data/categories.js`: `export const categories = [{ slug, name:{ru,kk,en}, short:{ru,kk,en}, intro:{ru,kk,en} }]`, order: websites, ecommerce, bots, ai, automation, seo-maps, support, education.
- `src/data/products.js` is the single entry point (`export const products = [...websites, ...ecommerce, ...]`). For maintainability the objects live in `src/data/products/{category}.js` (each `export default [ ... ]`). Adding a product = add one object to the right file; no template changes.
- Product schema:
```js
{
  slug: 'sait-dlya-stomatologii',          // latin, unique, used in all 3 languages
  category: 'websites',                    // one of the 8 category slugs
  title: { ru, kk, en },                   // H1-ready name: «Сайт для стоматологии»
  short: { ru, kk, en },                   // one sentence for cards (<= 140 chars)
  description: { ru, kk, en },             // 2-4 sentences, product-specific intro paragraph
  priceFrom: 60000,                        // KZT, "from" price
  unit: 'once' | 'month' | 'lesson' | 'hour',
  days: { min, max },                      // working days; for month/lesson/hour = start delay
  includes: { ru: [5-7], kk: [5-7], en: [5-7] },
  notIncluded: { ru: [2-3], kk: [2-3], en: [2-3] },   // honest limits
  forWhom: { ru, kk, en },                 // 1-2 sentences
  faq: [ { q: { ru, kk, en }, a: { ru, kk, en } } ],  // exactly 3, product-specific
  relatedProducts: ['slug', 'slug', 'slug'],          // 3 existing slugs, may be other categories
}
```
- `cities.js` keeps its fields; `nicheFocus` is replaced by `productFocus: [6 product slugs]` relevant to the city's economy.
- `config.js`: `telegram: 'RealKazbek'`, `whatsapp: '77066620060'`, `phone: '+77066620060'`, `phoneDisplay: '8 706 662 00 60'`, `email: '37765@iitu.edu.kz'`, `usdRate: 500` (KZT per USD, approximate, edit here), `legal: {ru,kk,en}` (one shared text, see below).

### Products (59; priceFrom KZT / unit / days)
websites (14): lending 45000/once/3-7 «Лендинг для бизнеса»; sait-vizitka 35000/once/3-6; korporativnyi-sait 120000/once/10-20; veb-prilozhenie 200000/once/20-40 (web app / client portal); sait-dlya-stomatologii 60000/once/5-10; sait-dlya-salona-krasoty 50000/once/5-10 (with online booking); sait-dlya-kafe 50000/once/5-10 (menu + order via WhatsApp); sait-dlya-avtoservisa 45000/once/4-8; sait-dlya-stroitelnoi-kompanii 70000/once/7-14; sait-dlya-uchebnogo-centra 55000/once/5-10; sait-dlya-agentstva-nedvizhimosti 80000/once/10-15; sait-dlya-fitnes-kluba 55000/once/5-10; sait-dlya-yurista 40000/once/3-7; sait-dlya-toi-zala 50000/once/4-8.
ecommerce (7): internet-magazin 180000/once/15-30; magazin-s-kaspi-xml 220000/once/20-35 (store + Kaspi XML price feed); kaspi-xml 25000/once/2-4 (feed for an existing store/catalog); katalog-s-zakazom-v-whatsapp 80000/once/7-12; telegram-mini-app-magazin 120000/once/14-25; internet-magazin-cvetov 150000/once/14-25; internet-magazin-odezhdy 170000/once/15-30.
bots (8): telegram-bot-zapis 35000/once/4-8 (appointment booking); telegram-bot-zayavki 30000/once/3-5; telegram-bot-katalog 50000/once/7-12; telegram-bot-dostavka 60000/once/10-15; telegram-bot-rassylka 30000/once/3-6; telegram-bot-faq 25000/once/2-5; telegram-bot-dlya-kursov 45000/once/7-12; whatsapp-bot 40000/once/5-10.
ai (5): ai-assistent-telegram 60000/once/7-14 (answers clients in Telegram, based on the real portfolio project); ai-assistent-whatsapp 80000/once/10-15; ai-chat-na-sait 50000/once/5-10; ai-baza-znanii-dlya-sotrudnikov 90000/once/10-20; ai-opisaniya-tovarov 30000/once/3-7.
automation (7): zayavki-v-google-sheets 25000/once/2-4; uvedomleniya-o-zayavkah 15000/once/1-3; crm-dlya-malogo-biznesa 90000/once/10-20; onlain-zapis-google-calendar 30000/once/3-6; otchety-v-telegram 30000/once/3-6; integraciya-api 40000/once/5-10; parsing-dannyh 20000/once/2-5.
seo-maps (6): kartochka-2gis-google-maps 10000/once/1-3; kartochka-yandex-karty 8000/once/1-2; seo-audit 20000/once/3-5; seo-prodvizhenie 40000/month/start 1-3; lokalnoe-seo 30000/month/start 1-3; uskorenie-saita 25000/once/3-6.
support (8): ispravlenie-oshibok 5000/once/1-2; podderzhka-saita 15000/month/start 1-2; redizain 60000/once/7-14; dorabotka-saita 15000/once/2-5; domen-hosting-ssl 10000/once/1-2; perenos-saita 15000/once/1-3; pochta-na-domene 8000/once/1-1; kompyuternaya-pomosch 3000/hour/start 1-1 (remote PC/software help for private people).
education (4): repetitor-programmirovaniya 4000/lesson/start 1-3 (school students); python-s-nulya 5000/lesson/start 1-3; veb-razrabotka-dlya-nachinayushih 5000/lesson/start 1-3; kompyuternaya-gramotnost 3000/lesson/start 1-3 (adults, older people).
Prices keep the v1 levels where a v1 service existed (all below the Almaty market average); new products are priced in the same range.

### Contacts and CTAs
- WhatsApp is the primary CTA everywhere: `https://wa.me/77066620060?text=<encoded>`; on product pages the text is «Здравствуйте! Интересует «{title}». {absolute page URL}» (kk/en equivalents). Telegram (`https://t.me/RealKazbek`) is secondary. Phone `tel:+77066620060`, shown as «8 706 662 00 60». Email 37765@iitu.edu.kz. The old gmail address must not appear anywhere.

### Legal status (honesty)
I work as a self-employed individual, with no IP (ИП / ЖК) and no TOO (ТОО / ЖШС). Texts (config.legal; the only place these words may appear):
- ru: «Работаю как самозанятое физическое лицо, без ИП и ТОО. Перед началом фиксируем объём работ и цену в письменном соглашении. Оплата: 50% предоплата и 50% после сдачи работы, переводом на Kaspi. Счёт-фактуры и НДС не выставляю.»
- kk: «Өзін-өзі жұмыспен қамтыған жеке тұлға ретінде жұмыс істеймін, ЖК немесе ЖШС ашылмаған. Жұмыс басталар алдында көлем мен бағаны жазбаша келісімде бекітеміз. Төлем: 50% алдын ала және 50% жұмыс тапсырылғаннан кейін, Kaspi аударымымен. Шот-фактура мен ҚҚС жоқ.»
- en: «I work as a self-employed individual, not as a registered company. Before we start, we fix the scope and price in a written agreement. Payment: 50% upfront and 50% after delivery, by Kaspi transfer (for clients outside Kazakhstan we agree on a transfer method in advance). I do not issue VAT invoices.»
Shown on contacts and prices pages, and as a FAQ item on the home page. check.js removes those exact strings and then fails on: ИП, ТОО, ЖК (as word), ЖШС, НДС, ҚҚС, счёт-фактур/счет-фактур, шот-фактур, invoice, VAT, «юрлиц», «официальный договор», «legal entity».

### English
Aimed at foreign clients hiring a Kazakhstan-based developer remotely. Natural English, not translated Russian. Prices show KZT and «≈ $N» = priceFrom / usdRate, rounded to nearest 5 USD (≥ 50) or 1 USD (< 50).

### Branding
- Inline SVG monogram «RK» (rounded square, accent fill, white letters) + wordmark «RK Dev» in the header; `/favicon.svg` from the same monogram, linked on every page. No external images.

### City pages
ru + kk only: intro from `context` + sectors; «Работаю удалённо по всему Казахстану, личная встреча возможна в Алматы» (Almaty: meeting in person); 6 recommended products from `productFocus` with a city-specific reason; full catalog grouped by category as compact links (title + price only, to limit shared text); city FAQ (3); links to the 3 nearby cities. No city×product pages.

### Portfolio screenshots
`src/assets/portfolio/{slug}.webp` is copied to `/assets/portfolio/` and rendered only if the file exists. None exist yet.

### v2 implementation log
- 2026-10-28: Code refactored to v2. Removed services/niches data, service-city/niche-city/hubs pages, names/refs/niche helpers. New modules: `lib/brand.js` (monogram, favicon), `pages/{product,catalog,city,static,common}.js`, `content/{ru,kk,en}.js` + `*-process.js`.
- Process steps are chosen by key `${category}-${unit}` then `category` (e.g. `support-month`, `support-hour`, `seo-maps-month`, `education-lesson`), so pages differ by category and unit.
- Catalog filter and search controls are injected by `/assets/catalog.js`; without JS the page is a plain card list. Catalog hubs are generated only for categories that have products.
- City pages: category order and product order in the catalog block are shuffled per city (deterministic hash) and the 6 `productFocus` products show their full descriptions; without both, the shared catalog text pushed city pages above Jaccard 0.70.
- English home lists no cities (city pages are ru/kk only) and carries a note instead.
- `check.js` additionally enforces: title <= 70, description <= 200, URL allowlist of the v2 page model, favicon link, `wa.me/77066620060` on every page except the 404, legal-word scan after stripping `config.legal`, old gmail absent from all text files.
- The 404 is `lang="ru"` with ru/kk/en blocks and the language switcher pointing at the three home pages.

## v1 (historical)

Source of truth: SPEC.md. This file logs choices made autonomously, plus the shared contract all code follows.

## Architecture
- Node 20+, ESM, zero runtime deps. `npm run build` -> `node src/build.js` -> `dist/`.
- Layout:
  - `src/data/config.js` — contacts, site URL, brand, person facts (only SPEC facts).
  - `src/data/services.js`, `src/data/cities.js`, `src/data/niches.js` — content data (schemas below).
  - `src/lib/` — helpers (hash, html escape, price format, urls, jsonld, layout).
  - `src/content/ru.js`, `src/content/kk.js` — sentence-template variants (picked deterministically by hash of page slug).
  - `src/pages/` — one module per page type.
  - `src/styles.css` — the only CSS file, copied to `dist/assets/styles.css`.
  - `scripts/check.js` — `npm run check`: page count, broken internal links, unique title/description, near-duplicate check, canonical/hreflang/JSON-LD parse, sitemap/robots/CNAME presence.
- URLs: trailing slash, each page is `dir/index.html`. Root: `https://uslugi.realkazbek.site`.
  - ru: `/`, `/{service}/`, `/{service}/{city}/`, `/goroda/{city}/`, `/sait-dlya/`, `/sait-dlya/{niche}/`, `/sait-dlya/{niche}/{city}/`, `/ceny/`, `/portfolio/`, `/kontakty/`.
  - kk: `/kk/`, `/kk/{service}/`, `/kk/{service}/{city}/`, `/kk/goroda/{city}/`.
  - `/404.html` (GitHub Pages convention).
- Niche pages are Russian only (per SPEC); kk pages may link to them. hreflang pairs only where both languages exist (+ x-default -> ru).
- Near-duplicate check: body text = text content of `<main>`, lowercased, word 5-shingles, Jaccard. Threshold: fail >0.70; internal target <0.60. MinHash prefilter then exact Jaccard on candidates.

## Data schemas
```js
// services.js
export const services = [{
  slug: 'lending',                 // latin translit
  name: { ru: 'Лендинг', kk: 'Лендинг' },
  short: { ru: '...', kk: '...' }, // one-sentence description
  priceFrom: 45000,                // KZT, editable starting price
  unit: 'once' | 'month' | 'lesson' | 'hour',
  days: { min: 3, max: 7 },        // typical timeline in working days (0 for per-month/lesson units allowed)
  included: { ru: [5-7], kk: [5-7] },
  audience: { ru: '...', kk: '...' },
  faq: [{ q: { ru, kk }, a: { ru, kk } }],   // 3-4
  related: ['slug', ...],          // 3-4 related service slugs
  niches: ['niche-slug', ...],     // niches where this service fits
}];
// cities.js
export const cities = [{
  slug: 'almaty',
  ru: { name: 'Алматы', loc: 'в Алматы', gen: 'Алматы' },
  kk: { name: 'Алматы', loc: 'Алматыда', attr: 'Алматыдағы' },
  region: { ru, kk },
  context: { ru, kk },             // 1-2 true, general sentences about local business
  sectors: { ru: [3-4], kk: [3-4] },// main local economy sectors (general, true)
  nicheFocus: ['niche-slug', ...6],// niches most relevant to the city
  nearby: ['slug','slug','slug'],
  inPerson: true,                  // only Almaty
}];
// niches.js
export const niches = [{
  slug: 'stomatologiya',
  name: { ru: 'Стоматология', kk: 'Стоматология' },
  forRu: 'стоматологии',           // "Сайт для стоматологии"
  features: [5 ru strings],        // pages/features such a site needs
  services: ['slug', ...],         // fitting services
  question: 'typical client question (ru)',
  answer: 'short answer how the site handles it (ru)',
}];
```

## Kazakh city forms (fixed, grammatical)
loc: Алматыда, Астанада, Шымкентте, Қарағандыда, Ақтөбеде, Таразда, Павлодарда, Өскеменде, Семейде, Атырауда, Қостанайда, Қызылордада, Оралда, Петропавлда, Ақтауда, Талдықорғанда, Түркістанда, Көкшетауда, Теміртауда, Екібастұзда, Жезқазғанда, Қонаевта, Балқашта, Рудныйда, Жаркентте.
attr: same + ғы/гі: Алматыдағы, Шымкенттегі, Жаркенттегі, etc.

## Design (frontend-design pass)
- Audience: small-business owners in Kazakhstan comparing price and terms on mobile. Primary job: show the price and timeline clearly, then make writing in Telegram one tap away.
- Signature element: the "смета" (estimate) card, styled like a receipt — included items with dotted leaders to the right, a total line "от 45 000 ₸", timeline under it. Everything else stays plain.
- Color tokens: `--ink #14213D` (deep navy text), `--paper #FFFFFF`, `--mist #EEF2F6` (section tint), `--line #C9D3DE`, `--tg #1F8FD1` (Telegram action blue, CTAs only), `--ok #2E7D5B` (small positive marks). Dark mode: ink/paper swapped to `#E8EDF3` on `#0F1A2E`.
- Type: system-ui stack only. Headings 800 weight, tight letter-spacing (-0.02em), scale 1.25 (17px base, h1 clamp 1.9-2.6rem). Prices use `font-variant-numeric: tabular-nums`. Body line length max ~70ch, left aligned.
- Avoided defaults: no ALL-CAPS eyebrows, no "→" on buttons, no identical shadow-card grids, no gradients. Process steps ARE numbered (they are a real sequence). Lists of links are plain columns.
- Mobile-first, sticky bottom CTA bar on mobile ("Написать в Telegram" + WhatsApp if set), no JS needed. Visible focus, reduced-motion respected, no animations.

## Content / honesty
- Only facts from SPEC "ABOUT ME". No reviews, ratings, counts, years of experience, top-1 guarantees, no aggregateRating.
- Prices are "от" (starting) and below Almaty market averages; marked editable in `services.js`.
- Almaty: in-person meeting possible. Other cities: remote work across Kazakhstan (calls, Telegram, screen share).
- City facts kept general (main industries, role of the city) to stay true.

## Log
- 2026-10-28: Niche hub `/sait-dlya/` added (index of all niches) so niche hubs aren't orphaned.
- 2026-10-28: City hubs live under `/goroda/{city}/` to avoid slug collisions with service slugs.
- 2026-10-28 (M1 review fixes):
  - Niche price/timeline/audience come from one helper, `src/lib/niche.js` `nicheSite()`: only services with `site: true`; fallback `sait-vizitka`, then cheapest fitting (only matters for test fixtures).
  - Days: a minimum below 1 is shown as 1 (never "0–1"). One-off services show a term ("срок: 3–7 рабочих дней"); month/lesson/hour units show only a start ("старт в течение 1 рабочего дня" / "бастау: 1 жұмыс күні ішінде"). Genitive/nominative plural handled in `lib/text.js`.
  - Russian service names are never left in the nominative after a preposition: templates use `x.r.{nom,gen,dat,acc}` from `lib/refs.js` ("услуга «…»", "услуге «…»"); niche pages get the same forms for "сайт для …".
  - Kazakh: before a noun we use `city.kk.attr` + lowercase service name (`lcName`: keeps capitals for Latin-start brands, digits and Cyrillic acronyms such as ЖИ-); `loc` only for standalone "in the city". No kk genitive is built in code; "Орал экономикасы" forms were avoided by rephrasing ("Оралда мына салалар байқалады").
  - Consumer services (`consumer: true`) use separate intro/local/process/FAQ wording. The two services have different real processes, so `consumerProcess` branches on the slug in the content files. Their local block links to other services in the city (not niches), picked by page-hash and excluding `related`, so internal linking stays.
  - To keep consumer pages below the 0.60 similarity target, the consumer local block and one FAQ answer include the city sector list.
  - Niche pages use their own city FAQ (`nicheCityFaq`), because the business-sector question did not make sense for niches.
  - Audience is rendered once as "Кому подходит: …" / "Кімге арналған: …" after the estimate card; it is no longer inside FAQ answers. Niche pages show the audience of the site service used for the price.
  - Language switcher shows the target language label (`T[lang].ui.langName` holds the other language's name).
  - kk nav labels pointing to ru-only pages carry "(орысша)" instead of building kk copies of /ceny/, /portfolio/, /kontakty/.
  - og:image skipped: a valid PNG cannot be produced without dependencies and many crawlers ignore SVG. Kept `twitter:card summary`. Add `/assets/og.png` later if an image is produced.
  - 404 has no canonical (noindex). Sitemap gets `<lastmod>` = build date. ProfessionalService no longer has `inLanguage`; kk pages use the kk city name for areaServed. Offer keeps a plain `price` (Google requires it); `priceSpecification` skipped.
  - `--tg` is now #1670A8 (white on it is about 5.4:1; dark mode #4db3ee with #0F1A2E ink is about 7.4:1). The mobile CTA bar is `display:none` at 760px and up, so there is no empty landmark; body bottom padding is 96px.
  - `ctaHub` template variants replace the regex clean-up of city-less CTA text in hubs.
  - check.js: attribute-order-independent `<link>`/`<meta>` parsing; hreflang x-default and self-reference; kk pages must have alternates; `<html lang>`, duplicate ids, one h1 (scripts stripped), OG and twitter tags, no `wa.me` while whatsapp is empty, noindex pages have no canonical, sitemap lastmod. `npm test` builds and checks `test/fixtures` (which carry `site` and `consumer` flags and `days: {min:0,max:1}`).
- 2026-10-28 (M2 review fixes):
  - /ceny/ table: `overflow-wrap:anywhere` removed from `.prices` cells (words stay whole, the table scrolls inside `.table-wrap`). Below 420px the "Формат" column is hidden and its text is shown as a small line inside the price cell.
  - `npm test` builds fixtures into `dist-test/` (`OUT_DIR` env, supported by build.js and check.js; git-ignored), so it never overwrites `dist/`.
  - Kazakh service names that open a sentence or heading inside «…» are capitalised with `cap()`.
  - Niche hub lead: "Каким должен быть сайт для …"; `person.role.ru` is lowercase because it is only used after a dash.
  - Consumer pages (tutoring, PC help): no project wording in the remote FAQ and price blocks; the city sector list is no longer used there. Variety now comes from the region, the nearby cities (`x.nearbyList`) and the unified UTC+5 note. The local block links only to services suited to private people (`CONSUMER_SUGGEST` in service-city.js).
  - Business intro purpose clause is service-specific (`src/content/names.js`, `purpose`), so CRM or parsing no longer "help clients find the business".
  - Russian niche links on Kazakh pages carry `lang="ru"`; `linkCols` accepts an item `lang`.
  - Titles are fitted to 70 characters (full name + brand, then a short name from `names.js`, then no brand); hub descriptions to 200 (`src/lib/fit.js`).
  - The sticky bar is an `<aside>` instead of `div role="complementary"`.
  - Skipped MINOR 10 (sitemap `<lastmod>` = build date): lastmod stays the build date. The site is regenerated from data on each deploy and there is no per-page content history to derive an honest date from; the sitemap is small enough that this is harmless. Revisit if a content-hash date becomes useful.
  - Skipped MINOR 13 (og:image): still no valid PNG without extra dependencies; add `/assets/og.png` (1200x630) when one exists.
- 2026-10-28 (M3 and M4 review fixes):
  - M3: service hub leads fixed on all 42 hubs; price table on mobile, Kazakh capitalization, consumer wording and shorter titles applied (see M3/M4 reviews).
  - M4 MINORs: lowercase `услуга «…»` after the colon in the two remaining intro variants; Kazakh intro uses `x.name тұрғындарымен`; process step 1 no longer repeats "Telegram" next to `x.meet` (ru and kk); the remote FAQ says "Сеанс"/"Сеанс" for `kompyuternaya-pomosch` and "Занятие"/"Сабақ" for tutoring instead of "Занятие или сеанс".

## Fixed slugs (all coders use these)
Services (21; priceFrom KZT / unit):
lending 45000/once, sait-vizitka 35000/once, korporativnyi-sait 120000/once, internet-magazin 180000/once, telegram-bot 30000/once, ai-assistent 60000/once, whatsapp-bot 40000/once, crm 90000/once, veb-prilozhenie 200000/once, telegram-mini-app 120000/once, seo 40000/month, ispravlenie-oshibok 5000/once, redizain 60000/once, podderzhka-saita 15000/month, domen-hosting-ssl 10000/once, avtomatizaciya 25000/once, parsing 20000/once, kartochka-na-kartah 10000/once, kaspi-xml 25000/once, repetitor-programmirovaniya 4000/lesson, kompyuternaya-pomosch 3000/hour.

Cities (25): almaty, astana, shymkent, karaganda, aktobe, taraz, pavlodar, ust-kamenogorsk, semey, atyrau, kostanay, kyzylorda, uralsk, petropavlovsk, aktau, taldykorgan, turkestan, kokshetau, temirtau, ekibastuz, zhezkazgan, konaev, balkhash, rudny, zharkent.

Niches (40): stomatologiya, salon-krasoty, barbershop, kafe-restoran, dostavka-edy, avtoservis, avtomoika, stroitelstvo, remont-kvartir, agentstvo-nedvizhimosti, fitnes, shkola-tancev, uchebnyi-centr, detskii-sad, yazykovaya-shkola, yurist, buhgalter, medcentr, veterinarnaya-klinika, cvetochnyi-magazin, magazin-odezhdy, proizvodstvo-mebeli, torty-na-zakaz, fotograf, toi-zal, turagentstvo, gostinica, klining, gruzoperevozki, transfer-taksi, proizvodstvo, optovaya-torgovlya, stroimaterialy, remont-tehniki, psiholog, massazh, nail-studiya, event-agentstvo, yuvelirnyi-magazin, avtoshkola.
- 2026-10-28 (V2-M1 review decisions):
  - English pages show the phone as «+7 706 662 00 60» (`phoneDisplayIntl`), because foreign clients can't dial the «8 …» form. ru/kk keep «8 706 662 00 60»; the tel: link is +77066620060 everywhere. This deviates from the literal SPEC-v2 display format on purpose.
  - Unconfirmed personal claims removed: «lessons in English» and «home visits in Almaty» for PC help. Lessons and PC help are remote; the only in-person promise is the SPEC one: a meeting is possible in Almaty.
  - City pages: the per-city shuffle of the catalog is removed (it was gaming the duplicate check). Uniqueness now comes from the `focusWhy` sentences (one per city and focus product), distinct `productFocus` sets (≤3 of 6 shared) and a city FAQ that uses them.
  - html-validate@8.18.2 is a pinned devDependency and runs in `npm run check` and in CI.
  - US English spelling throughout (en_US).
