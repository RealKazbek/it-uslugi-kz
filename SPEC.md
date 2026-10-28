GOAL: Build a static SEO site for my freelance IT services in Kazakhstan, 2000+ unique pages, deployed to GitHub Pages at https://uslugi.realkazbek.site. Purpose: get inbound orders from Google/Yandex search.

WORKFLOW (token economy):
- You (main session) plan and delegate only. Do not write large code yourself.
- All implementation -> subagent "coder" (cheap model). After each milestone -> subagent "reviewer" (strong model). Fix what reviewer finds via coder, re-review until clean.
- Use the frontend-design plugin/skill for the visual design.
- Work autonomously, I am away. Do not ask questions; take the most reasonable choice and log it in DECISIONS.md. Commit and push after each milestone.

STACK: Node 20+, zero or minimal deps, plain ESM build script (src/build.js) that generates static HTML into dist/. One shared CSS file, no JS framework. Mobile-first, fast (target Lighthouse 95+). System fonts.

ABOUT ME (use only these facts, never invent more):
- Kazbek Assanbek (Қазбек Асанбек), freelance full-stack developer, Almaty, 3rd-year Computer Engineering student at IITU.
- Stack: React, Next.js, TypeScript, Django, DRF, PostgreSQL, Tailwind, Python, aiogram, Docker, Nginx, GitHub Actions, Linux.
- Contacts in src/data/config.js: Telegram @RealKazbek, email 37765@iitu.edu.kz, whatsapp="" and phone="" (hide buttons when empty; I will fill later). Portfolio https://realkazbek.site, GitHub https://github.com/RealKazbek.
- Portfolio items: (1) TerraCon — Next.js+Tailwind site for a sports-surfaces construction company, catalog with filters, cart; terracon.kz + Telegram bot t.me/terracon_manager_bot. (2) Telegram Business AI assistant — Python/aiogram + DeepSeek, knowledge-base answers, dialog memory, admin panel, auto-pauses 60 min when owner replies; demo t.me/RealKazbekBot. (3) Car — frontend demo realkazbek.github.io/Car/.
- Brand name: "RK Dev". Languages: Russian (main) + Kazakh.

HARD RULES (honesty + Google spam policy):
- No fake reviews, ratings, client counts, years of experience, "100+ projects", guarantees of top-1. No aggregateRating in schema.
- Every page must be genuinely useful and differ in substance, not just by swapped city name. Reviewer must run a near-duplicate check (e.g. shingle/Jaccard on body text) and fail any page pair >70% similar.
- Unique <title> and meta description on every page (script check).

DATA (src/data/*.js):
1. services (~21): landing, business card site, corporate site, online store, Telegram bot, AI assistant for Telegram/WhatsApp, WhatsApp bot, CRM/lead tracking, web app/personal cabinet, Telegram Mini App, SEO, site fixes/bugs, redesign, monthly site support, domain+hosting+SSL setup, automation/integrations (Google Sheets, APIs), data parsing, 2GIS/Google/Yandex Maps business card setup, Kaspi Shop XML price feed, programming tutoring for school students, remote PC/software help. Each: slug, ru+kk name, priceFrom in KZT (set BELOW average Almaty market, e.g. landing from 45 000 ₸, business card 35 000, Telegram bot 30 000, store 180 000; mark all as editable starting prices), unit (one-time or per month), days, what's included (5-7 items ru+kk), who it's for, 3-4 FAQ ru+kk.
2. cities (25, with Russian locative, Kazakh name + locative, region, 1-2 sentence local business context, 3 nearby cities): Almaty, Astana, Shymkent, Karaganda, Aktobe, Taraz, Pavlodar, Ust-Kamenogorsk, Semey, Atyrau, Kostanay, Kyzylorda, Uralsk, Petropavlovsk, Aktau, Taldykorgan, Turkestan, Kokshetau, Temirtau, Ekibastuz, Zhezkazgan, Konaev, Balkhash, Rudny, Zharkent. Facts must be general and true (e.g. Atyrau oil&gas, Aktau port, Turkestan tourism). Almaty = in-person meeting possible; others = remote across Kazakhstan.
3. niches (40 business types: dentistry, beauty salon, barbershop, cafe/restaurant, food delivery, car service, car wash, construction, apartment renovation, real estate agency, fitness, dance school, training center, kindergarten, language school, lawyer, accountant, medical center, vet clinic, flower shop, clothing store, furniture production, cakes to order, photographer, wedding/toi hall, travel agency, hotel, cleaning, cargo transport, transfer/taxi, manufacturing, wholesale, building materials store, appliance repair, psychologist, massage, nail studio, event agency, jewelry store, driving school). Each: what pages/features such a site needs (5 items), which services fit, typical client question.

PAGES (target ≥2000, report exact count):
- /{service}/{city}/ ru (21×25) and /kk/{service}/{city}/ kk (21×25) with hreflang pairs.
- /sait-dlya/{niche}/{city}/ ru (40×25).
- Hubs: home ru+kk, each service ru+kk, each city ru+kk, each niche, /ceny/ (price list), /portfolio/, /kontakty/, 404.
- Page content blocks: H1 with service+city+price; intro using city context; local section linking relevant niches; included items; process (4 steps); price & timeline; FAQ (service + city specific); related services in same city + same service in nearby cities (internal linking); sticky CTA "Написать в Telegram" with prefilled text t.me/RealKazbek?text=... (and WhatsApp if set).
- Vary sentence templates deterministically (hash of slug) so wording differs, but all text must be natural Russian/Kazakh. Kazakh must be grammatical (correct locative suffixes, e.g. Алматыда, Шымкентте, Оралда).

SEO: canonical, hreflang, JSON-LD (ProfessionalService with areaServed, Offer with priceCurrency KZT, FAQPage, BreadcrumbList), breadcrumbs, sitemap.xml (+ sitemap index if needed), robots.txt, OG tags, clean slugs (latin translit), semantic HTML, alt texts, no orphan pages.

DEPLOY: GitHub Actions workflow builds and deploys dist/ to GitHub Pages on push to main; write CNAME uslugi.realkazbek.site. README.md in English with project description, how to edit prices/contacts, build, deploy, and a DNS section (CNAME record uslugi -> realkazbek.github.io). Add repo description/topics via gh if possible.

VERIFICATION (reviewer, before finishing): npm run build passes; page count ≥2000; zero broken internal links (script); unique titles/descriptions; duplicate-content check passes; sample 10 random pages ru+kk and read them for language quality; HTML validates basically; mobile layout OK. Write REPORT.md: page count, checks run with results, decisions, what I must do manually (fill WhatsApp/phone, DNS, Google Search Console + Yandex Webmaster submission).
