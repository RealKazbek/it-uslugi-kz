SPEC v2 — supersedes SPEC.md where they conflict. Keep the existing generator, checks and deploy; refactor, don't rewrite from scratch.

GOAL: fewer, stronger pages in a product-catalog model, 3 languages (ru default at /, kk at /kk/, en at /en/). Target ~300 pages. Quality over quantity.

CONTACTS (config + all pages): Telegram @RealKazbek (t.me/RealKazbek); phone display "8 706 662 00 60", tel:+77066620060; WhatsApp wa.me/77066620060; email 37765@iitu.edu.kz (replace the gmail everywhere). WhatsApp = primary CTA, Telegram secondary.

LEGAL STATUS: I am a self-employed individual, NO IP/TOO. Never claim invoices, VAT, "official contract with a company" or legal entity. Allowed: written agreement on scope and price, 50% prepayment / 50% after delivery, payment by Kaspi transfer. State this honestly on contacts/prices pages and in FAQ.

BRANDING: brand "RK Dev". Generate a simple logo: text wordmark + small inline SVG monogram "RK" in the site's accent color; SVG favicon from the same monogram. No external images.

PRODUCT MODEL: src/data/products.js — single source of truth, ~50 products. A product = a concrete sellable package, e.g. "Landing page for a dental clinic", "Telegram bot for appointment booking", "Online store with Kaspi XML price feed", "AI assistant answering clients in Telegram", "Google Sheets lead automation", "2GIS + Google Maps business card setup", "Programming lessons for school students". Turn the best niches from niches.js into products (e.g. "Website for a beauty salon"). Fields: slug, category, title/short/description in ru+kk+en, priceFrom KZT (below Almaty market average; base on current service prices), unit, days, includes[] (5-7), notIncluded[] (2-3, honest), forWhom, faq[] (3), relatedProducts[]. Adding a product must need only one new object — no template changes.
CATEGORIES (8): websites, bots, ai, ecommerce, automation, seo-maps, support, education. Hub page per category per language.

PAGES:
- /products/{slug}/ in ru, kk, en (~150): H1, price, timeline, includes / not included, process (4 steps), FAQ, related products, WhatsApp CTA prefilled with product name + page URL.
- /catalog/ in 3 languages: product cards grid, category filter + text search (small vanilla JS; without JS it is a plain list).
- Category hubs in 3 languages.
- City pages: ALL 25 cities from cities.js, ONE page per city in ru + kk (50 pages), no en. Each: city-specific intro from cities.js context, "I work remotely across Kazakhstan, meeting in person possible in Almaty", the full catalog grouped by category, city FAQ, links to nearby cities. Do NOT generate city × product pages.
- Home, prices table, portfolio, contacts, 404 in 3 languages.
- REMOVE all niche×city and service×city pages.
- hreflang ru/kk/en + x-default on every page that exists in several languages.

ENGLISH: natural, aimed at foreign clients hiring a Kazakhstan-based developer remotely; show approx USD next to KZT (rate in config, rounded).

PORTFOLIO: same honest facts as now, text cards. Support optional screenshots in src/assets/portfolio/{slug}.webp (render only if the file exists). No screenshots yet.

KEEP: honesty rules (no fake reviews/ratings/counts), unique titles/descriptions, duplicate check (<0.70), link check, html-validate, JSON-LD (Service + Offer KZT, FAQPage, BreadcrumbList, ProfessionalService), sitemap with hreflang, CNAME, Pages deploy.

DONE WHEN: build + all checks pass, reviewer subagent approves (Kazakh and English quality included), REPORT.md updated with page counts per language and type, pushed to main.
