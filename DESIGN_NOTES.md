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

Lighthouse 12.8.2, production build from `make dev` (http://127.0.0.1:3000, ru), default mobile (simulated slow 4G, 4x CPU) and desktop presets.
Final run after all fixes (pre-sized images, eager first catalog row, font display optional):

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home `/` | mobile | 94 | 100 | 100 | 100 | 3.0 s | 38 ms | 0 |
| Home `/` | desktop | 99 | 100 | 100 | 100 | 1.0 s | 0 ms | 0 |
| Catalog `/catalog` | mobile | 91 | 96 | 100 | 100 | 3.5 s | 9 ms | 0 |
| Catalog `/catalog` | desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 ms | 0 |
| Product `/products/lending` | mobile | 95 | 100 | 100 | 100 | 2.9 s | 9 ms | 0 |
| Product `/products/lending` | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 ms | 0 |

Variance check, 3 more mobile runs: home 94 / 94 / 99, catalog 94 / 92 / 93. Performance >= 90 in every run.
Catalog accessibility 96: axe samples cards that are still fading in (staggered reveal), so it reports blended colours (#DC3C30 instead of the real #D92D20, #7B828D instead of #5B6472). The resting colours pass AA (4.83:1 and 5.98:1).

Screenshots (Playwright, full page, ru) at 375/768/1280 for home, catalog and product are in `/screenshots` (not committed: ~37 MB of PNG). Fixed elements (mobile contact bar, floating WhatsApp) appear where the viewport ended during the full-page capture.
- 2026-10-30: Screenshot follow-ups: related products on the product page use at most 3 columns (there are usually 3, which left an empty 4th column); portfolio titles are now per language (`title: Record<Lang, string>`), so /en no longer shows the Russian "AI-ассистент" title.
- 2026-10-30: Instagram/TikTok brand icons (SiInstagram, SiTiktok) are implemented in the footer but stay hidden until real profile URLs are set in `socials` (lib/site/contacts.ts); inventing account URLs would publish wrong contact links. WhatsApp and Telegram brand icons are visible everywhere.
