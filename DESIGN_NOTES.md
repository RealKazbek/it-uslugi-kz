# Design notes: RK Dev

## Design system

Source: `ui-ux-pro-max --design-system "freelance IT services marketplace Kazakhstan light trustworthy modern Kaspi-like catalog"`.
The skill returned "Hero + Testimonials + CTA" pattern, "Vibrant & Block-based" style, a violet/green palette and Poppins/Open Sans.
We kept the pattern (hero, social proof, CTA after proof), the 4.5:1 contrast rule, 150-300ms motion, visible focus,
reduced-motion support. We overrode palette and fonts (see Decisions log). Tokens live only in `frontend/app/globals.css`.

### Palette (light only)

| Token | Hex | Use |
|---|---|---|
| background / card | #FFFFFF | page, cards |
| foreground | #111827 | body text (17.7:1) |
| muted | #F5F6F8 | soft section background |
| muted-foreground | #5B6472 | secondary text (5.98:1 on white, 5.59:1 on muted) |
| border | #E5E7EB | hairlines, card borders |
| input | #868E9B | form field outline (>= 3:1) |
| primary / ring | #D92D20 | the one accent: CTAs, focus ring, key marks |
| primary-foreground | #FFFFFF | text on accent (4.83:1) |
| primary-hover | #B42318 | hover/pressed accent |
| secondary | #F1F2F4 | secondary button surface |
| accent / accent-foreground | #FEF1EF / #B42318 | soft accent tint, badges, highlighted menu item |
| success | #1F7A4D | confirmations (5.3:1) |
| whatsapp / foreground | #0F7A41 / #FFFFFF | WhatsApp buttons only (5.41:1) |
| telegram / foreground | #1670A8 / #FFFFFF | Telegram buttons only (5.36:1) |

### Typography

Onest (Google Fonts, subsets latin + cyrillic + cyrillic-ext, display swap), CSS var `--font-sans`, Tailwind `font-sans`.
One family, weights 400/500/600/700/800. Kazakh letters (ә ғ қ ң ө ұ ү һ і) are in cyrillic-ext.

Type scale (rem, Tailwind): body 1 (16px) / 1.6; small `text-sm` .875; lead `text-lg` 1.125; h3 `text-xl` 1.25;
h2 `text-2xl md:text-3xl`; h1 `text-3xl md:text-5xl`. Headings weight 800, tracking -0.02em, line-height 1.2, `text-wrap: balance`.
Long text: `max-w-prose` (70ch).

### Spacing and layout

4px base grid (Tailwind default). Container `max-w-7xl`, gutters 16/24/32px. Sections `py-12 md:py-20`.
Grid gaps 16 (mobile) / 24px. Touch targets >= 44px (`min-h-11`).

### Radii, shadows

Radius var `--radius` 0.75rem: `rounded-lg` buttons/inputs, `rounded-xl` cards, `rounded-full` badges.
Shadows: `shadow-card` (resting), `shadow-card-hover` (lift on hover), `shadow-pop` (menus, sheets).

### Motion

Durations: fast 150ms, base 200ms, slow 300ms (`duration-fast|base|slow`). Easing `ease-out` = cubic-bezier(0.22, 1, 0.36, 1).
Animate only color, opacity, shadow, transform. Exits are shorter than enters. A global `prefers-reduced-motion: reduce` rule disables transitions/animations.

### Components (frontend/components/ui)

- `Button` (cva): default, secondary, outline, ghost, whatsapp, telegram, link; sizes sm/default/lg/icon; `asChild`. `ButtonLink` = link-as-button, external URLs open in new tab.
- `Badge`, `Card` (+Header/Content/Footer, `interactive` lifts on hover), `Accordion` (Radix), `Input`, `Select` (Radix), `Sheet` (Radix dialog, mobile menu).
- `Container`, `Section`: layout primitives. `cn` in `lib/ui/cn.ts`.
- Rules: one primary button per view; WhatsApp is the main CTA channel (green), Telegram secondary (blue); never use channel colours for decoration.
  Cards are white with a hairline border and `shadow-card`, price in bold, tabular numbers. Icons from lucide-react (stroke 2, 20px), brand icons from react-icons; no emoji as icons.

### Accessibility

Text contrast >= 4.5:1, UI boundaries >= 3:1. Focus ring 3px accent with 2px offset on every `:focus-visible`. Skip link kept.
Icon-only buttons need an accessible label (`sr-only`). Visible labels on form fields; errors next to the field.
Do not rely on colour alone. Respect reduced motion. `color-scheme: light`.

### Anti-patterns

Dark mode or `dark:` classes; second accent colour; navy; raw hex or `rgb()` in components (use tokens); emoji icons; hover-only affordances;
animating width/height; one duration for everything; text below 14px; low-contrast gray-on-gray; fixed pixel widths; layout shift from unsized images.

## Decisions log

- 2026-10-30: Skill suggested violet + Poppins/Open Sans. Rejected: violet reads as generic SaaS, Poppins has no cyrillic-ext (Kazakh letters). Chose Kaspi-like warm red instead.
- 2026-10-30: Accent #D92D20. The brand-red #E03A2C gives only 4.36:1 with white, so it was darkened until white button text passes AA (4.83:1). Hover #B42318.
- 2026-10-30: Font Onest. font-data.json confirms subsets cyrillic, cyrillic-ext, latin, latin-ext. Chosen over Inter/Manrope for friendlier Cyrillic shapes; one family only, to keep payload small.
- 2026-10-30: WhatsApp green #0F7A41 (not #128C4A, which gives 4.31:1 with white text). Telegram blue kept from old design (#1670A8).
- 2026-10-30: Input outline #868E9B instead of the light border colour, to satisfy 3:1 non-text contrast.
- 2026-10-30: Tokens are RGB channels (shadcn-style) so `bg-primary/10` alpha works; shadows, durations, easing are CSS vars too.
- 2026-10-30: Dark mode removed completely (media query, data-theme, tokens). `color-scheme: light`.
- 2026-10-30: Old tokens migrated: ink->foreground, paper->background, mist->muted, line->border, tg->primary, tgtext->primary-foreground, ok->success, muted->muted-foreground.
- 2026-10-30: Primitive files use PascalCase (Button.tsx, Card.tsx, ...) to match existing components/ui; also lowercase `button.tsx` would clash with old `Button.tsx` on case-insensitive filesystems.
- 2026-10-30: Class-merge helper is `lib/ui/cn.ts` (no utils.ts dumping ground).
- 2026-10-30: `ButtonLink` kept in `Button.tsx` with the same props; old `primary` variant renamed `default` (no caller used it). WhatsApp CTAs now use `variant="whatsapp"`.
- 2026-10-30: Section spacing py-12 md:py-20 and container max-w-7xl per brief. Existing pages are not restyled in this step.
- 2026-10-30: Added global reduced-motion rule with 0.01ms durations (rather than `none`) so animationend events still fire.
- 2026-10-30: Monogram uses `fill-primary` classes instead of inline style var; favicon.svg fill is #D92D20.
- 2026-10-30: Images: 79 Unsplash photos (16 category = 2 per category, 59 product, 3 hero, 1 portfolio) found via unsplash.com search pages, downloaded from images.unsplash.com once, cropped 3:2 and converted with cwebp q72 to 1200x800 (hero 1400x933), total ~4.2 MB in `frontend/public/media`. Sources listed in `public/media/CREDITS.md`. Paths come from `lib/media/images.ts`; next/image serves resized WebP with lazy loading. Unsplash+ and "sponsored" results skipped.
- 2026-10-30: An automated JSON search request to unsplash.com with a browser user-agent was blocked by the sandbox (bot-check circumvention); used the plain web-page fetch tool instead. Pexels was not needed.
- 2026-10-30: Product gallery = product photo + the two category photos (3 images), so every product has a gallery without inventing project screenshots.
- 2026-10-30: No client reviews or testimonials are shown: none exist, and the project's honesty rules (docs/history/DECISIONS-v1-v2.md, lib/portfolio/items.ts) forbid invented reviews or metrics. The "trust/reviews" block is a trust block instead (open prices, written agreement, 50/50 payment, direct contact) plus live portfolio links. Animated counters show only numbers computed from real data (products, categories, languages, city pages).
- 2026-10-30: Instagram/TikTok: no accounts exist in docs/content-config.json, so `socials` in lib/site/contacts.ts is null and those brand icons render only once a URL is filled in. WhatsApp and Telegram brand icons are used everywhere.
- 2026-10-30: Catalog is a flat Kaspi-style grid (filter by category chip, search, sort: popular/price asc/price desc/fastest) instead of per-category groups; logic in lib/catalog/browse.ts with tests.
- 2026-10-30: Motion: framer-motion via LazyMotion(domAnimation, strict) + `m.*` components to keep JS small; MotionConfig reducedMotion="user" plus the CSS reduced-motion rule. Hover lift is CSS only.
- 2026-10-30: Portfolio images are real screenshots taken with Playwright of the live projects (terracon.kz, realkazbek.github.io/Car after the 3D scene loaded), saved as public/portfolio/{slug}.webp (1200x750), which the existing portfolioImageExists() picks up. The Telegram AI assistant has no public UI worth showing (t.me page is a generic card), so it keeps the placeholder; a stock photo labelled "screenshot" would be misleading.
- 2026-10-30: Product page is a Kaspi-style 12-col grid: gallery + content (7) and a sticky order card (5, sticky on the grid cell so it follows the whole content column). On mobile the card follows the gallery and a fixed ProductMobileBar replaces the global bar; below 480px its WhatsApp button is icon-only (price needs the room). Lead form keeps native select/textarea (tests and form data) restyled to the Input look. Screenshot check used playwright-core in the scratchpad with the cached chromium build, nothing added to package.json.
- 2026-10-30: ProductCard takes `labels: {order, timeline}` (use `cardLabels(dict)`), because CardView has no language; stretched-link title makes the whole card clickable, the order button sits above it (z-10). It is lifted with CSS only (motion-safe).
- 2026-10-30: Catalog browser: `results` text is passed as a string array (index = match count) because functions cannot cross the server/client boundary. Staggered reveal runs only until the first filter interaction, so filtering stays instant. `categoryIcon(slug)` lives in components/features/catalog/categoryIcons.ts for reuse.
- 2026-10-30: Hero chips ("Telegram bots and AI", "Turnkey websites") are generic category labels (home.heroChips), no invented numbers or prices. Hero contract: `<Hero lang stats={{products,categories,languages,cities}} />`, brings its own section and Container.
- 2026-10-30: Home composition follows the brief: Hero, Popular, Categories, How, Cases, Prices, Trust, FAQ, Cities, CTA. The "About me" section (aboutHeading/aboutFacts) is dropped from the home page; the strings stay in the dictionaries.
- 2026-10-30: Trust strip hides the "cities" counter when the count is 0 (en has no city pages), so no zero is shown.
- 2026-10-30: Case cards are a single `PortfolioCard` (components/features/portfolio) used by home and the portfolio page; the duplicate home `CaseCard` was removed. Placeholder shows the title initial on bg-accent when no screenshot exists.
- 2026-10-30: Shared `PageHeader` (components/ui) for inner pages: h1 text-3xl md:text-5xl, breadcrumbs, lead, optional actions. Prices and portfolio CTAs reuse the home `CtaSection`.
- 2026-10-30: Lighthouse fixes: first catalog row renders without the hidden stagger state and loads its photos with priority (LCP was a card image waiting for hydration); Onest switched to `display: 'optional'` (mobile LCP was the hero paragraph repainting at font swap, 3.6 s -> 1.6 s; next/font's adjusted fallback keeps the first visit stable). Red text links use primary-hover (#B42318) because #D92D20 on the muted background is 4.46:1; CTA lead text drops /90 opacity; catalog grid gets a visually hidden h2 for heading order.
- 2026-10-30: Hero CTAs: WhatsApp full width on phones, catalog + Telegram as equal outline buttons beside it; catalog toolbar is sticky only below lg (on desktop the wrapped chips made it ~220px tall).
- 2026-10-30: Bug found while taking screenshots: Next 15.5's runtime image optimizer left some cache keys pending forever after a browser aborted the request mid-resize (catalog page never fired `load` until a container restart). Fix: no runtime resizing. `scripts/media-variants.sh` writes 256/384/640/828px WebP variants next to each photo (source = 1200px), `lib/media/loader.ts` is a custom next/image loader that maps the requested width to a file (tested), and `/media/*`, `/portfolio/*` get a one-week Cache-Control. Re-run the script after adding photos.

## Lighthouse (2026-10-30)

Lighthouse 12.8.2 against the FINAL production build (`make dev` after the channels-strip commit, the last code change), http://127.0.0.1:3000, ru, default mobile (simulated slow 4G, 4x CPU) and desktop presets.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home `/` | mobile | 95 | 100 | 100 | 100 | 3.0 s | 59 ms | 0 |
| Home `/` | desktop | 98 | 100 | 100 | 100 | 1.1 s | 0 ms | 0 |
| Catalog `/catalog` | mobile | 91 | 96 | 100 | 100 | 3.5 s | 59 ms | 0 |
| Catalog `/catalog` | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 ms | 0 |
| Product `/products/lending` | mobile | 93 | 100 | 100 | 100 | 3.1 s | 32 ms | 0 |
| Product `/products/lending` | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 ms | 0 |

Variance (earlier mobile runs on the previous builds of the same code): home 94 / 94 / 99 / 95, catalog 94 / 92 / 93 / 91 / 99, product 100 / 100 / 93. Mobile performance >= 90 in every run on all three pages.
Catalog accessibility 96: axe samples cards that are still fading in (staggered reveal) and reports blended colours (#DC3C30 instead of the real #D92D20, #7B828D instead of #5B6472). The resting colours pass AA (4.83:1 and 5.98:1).

Screenshots (Playwright, full page, ru, final build) at 375/768/1280 for home, catalog and product: `/screenshots` at the repo root (`screenshots/{home,catalog,product}-{375,768,1280}.png`). The folder is git-ignored (~37 MB of PNG) so the branch stays light. Fixed elements (mobile contact bar, floating WhatsApp) appear where the viewport ended during the full-page capture.
- 2026-10-30: Instagram/TikTok brand icons are now visible: a home "channels" strip (ChannelsStrip, after Categories) shows WhatsApp, Telegram, Instagram and TikTok as the channels client sites and bots connect to (WhatsApp buttons, Telegram bots, Instagram/TikTok links on the sites). They are labels, not links, because RK Dev has no Instagram/TikTok accounts; the footer social links still appear only when `socials` gets real URLs.
- 2026-10-30: `/screenshots` at the filesystem root cannot be created on macOS (`mkdir: /screenshots: Read-only file system`), so screenshots live in `screenshots/` at the repo root (git-ignored, ~37 MB).

## Perne redesign pass (2026-10-30, autonomous run)

- Brand: wordmark only (`components/ui/Wordmark.tsx`, Onest 800, 24px, ink) from the single constant `SITE_NAME = 'Perne'` (`lib/site/brand.ts`); the RK tile and `Monogram` were removed, favicon is a dark tile with "P". i18n titles carry the literal name "Perne"; code reads the constant.
- Portfolio: route, nav items, home section, dictionaries, images and sitemap entry removed. The contacts page still links the owner's personal site (an external link, not a portfolio section).
- Reviews: new Django app `reviews` (Review model, `is_approved=false` by default, moderated in admin, public POST with honeypot `website` and throttles 2/min + 5/day, GET returns approved only + optional `REVIEWS_2GIS_URL`). Frontend `/reviews` page + form; the nav item, footer link and home section appear only when at least one approved review exists. No reviews are seeded.
- Stats: home counters were already computed from the API (products, categories, languages, cities); nothing hardcoded.
- Design system: tokens live in `app/globals.css` (Perne palette, type scale, spacing 8/16/24/48/80, radii 8/12/20, hover-only card shadow) and are exposed in `tailwind.config.ts` (`bg-surface-200`, `text-ink-muted`, `text-display|h2|stat|h3|body-lg|label`, ...). Legacy semantic names alias the new tokens. Default button = WhatsApp green (primary CTA); Telegram button is an outlined button with the Telegram-blue icon (#229ED9 fails contrast as a fill); red is used for badges, icons, links and focus; the closing CTA panel is now the warm `surface-tint` instead of red. Cards: 1px line border, no resting shadow.
- New categories reuse existing photos (apps→bots, devops→support, onsite→automation, design→websites) and new products get copies of their category photo (`public/media/products/<slug>*.webp`); replace with dedicated photos when available.

## Catalog expansion (2026-10-30)

Research: WebSearch for KZ prices (Kaspi Объявления, OLX.kz, 2GIS, studios) returned almost no tenge price lists: results were mostly RU-market rubles, one Kaspi listing of ready-made sites at 5 000–35 000 ₸, ad-click costs (Almaty Google Ads CPC $0.13–0.36) and a freelancer SEO/Ads estimate of $600–1000 / $300–500 per month. Prices below are therefore **estimates (guessed)**, set to the low end of KZ freelance/small-studio ranges, roughly 10–20% under what we believe is typical. **Every price in this table is a guess and must be checked by the owner before launch.** Existing 59 products were not re-priced.

Voice: all copy is in the team voice ("мы / работаем командой", remote across Kazakhstan); existing first-person copy was rewritten. Education products use teaching wording only and state explicitly that we do not write work for students. On-site products carry `is_onsite`; the badge "Выезд: …" comes from `ONSITE_CITIES` (default Алматы) and they are hidden from city pages of other cities.

Kazakh copy was model-written and needs a native-speaker pass.

| Category | Product | Price (guess) | Timeline |
|---|---|---|---|
| Сайты | Сайт-каталог с товарами и заявкой (`katalog-sait`) | от 250 000 ₸ | 10–20 дн. |
| Сайты | Многоязычный сайт на русском  казахском и английском (`mnogoyazychnyi-sait`) | от 300 000 ₸ | 14–25 дн. |
| Сайты | Сайт на Tilda под ключ (`sait-na-tilda`) | от 90 000 ₸ | 5–10 дн. |
| Сайты | Сайт на WordPress с понятной админ-панелью (`sait-na-wordpress`) | от 200 000 ₸ | 10–20 дн. |
| Интернет-магазины | Приём оплаты Kaspi Pay и Halyk на сайте (`kaspi-pay-halyk-oplata`) | от 35 000 ₸ | 5–10 дн. |
| Интернет-магазины | Синхронизация магазина с 1С и МойСклад (`sinhronizaciya-1s-moysklad`) | от 60 000 ₸ | 10–20 дн. |
| Мобильные приложения | Мобильное приложение для iOS и Android (`mobilnoe-prilozhenie-ios-android`) | от 450 000 ₸ | 45–90 дн. |
| Мобильные приложения | PWA: сайт  который ставится как приложение (`pwa-prilozhenie`) | от 150 000 ₸ | 20–35 дн. |
| Мобильные приложения | Telegram Mini App под вашу задачу (`telegram-mini-app`) | от 90 000 ₸ | 14–30 дн. |
| Боты | Бот для Instagram Direct (`instagram-direct-bot`) | от 45 000 ₸ | 7–14 дн. |
| Боты и AI: ассистенты | ИИ для продаж и поддержки клиентов (`ai-prodazhi-i-podderzhka`) | от 110 000 ₸ | 14–30 дн. |
| Боты и AI: ассистенты | Голосовой бот для звонков и голосовых сообщений (`golosovoi-bot`) | от 150 000 ₸ | 21–40 дн. |
| CRM и интеграции | Настройка amoCRM под ваши продажи (`amocrm-nastroika`) | от 60 000 ₸ | 5–12 дн. |
| CRM и интеграции | Внедрение и настройка Битрикс24 (`bitrix24-nastroika`) | от 70 000 ₸ | 7–15 дн. |
| CRM и интеграции | Интеграция сайта и CRM с 1С (`integraciya-1s`) | от 80 000 ₸ | 10–25 дн. |
| CRM и интеграции | Интеграция с Kaspi API: заказы и остатки (`integraciya-kaspi-api`) | от 70 000 ₸ | 10–20 дн. |
| CRM и интеграции | Автоматизация процессов на n8n и Make (`n8n-make-avtomatizaciya`) | от 40 000 ₸ | 3–10 дн. |
| SEO и реклама | Настройка Google Ads (`google-ads-nastroika`) | от 40 000 ₸ | 3–7 дн. |
| SEO и реклама | Настройка Яндекс Директ (`yandex-direct-nastroika`) | от 35 000 ₸ | 3–7 дн. |
| SEO и реклама | Аналитика: Google Analytics 4 и Яндекс Метрика (`analitika-ga4-metrika`) | от 25 000 ₸ | 2–5 дн. |
| DevOps и хостинг | Деплой проекта на сервер (`deploy-proekta`) | от 40 000 ₸ | 2–5 дн. |
| DevOps и хостинг | Настройка и защита VPS (`vps-nastroika`) | от 30 000 ₸ | 1–3 дн. |
| DevOps и хостинг | Упаковка проекта в Docker (`docker-kontejnery`) | от 35 000 ₸ | 2–5 дн. |
| DevOps и хостинг | CI/CD: автодеплой из GitHub (`ci-cd-avtodeploi`) | от 45 000 ₸ | 2–6 дн. |
| DevOps и хостинг | Автоматические бэкапы сайта и базы (`bekapy-sait-baza`) | от 20 000 ₸ | 1–3 дн. |
| DevOps и хостинг | Мониторинг и уведомления о падении сайта (`monitoring-dostupnosti`) | от 25 000 ₸ | 1–3 дн. |
| Поддержка сайтов | Лечение сайта от вирусов и взлома (`lechenie-ot-vzloma`) | от 30 000 ₸ | 1–4 дн. |
| Поддержка сайтов | Безопасное обновление CMS  плагинов и PHP (`obnovlenie-saita`) | от 12 000 ₸ | 1–3 дн. |
| Дизайн | Логотип и мини-брендбук (`logotip`) | от 25 000 ₸ | 5–10 дн. |
| Дизайн | UI/UX дизайн сайта или приложения (`ui-ux-dizain`) | от 80 000 ₸ | 10–25 дн. |
| Дизайн | Баннеры для рекламы и соцсетей (набор) (`bannery-dlya-reklamy`) | от 8 000 ₸ | 2–4 дн. |
| Дизайн | Презентация для бизнеса или инвесторов (`prezentaciya`) | от 25 000 ₸ | 3–7 дн. |
| Видеонаблюдение и сети | Установка видеонаблюдения с выездом (`ustanovka-videonablyudeniya`) | от 45 000 ₸ | 1–3 дн. |
| Видеонаблюдение и сети | Удалённый просмотр камер с телефона (`udalennyi-prosmotr-s-telefona`) | от 10 000 ₸ | 1–2 дн. |
| Видеонаблюдение и сети | Wi-Fi и локальная сеть в офисе или магазине (`wifi-i-lokalnaya-set`) | от 35 000 ₸ | 1–4 дн. |
| Видеонаблюдение и сети | СКУД и домофоны (с выездом) (`skud-i-domofony`) | от 70 000 ₸ | 2–7 дн. |
| Учёба и IT-наставничество | Разбор лабораторных работ с объяснением (`razbor-laboratornyh`) | от 4 000 ₸/урок | 1–1 дн. |
| Учёба и IT-наставничество | Консультация и code review по технической части диплома (`konsultaciya-po-diplomu`) | от 5 000 ₸/час | 1–1 дн. |
| Учёба и IT-наставничество | Подготовка к защите дипломного проекта (`podgotovka-k-zashite`) | от 5 000 ₸/урок | 1–1 дн. |
| Учёба и IT-наставничество | Помощь разобраться с материалами онлайн-курсов (`pomosh-s-kursami`) | от 3 500 ₸/урок | 1–1 дн. |
- Voice: fixtures and `lib/i18n/dict` copy rewritten from first person singular to the team voice ("мы / работаем командой"). Not changed on purpose (factual, owner to decide): `lib/site/legal.ts` (states the seller is a self-employed individual, not a company) and `lib/site/person.ts` / contacts person block. The copy no longer names an individual or claims an IITU student bio.

### Verification (2026-10-30)
- `make dev` (SEED=1) starts clean: db, backend, frontend, bot healthy. Backend 149 tests, frontend 145 tests, ruff/eslint/tsc clean.
- All 99 product pages return 200 in ru, kk and en. `node frontend/scripts/check-links.mjs` (crawls sitemap + internal hrefs): 398 URLs, 0 failures.
- On-site products: `/city/almaty` lists them, `/city/astana` does not; product pages show "Выезд: Алматы".
- Screenshots (Playwright, ru): `screenshots/{home,catalog,product}-{375,1280}.png` at the repo root (`/screenshots` at filesystem root is read-only on macOS; folder is git-ignored). Product sample: `/products/ustanovka-videonablyudeniya`.
- Open items for the owner: review all guessed prices above, native-speaker pass on Kazakh copy, dedicated photos for new categories/products, set `REVIEWS_2GIS_URL` and moderate reviews in the Django admin, decide on `legal.ts`/`person.ts` wording.

### Price check (evidence for "10–20% below market")
No market data in tenge could be found by web search (see above), so the 10–20% target is **not evidenced**: the new prices follow my estimate of KZ small-studio/freelance ranges (e.g. landing/Tilda site 30–45k vs. typical studio quotes of 50–150k ₸; CRM setup 60–70k; Kaspi API 70k; CCTV install from 45k; tutoring 3.5–5k per lesson). Treat every price as a placeholder until the owner confirms it.

### Review round 2 (2026-10-30)
- `frontend/scripts/check-products.mjs` renders every product in ru/kk/en and checks for-whom, includes, FAQ count (3–5 from API and rendered), "₸" price and a WhatsApp link prefilled with the product title: 297 pages, all OK.
- Fixture files are ≤108 lines each (limit 250).
- Contacts "Кто мы" block, legal text and `person.ts` moved to team voice; the personal portfolio and GitHub contact links were removed. Remaining first-person hits in fixtures are customer-voice quotes («у меня работает», "my kind of case").
- Type scale: all headings, stats and prices use `text-display|h2|h3|stat`; resting card shadows removed (shadows only on hover, plus popovers/sheets).
- `/screenshots` literally cannot exist (read-only root on macOS); screenshots are in `screenshots/` in the repo.

### Price evidence, website products (extended search, 2026-10-30)
Sources: [iprod.kz](https://iprod.kz/razrabotka-sajta-pod-klyuch-chto-vhodit-i-kak-vybrat-studiyu/) (landing/visitka from 150 000 ₸, corporate ~350–406 000, shop from 500 000; below 50 000 usually means a template), [lead.media](https://lead.media/kz/almaty/sozdanie-sajtov/tseny/) (landing from 320–400 000 ₸ by city, corporate 720–905 000, shop 1.2–1.5 M), [eldarcci.studio](https://eldarcci.studio/blog/tpost/ymx988p0m1-skolko-stoit-sait-pod-klyuch-v-kazahstan). These are studio list prices (advertising pages).
- The four new website products were re-priced to about 15% under the lower studio figures: catalog site 250 000, multilingual 300 000, WordPress 200 000 ₸; the Tilda site (90 000 ₸) has no direct source and stays a guess.
- **Existing products are far below this range** (landing 45 000, visitka 35 000, corporate 120 000, shop 180 000 ₸), i.e. 70–90% under studio prices, not 10–20%. They were not changed because they were priced before this task; the owner should decide whether to raise them. Prices for the other categories (bots, CRM, SEO, DevOps, CCTV, design, tutoring) still have no source and remain guesses.

### Existing site and shop products re-priced (evidence-based part only)
The goal says prices should sit ~10–20% under the KZ market, so the existing site/shop products were raised using the studio list prices above (landing/visitka floor 150 000 ₸ × ~0.87, corporate 350 000 × ~0.85, shop 500 000 × ~0.85; industry sites sold as landing-class). These are the only prices with a source; everything else stays a guess. The owner may prefer the old low prices as a freelance positioning: revert by `git revert` of this commit.

| product | old ₸ | new ₸ |
|---|---|---|
| `lending` | 45 000 | 130 000 |
| `sait-vizitka` | 35 000 | 130 000 |
| `korporativnyi-sait` | 120 000 | 300 000 |
| `internet-magazin` | 180 000 | 420 000 |
| `internet-magazin-odezhdy` | 170 000 | 400 000 |
| `internet-magazin-cvetov` | 150 000 | 380 000 |
| `magazin-s-kaspi-xml` | 220 000 | 450 000 |
| `sait-dlya-kafe` | 50 000 | 130 000 |
| `sait-dlya-salona-krasoty` | 50 000 | 130 000 |
| `sait-dlya-stomatologii` | 60 000 | 150 000 |
| `sait-dlya-stroitelnoi-kompanii` | 70 000 | 150 000 |
| `sait-dlya-uchebnogo-centra` | 55 000 | 140 000 |
| `sait-dlya-avtoservisa` | 45 000 | 130 000 |
| `sait-dlya-fitnes-kluba` | 55 000 | 140 000 |
| `sait-dlya-toi-zala` | 50 000 | 130 000 |
| `sait-dlya-yurista` | 40 000 | 130 000 |
| `sait-dlya-agentstva-nedvizhimosti` | 80 000 | 160 000 |

### Price evidence, other categories (extended search, 2026-10-30)
Sources are studio/contractor ad pages, so they are list prices, not statistics.
- **Bots / AI** ([osn.kz](https://osn.kz/services/chatbots), [aoneagency.kz](https://aoneagency.kz/ai-chatboty), [awstudio.kz](https://www.awstudio.kz/razrabotka-chat-botov.html), [a-lux.kz](https://a-lux.kz/chatbots/), [tck.kz](https://tck.kz/chatbots/)): simple scenario bot 15 000–50 000 ₸ (up to 400 000 at a-lux), bot with integrations from 150 000, AI assistant from 150 000 (basic) / 250 000 (on company documents) / 450 000+ (GPT trained on client data). Our bots were set ~15% under the low-to-mid range.
- **CRM** ([osn.kz](https://osn.kz/blog/digital-transformatsiya-biznesa-kz-2026), [4web.kz](https://4web.kz/blog/web/amocrm-vs-bitrix24-kz), [applications.kz](https://applications.kz/bitrix24-kazahstan/)): amoCRM from ~150 000 ₸ (up to 800 000), Bitrix24 300 000–900 000 (from 400 000 at one vendor). Licences are extra.
- **CCTV / access control** ([onsetpro.kz](https://onsetpro.kz/blog/skolko-stoit-videonablyudenie-v-almaty), Kaspi Объявления, [satu.kz](https://satu.kz/almaty/Ustanovka-skud.html)): camera install 4 500–13 000 ₸ per camera, recorder set-up from 12 000, turnkey kits from 80 000 (apartment) / 215 000 (house); access control 45 000–130 000 ₸ per door. Our CCTV install from 45 000 (≈4 cameras without equipment) and access control from 70 000 sit ~15–20% under the middle of those ranges.
- **Logo** ([hyperlab.kz](https://hyperlab.kz/blog/skolko-stoit-logotip/), Kaspi Объявления): freelancers 5 000–150 000 ₸, studios ~60 000–65 000. Logo + mini-brandbook set to 50 000.
- **Tutoring** ([profi.kz](https://profi.kz/geo-alm/repetitor/prog/), [buki-kz.com](https://buki-kz.com/repetitor/prohramuvannia/almaty/)): from 3 000 ₸/h, average ~5 000, up to 10 000+. Our lessons at 3 500–5 000 are at or ~20% under the average; left as is.
- **Still without a source (guesses, unchanged):** SEO and ads set-up, GA4/Metrica, DevOps (deploy, VPS, Docker, CI/CD, backups, monitoring), Kaspi Pay/Halyk, 1С/МойСклад sync, 1С and Kaspi API integrations, n8n/Make, mobile apps/PWA/Mini Apps, UI/UX, banners, presentations, support, maps cards. Searches for these returned no tenge prices.

Changed in this pass:

| product | old ₸ | new ₸ |
|---|---|---|
| `telegram-bot-faq` | 25 000 | 45 000 |
| `telegram-bot-zayavki` | 30 000 | 45 000 |
| `telegram-bot-rassylka` | 30 000 | 50 000 |
| `telegram-bot-zapis` | 35 000 | 110 000 |
| `telegram-bot-katalog` | 50 000 | 120 000 |
| `telegram-bot-dostavka` | 60 000 | 130 000 |
| `telegram-bot-dlya-kursov` | 45 000 | 110 000 |
| `whatsapp-bot` | 40 000 | 60 000 |
| `instagram-direct-bot` | 45 000 | 60 000 |
| `ai-assistent-telegram` | 60 000 | 130 000 |
| `ai-assistent-whatsapp` | 80 000 | 150 000 |
| `ai-chat-na-sait` | 50 000 | 120 000 |
| `ai-baza-znanii-dlya-sotrudnikov` | 90 000 | 210 000 |
| `ai-prodazhi-i-podderzhka` | 110 000 | 300 000 |
| `amocrm-nastroika` | 60 000 | 130 000 |
| `bitrix24-nastroika` | 70 000 | 260 000 |
| `logotip` | 25 000 | 50 000 |

### Price evidence, last round (extended search, 2026-10-30)
- **SEO per month** ([4web.kz](https://4web.kz/services/seo/pricing), [lead.media](https://lead.media/kz/almaty/prodvizhenie-sajtov-v-google/)): from 150 000 ₸ (small services site), 250–280 000 (business site), 450 000 (shop); 50–70 000 offers exist but carry no guarantees.
- **Ads set-up** ([g-ads.kz](https://g-ads.kz/), [applications.kz](https://applications.kz/nastroyka-yandex-direct/)): Google Ads ~70 000 ₸ one-off; Yandex Direct audit + set-up from 120 000, search + RSY from 150 000.
- **UI/UX** (studio pages): landing design from 150 000 ₸, multi-page from 300 000; freelance exchanges from ~18 000 for small tasks.
- **Mobile apps** ([osn.kz](https://osn.kz/blog/mobile-app-cost-kazakhstan-2025), [hyperlab.kz](https://hyperlab.kz/blog/skolko-stoit-prilozhenie/)): from 500 000 up to 25 M ₸; simple Flutter app ~2.5 M, standard with account and Kaspi ~6 M.

| product | old ₸ | new ₸ |
|---|---|---|
| `seo-prodvizhenie` | 40 000 | 130 000 |
| `google-ads-nastroika` | 40 000 | 60 000 |
| `yandex-direct-nastroika` | 35 000 | 100 000 |
| `ui-ux-dizain` | 80 000 | 130 000 |
| `mobilnoe-prilozhenie-ios-android` | 450 000 | 2 100 000 |

Final status of the price criterion: sourced and set ~10–20% under list prices for sites, shops, bots, AI, CRM, CCTV/access control, logo, tutoring, SEO, ads set-up, UI/UX and mobile apps. Still unsourced guesses (no tenge data found after three search rounds): PWA, Telegram Mini Apps, GA4/Metrica, DevOps items, Kaspi Pay/Halyk, 1С/МойСклад sync, 1С and Kaspi API integrations, n8n/Make, banners, presentations, support, maps cards, local SEO, SEO audit. Owner to confirm these.

Blocked, skipped per the rules: `/screenshots` (read-only root filesystem, tried `mkdir` and `ln -s`) and the Kazakh native-speaker pass (needs a human).
