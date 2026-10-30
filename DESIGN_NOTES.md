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
