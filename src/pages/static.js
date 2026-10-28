import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { layout, ctaButtons } from '../lib/layout.js';
import { config } from '../data/config.js';
import { esc } from '../lib/escape.js';
import { urls, tgUrl, waUrl } from '../lib/urls.js';
import { T, LANGS } from '../lib/i18n.js';
import { fmt, fromPrice, unitText } from '../lib/price.js';
import { termText } from '../lib/text.js';
import { fit, TITLE_MAX, DESC_MAX } from '../lib/fit.js';
import { products, categories, productsIn, cities, hasPortfolioImage, portfolioDir } from '../lib/data.js';
import { linkCols, faqHtml, ctaBlock, steps } from '../lib/components.js';
import { professionalService, faqPage } from '../lib/jsonld.js';
import { add } from '../lib/site.js';
import { altAll, minPriceText } from './common.js';


const crumbs = (lang, name, path) => [{ name: T[lang].ui.nav.home, path: urls.home(lang) }, { name, path }];

// Featured products on the home page: these slugs if they exist, otherwise the first product of each category.
const FEATURED = ['lending', 'telegram-bot-zapis', 'magazin-s-kaspi-xml', 'ai-assistent-telegram', 'zayavki-v-google-sheets', 'kartochka-2gis-google-maps'];
function featured() {
  const chosen = FEATURED.map((s) => products.find((p) => p.slug === s)).filter(Boolean);
  if (chosen.length >= 4) return chosen;
  const firsts = categories.map((c) => productsIn(c.slug)[0]).filter(Boolean);
  return [...new Map([...chosen, ...firsts].map((p) => [p.slug, p])).values()].slice(0, 6);
}

function home(lang) {
  const L = T[lang];
  const path = urls.home(lang);
  const cats = categories.filter((c) => productsIn(c.slug).length);
  const catLinks = cats.map((c) => ({
    href: urls.category(lang, c.slug),
    text: c.name[lang],
    hint: fromPrice(lang, Math.min(...productsIn(c.slug).map((p) => p.priceFrom))),
  }));
  const feat = featured().map((p) => ({ href: urls.product(lang, p.slug), text: p.title[lang], hint: fromPrice(lang, p.priceFrom) }));
  const facts = config.person.facts[lang].map((f) => `<li>${esc(f)}</li>`).join('');
  const cityLinks = lang === 'en' ? '' : `<section><h2>${esc(L.home.cities)}</h2><p>${esc(L.home.citiesLead)}</p>${linkCols(cities.map((c) => ({ href: urls.city(lang, c.slug), text: c[lang].name })))}</section>`;
  const cityNote = lang === 'en' ? `<p class="note">${esc(L.home.citiesLead)}</p>` : '';
  const faq = L.home.faq;
  const main = `<h1>${esc(L.home.h1)}</h1>
<p class="lead">${esc(L.home.lead)}</p>
<p class="btns">${ctaButtons(lang, L.msg.general, { phone: true })}</p>
<section><h2>${esc(L.home.cats)}</h2>${linkCols(catLinks)}</section>
${feat.length ? `<section><h2>${esc(L.home.popular)}</h2>${linkCols(feat)}<p><a href="${urls.catalog(lang)}">${esc(L.home.all)}</a></p></section>` : ''}
${steps(L.home.how, L.home.howSteps)}
<section><h2>${esc(L.home.about)}</h2><p><strong>${esc(config.person.name[lang])}</strong>, ${esc(config.person.role[lang])}.</p><ul class="ticks">${facts}</ul>
<p>${esc(L.home.stack)}: ${esc(config.stack.join(', '))}.</p></section>
${faqHtml(L.ui.faq, faq)}
${cityLinks}${cityNote}`;
  const alternates = altAll(urls.home);
  add(path, layout({
    lang, title: L.home.title, description: fit([L.home.description(minPriceText)], DESC_MAX), path, alternates, main,
    jsonld: [professionalService({ lang }), faqPage(faq)],
  }), alternates);
}

function prices(lang) {
  const L = T[lang];
  const path = urls.prices(lang);
  const sections = categories.filter((c) => productsIn(c.slug).length).map((c) => {
    const rows = productsIn(c.slug).map((p) => `<tr><th scope="row"><a href="${urls.product(lang, p.slug)}">${esc(p.title[lang])}</a></th><td class="num">${esc(fromPrice(lang, p.priceFrom))}<span class="unit"> ${esc(unitText(lang, p.unit))}</span></td><td>${esc(unitText(lang, p.unit))}</td><td>${esc(termText(lang, p) || '—')}</td></tr>`).join('');
    return `<section><h2>${esc(c.name[lang])}</h2><div class="table-wrap"><table class="prices"><thead><tr>${L.prices.cols.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></section>`;
  }).join('\n');
  const main = `<h1>${esc(L.prices.h1(minPriceText))}</h1>
<p class="lead">${esc(L.prices.lead)}</p>
${sections}
<section><h2>${esc(L.prices.pay)}</h2><p>${esc(config.legal[lang])}</p></section>
${ctaBlock(lang, L.prices.cta, L.msg.prices)}`;
  const alternates = altAll(urls.prices);
  add(path, layout({
    lang, title: fit(L.prices.title(minPriceText), TITLE_MAX), description: fit([L.prices.description(products.length, minPriceText)], DESC_MAX),
    path, alternates, crumbs: crumbs(lang, L.ui.nav.prices, path), main, ctaMsg: L.msg.prices,
  }), alternates);
}


function portfolio(lang) {
  const L = T[lang];
  const path = urls.portfolio(lang);
  const items = config.portfolio.map((p) => {
    const links = p.links.map((l) => `<a href="${esc(l.url)}" rel="noopener">${esc(l.label[lang])}</a>`).join(' · ');
    const img = hasPortfolioImage(p.slug) ? `<img src="/assets/portfolio/${p.slug}.webp" alt="${esc(L.portfolio.image(p.title[lang]))}" loading="lazy" decoding="async">` : '';
    return `<article class="work"><h2>${esc(p.title[lang])}</h2>${img}<p>${esc(p.description[lang])}</p>${p.stack.length ? `<p class="hint">${esc(p.stack.join(', '))}</p>` : ''}<p>${links}</p></article>`;
  }).join('');
  const site = `<a href="${esc(config.portfolioUrl)}" rel="noopener">${esc(config.portfolioUrl.replace('https://', ''))}</a>`;
  const gh = `<a href="${esc(config.github)}" rel="noopener">GitHub</a>`;
  const main = `<h1>${esc(L.portfolio.h1)}</h1>
<p class="lead">${L.portfolio.lead(site, gh)}</p>
${items}
<p>${esc(L.portfolio.stack)}: ${esc(config.stack.join(', '))}.</p>
${ctaBlock(lang, L.portfolio.cta, L.msg.portfolio)}`;
  const alternates = altAll(urls.portfolio);
  add(path, layout({
    lang, title: L.portfolio.title, description: L.portfolio.description, path, alternates,
    crumbs: crumbs(lang, L.ui.nav.portfolio, path), main, ctaMsg: L.msg.portfolio,
  }), alternates);
}

function contacts(lang) {
  const L = T[lang];
  const C = L.contacts;
  const path = urls.contacts(lang);
  const li = [
    `<li>${C.labels.wa}: <a href="${esc(waUrl())}" rel="noopener">${esc(C.labels.write)}</a></li>`,
    `<li>${C.labels.tg}: <a href="${esc(tgUrl())}" rel="noopener">@${esc(config.telegram)}</a></li>`,
    `<li>${C.labels.phone}: <a href="tel:${esc(config.phone)}">${esc(config.phoneDisplay)}</a></li>`,
    `<li>${C.labels.email}: <a href="mailto:${esc(config.email)}">${esc(config.email)}</a></li>`,
    `<li>${C.labels.site}: <a href="${esc(config.portfolioUrl)}" rel="noopener">${esc(config.portfolioUrl.replace('https://', ''))}</a></li>`,
    `<li>${C.labels.gh}: <a href="${esc(config.github)}" rel="noopener">RealKazbek</a></li>`,
  ].join('');
  const facts = config.person.facts[lang].map((f) => `<li>${esc(f)}</li>`).join('');
  const nx = [
    `<a href="${urls.prices(lang)}">${esc(C.nextLinks[0])}</a>`,
    `<a href="${urls.portfolio(lang)}">${esc(C.nextLinks[1])}</a>`,
    `<a href="${urls.catalog(lang)}">${esc(C.nextLinks[2])}</a>`,
  ];
  const nextHtml = C.nextText(...nx).replace(/^(<a [^>]*>)(.)/, (m, a, ch) => a + ch.toUpperCase());
  const main = `<h1>${esc(C.h1)}</h1>
<p class="lead">${esc(C.lead)}</p>
<p class="btns">${ctaButtons(lang, L.msg.general, { phone: true, mail: true })}</p>
<section><h2>${esc(C.where)}</h2><ul class="ticks">${li}</ul></section>
<section><h2>${esc(C.who)}</h2><p><strong>${esc(config.person.name[lang])}</strong>, ${esc(config.person.role[lang])}.</p><ul class="ticks">${facts}</ul></section>
<section><h2>${esc(C.legal)}</h2><p>${esc(config.legal[lang])}</p></section>
<section><h2>${esc(C.next)}</h2><p>${nextHtml}</p></section>`;
  const alternates = altAll(urls.contacts);
  add(path, layout({
    lang, title: C.title, description: C.description, path, alternates,
    crumbs: crumbs(lang, L.ui.nav.contacts, path), main, jsonld: [professionalService({ lang })],
  }), alternates);
}

function notFound() {
  const blocks = LANGS.map((l) => {
    const N = T[l].notFound;
    return `<section lang="${l}"><h2>${esc(N.h1)}</h2><p>${esc(N.text)}</p><p><a href="${urls.home(l)}">${esc(N.home)}</a> · <a href="${urls.catalog(l)}">${esc(N.catalog)}</a></p></section>`;
  }).join('\n');
  const main = `<h1>404</h1>\n${blocks}`;
  add(urls.notFound(), layout({
    lang: 'ru', title: '404: Страница не найдена | Бет табылмады | Page not found',
    description: 'Страница не найдена. Бет табылмады. Page not found. RK Dev.', path: urls.notFound(), main, noindex: true,
  }), null, { indexable: false });
}

export async function copyPortfolioImages(dist) {
  const out = join(dist, 'assets/portfolio');
  for (const p of config.portfolio) {
    if (!hasPortfolioImage(p.slug)) continue;
    await mkdir(out, { recursive: true });
    await copyFile(join(portfolioDir, `${p.slug}.webp`), join(out, `${p.slug}.webp`));
  }
}

export function buildStatic() {
  for (const lang of LANGS) {
    home(lang);
    prices(lang);
    portfolio(lang);
    contacts(lang);
  }
  notFound();
}
