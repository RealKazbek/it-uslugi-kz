import { config } from '../data/config.js';
import { esc } from './escape.js';
import { abs, urls, tgUrl, waUrl } from './urls.js';
import { script, breadcrumbList } from './jsonld.js';
import { T, other } from './i18n.js';

const ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%2314213D'/%3E%3Ctext x='16' y='22' font-size='15' font-family='sans-serif' font-weight='800' text-anchor='middle' fill='white'%3ERK%3C/text%3E%3C/svg%3E";

// Buttons: Telegram always, WhatsApp / phone only when configured.
export function ctaButtons(lang, msg, { phone = false, mail = false } = {}) {
  const t = T[lang].ui;
  const out = [`<a class="btn tg" href="${esc(tgUrl(msg))}" rel="noopener">${esc(t.tg)}</a>`];
  const wa = waUrl(msg);
  if (wa) out.push(`<a class="btn wa" href="${esc(wa)}" rel="noopener">${esc(t.wa)}</a>`);
  if (phone && config.phone) out.push(`<a class="btn ghost" href="tel:${esc(config.phone)}">${esc(t.call)}</a>`);
  if (mail && config.email) out.push(`<a class="btn ghost" href="mailto:${esc(config.email)}">${esc(config.email)}</a>`);
  return out.join('');
}

function head({ lang, title, description, path, alternates, noindex, jsonld }) {
  const t = T[lang];
  const links = [];
  if (alternates && alternates.ru && alternates.kk) {
    links.push(`<link rel="alternate" hreflang="ru" href="${abs(alternates.ru)}">`);
    links.push(`<link rel="alternate" hreflang="kk" href="${abs(alternates.kk)}">`);
    links.push(`<link rel="alternate" hreflang="x-default" href="${abs(alternates.ru)}">`);
  }
  const alt = alternates && alternates[other(lang)];
  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}">`,
    noindex ? '<meta name="robots" content="noindex">' : '',
    noindex ? '' : `<link rel="canonical" href="${abs(path)}">`,
    ...links,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${esc(config.brand)}">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${abs(path)}">`,
    `<meta property="og:locale" content="${t.locale}">`,
    alt ? `<meta property="og:locale:alternate" content="${T[other(lang)].locale}">` : '',
    '<meta name="twitter:card" content="summary">',
    '<meta name="theme-color" content="#14213D" media="(prefers-color-scheme: light)">',
    '<meta name="theme-color" content="#0F1A2E" media="(prefers-color-scheme: dark)">',
    `<link rel="icon" href="${ICON}">`,
    '<link rel="stylesheet" href="/assets/styles.css">',
    ...jsonld.map(script),
  ]
    .filter(Boolean)
    .join('\n');
}

function header(lang, alternates) {
  const t = T[lang].ui;
  const o = other(lang);
  const switchHref = alternates && alternates[o] ? alternates[o] : urls.home(o);
  return `<header class="site-header"><div class="wrap bar">
<a class="brand" href="${urls.home(lang)}">${esc(config.brand)}</a>
<nav class="nav" aria-label="${esc(t.menu)}">
<a href="${urls.prices()}">${esc(t.nav.prices)}</a>
<a href="${urls.nicheIndex()}">${esc(t.nav.niches)}</a>
<a href="${urls.portfolio()}">${esc(t.nav.portfolio)}</a>
<a href="${urls.contacts()}">${esc(t.nav.contacts)}</a>
<a class="lang" href="${switchHref}" hreflang="${o}" lang="${o}">${esc(T[lang].ui.langName)}</a>
</nav></div></header>`;
}

function crumbsHtml(lang, crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  const items = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<li aria-current="page">${esc(c.name)}</li>`
        : `<li><a href="${c.path}">${esc(c.name)}</a></li>`,
    )
    .join('');
  return `<nav class="crumbs wrap" aria-label="${esc(T[lang].ui.breadcrumbs)}"><ol>${items}</ol></nav>`;
}

function footer(lang) {
  const t = T[lang].ui;
  const contacts = [`<a href="${esc(tgUrl())}" rel="noopener">Telegram @${esc(config.telegram)}</a>`];
  if (config.email) contacts.push(`<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>`);
  if (config.whatsapp) contacts.push(`<a href="${esc(waUrl())}" rel="noopener">WhatsApp</a>`);
  if (config.phone) contacts.push(`<a href="tel:${esc(config.phone)}">${esc(config.phone)}</a>`);
  return `<footer class="site-footer"><div class="wrap">
<p><strong>${esc(config.brand)}</strong> — ${esc(t.footer.tagline)}</p>
<ul class="foot-links">
<li><a href="${urls.home(lang)}">${esc(t.nav.home)}</a></li>
<li><a href="${urls.nicheIndex()}">${esc(t.nav.niches)}</a></li>
<li><a href="${urls.prices()}">${esc(t.nav.prices)}</a></li>
<li><a href="${urls.portfolio()}">${esc(t.nav.portfolio)}</a></li>
<li><a href="${urls.contacts()}">${esc(t.nav.contacts)}</a></li>
</ul>
<p class="foot-contacts">${contacts.join(' · ')}</p>
<p class="note">${esc(t.footer.note)}</p>
</div></footer>`;
}

export function layout({ lang, title, description, path, alternates = null, crumbs = null, main, jsonld = [], ctaMsg, noindex = false }) {
  const t = T[lang].ui;
  const ld = [...jsonld];
  if (crumbs && crumbs.length > 1) ld.push(breadcrumbList(crumbs));
  const msg = ctaMsg || t.defaultMsg;
  return `<!doctype html>
<html lang="${lang}">
<head>
${head({ lang, title, description, path, alternates, noindex, jsonld: ld })}
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(lang, alternates)}
${crumbsHtml(lang, crumbs)}
<main id="main" class="wrap">
${main}
</main>
${footer(lang)}
<aside class="cta-bar" aria-label="${esc(t.contactLabel)}"><div class="wrap">${ctaButtons(lang, msg)}</div></aside>
</body>
</html>
`;
}
