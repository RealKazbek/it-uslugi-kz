# Decisions

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

## Fixed slugs (all coders use these)
Services (21; priceFrom KZT / unit):
lending 45000/once, sait-vizitka 35000/once, korporativnyi-sait 120000/once, internet-magazin 180000/once, telegram-bot 30000/once, ai-assistent 60000/once, whatsapp-bot 40000/once, crm 90000/once, veb-prilozhenie 200000/once, telegram-mini-app 120000/once, seo 40000/month, ispravlenie-oshibok 5000/once, redizain 60000/once, podderzhka-saita 15000/month, domen-hosting-ssl 10000/once, avtomatizaciya 25000/once, parsing 20000/once, kartochka-na-kartah 10000/once, kaspi-xml 25000/once, repetitor-programmirovaniya 4000/lesson, kompyuternaya-pomosch 3000/hour.

Cities (25): almaty, astana, shymkent, karaganda, aktobe, taraz, pavlodar, ust-kamenogorsk, semey, atyrau, kostanay, kyzylorda, uralsk, petropavlovsk, aktau, taldykorgan, turkestan, kokshetau, temirtau, ekibastuz, zhezkazgan, konaev, balkhash, rudny, zharkent.

Niches (40): stomatologiya, salon-krasoty, barbershop, kafe-restoran, dostavka-edy, avtoservis, avtomoika, stroitelstvo, remont-kvartir, agentstvo-nedvizhimosti, fitnes, shkola-tancev, uchebnyi-centr, detskii-sad, yazykovaya-shkola, yurist, buhgalter, medcentr, veterinarnaya-klinika, cvetochnyi-magazin, magazin-odezhdy, proizvodstvo-mebeli, torty-na-zakaz, fotograf, toi-zal, turagentstvo, gostinica, klining, gruzoperevozki, transfer-taksi, proizvodstvo, optovaya-torgovlya, stroimaterialy, remont-tehniki, psiholog, massazh, nail-studiya, event-agentstvo, yuvelirnyi-magazin, avtoshkola.
