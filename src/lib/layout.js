import { config } from '../data/config.js';
import { esc } from './escape.js';
import { abs, urls, tgUrl, waUrl } from './urls.js';
import { script, breadcrumbList } from './jsonld.js';
import { T, LANGS } from './i18n.js';
import { logoInline } from './brand.js';

// Buttons: WhatsApp is primary, Telegram secondary, phone / email optional.
export function ctaButtons(lang, msg, { phone = false, mail = false } = {}) {
  const t = T[lang].ui;
  const out = [
    `<a class="btn wa" href="${esc(waUrl(msg))}" rel="noopener">${esc(t.wa)}</a>`,
    `<a class="btn tg" href="${esc(tgUrl(msg))}" rel="noopener">${esc(t.tg)}</a>`,
  ];
  if (phone) out.push(`<a class="btn ghost" href="tel:${esc(config.phone)}">${esc(t.call)}: ${esc(config.phoneDisplay)}</a>`);
  if (mail) out.push(`<a class="btn ghost" href="mailto:${esc(config.email)}">${esc(config.email)}</a>`);
  return out.join('');
}

const langsOf = (alternates) => (alternates ? LANGS.filter((l) => alternates[l]) : []);

function head({ lang, title, description, path, alternates, noindex, jsonld, extraHead }) {
  const t = T[lang];
  const alts = langsOf(alternates);
  const links = [];
  if (alts.length > 1) {
    for (const l of alts) links.push(`<link rel="alternate" hreflang="${l}" href="${abs(alternates[l])}">`);
    links.push(`<link rel="alternate" hreflang="x-default" href="${abs(alternates.ru)}">`);
  }
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
    ...alts.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${T[l].locale}">`),
    '<meta name="twitter:card" content="summary">',
    '<meta name="theme-color" content="#14213D" media="(prefers-color-scheme: light)">',
    '<meta name="theme-color" content="#0F1A2E" media="(prefers-color-scheme: dark)">',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="stylesheet" href="/assets/styles.css">',
    extraHead || '',
    ...jsonld.map(script),
  ]
    .filter(Boolean)
    .join('\n');
}

function header(lang, alternates) {
  const t = T[lang].ui;
  // Pages with a defined set of languages offer only those; others (404) offer every home page.
  const targets = LANGS.filter((l) => l !== lang && (alternates ? alternates[l] : true)).map((l) => ({
    l,
    href: alternates ? alternates[l] : urls.home(l),
  }));
  const switcher = targets
    .map((x) => `<a class="lang" href="${x.href}" hreflang="${x.l}" lang="${x.l}">${esc(T[x.l].ui.langName)}</a>`)
    .join('');
  return `<header class="site-header"><div class="wrap bar">
<a class="brand" href="${urls.home(lang)}">${logoInline()}<span>${esc(config.brand)}</span></a>
<nav class="nav" aria-label="${esc(t.menu)}">
<a href="${urls.catalog(lang)}">${esc(t.nav.catalog)}</a>
<a href="${urls.prices(lang)}">${esc(t.nav.prices)}</a>
<a href="${urls.portfolio(lang)}">${esc(t.nav.portfolio)}</a>
<a href="${urls.contacts(lang)}">${esc(t.nav.contacts)}</a>
</nav>
<div class="langs" role="group" aria-label="${esc(t.switchLabel)}">${switcher}</div>
</div></header>`;
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
  const contacts = [
    `<a href="${esc(waUrl())}" rel="noopener">WhatsApp</a>`,
    `<a href="${esc(tgUrl())}" rel="noopener">Telegram @${esc(config.telegram)}</a>`,
    `<a href="tel:${esc(config.phone)}">${esc(config.phoneDisplay)}</a>`,
    `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>`,
  ];
  return `<footer class="site-footer"><div class="wrap">
<p><strong>${esc(config.brand)}</strong> — ${esc(t.footerTagline)}</p>
<ul class="foot-links">
<li><a href="${urls.home(lang)}">${esc(t.nav.home)}</a></li>
<li><a href="${urls.catalog(lang)}">${esc(t.nav.catalog)}</a></li>
<li><a href="${urls.prices(lang)}">${esc(t.nav.prices)}</a></li>
<li><a href="${urls.portfolio(lang)}">${esc(t.nav.portfolio)}</a></li>
<li><a href="${urls.contacts(lang)}">${esc(t.nav.contacts)}</a></li>
</ul>
<p class="foot-contacts">${contacts.join(' · ')}</p>
<p class="note">${esc(t.footerNote)}</p>
</div></footer>`;
}

export function layout({ lang, title, description, path, alternates = null, crumbs = null, main, jsonld = [], ctaMsg, noindex = false, extraHead = '', bodyEnd = '' }) {
  const t = T[lang].ui;
  const ld = [...jsonld];
  if (crumbs && crumbs.length > 1) ld.push(breadcrumbList(crumbs));
  const msg = ctaMsg || T[lang].msg.general;
  return `<!doctype html>
<html lang="${lang}">
<head>
${head({ lang, title, description, path, alternates, noindex, jsonld: ld, extraHead })}
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
${bodyEnd}
</body>
</html>
`;
}
