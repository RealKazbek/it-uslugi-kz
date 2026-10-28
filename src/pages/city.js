import { layout } from '../lib/layout.js';
import { esc } from '../lib/escape.js';
import { urls } from '../lib/urls.js';
import { T } from '../lib/i18n.js';
import { fmt, fromPrice } from '../lib/price.js';
import { pickMany } from '../lib/hash.js';
import { fit, TITLE_MAX, DESC_MAX } from '../lib/fit.js';
import { products, categories, productsIn, cities, cityBy, productBy, present } from '../lib/data.js';
import { linkCols, faqHtml, ctaBlock } from '../lib/components.js';
import { professionalService, faqPage } from '../lib/jsonld.js';
import { add } from '../lib/site.js';
import { altSome, minPrice } from './common.js';

const CITY_LANGS = ['ru', 'kk'];

function cityPage(lang, c) {
  const L = T[lang];
  const path = urls.city(lang, c.slug);
  const focus = present(c.productFocus, productBy).map((s) => productBy[s]);
  const titles = focus.slice(0, 3).map((p) => p.title[lang]);
  const faq = L.city.faq(c, titles);
  const nearby = present(c.nearby, cityBy).map((s) => cityBy[s]);

  // Category order and product order inside a category vary per city (deterministic), so the shared catalog text differs.
  const cats = categories.filter((cat) => productsIn(cat.slug).length);
  const groups = pickMany(cats, cats.length, `${lang}/${c.slug}`, 'cats')
    .map((cat) => `<h3>${esc(cat.name[lang])}</h3>${linkCols(pickMany(productsIn(cat.slug), 99, `${lang}/${c.slug}`, cat.slug).map((p) => ({ href: urls.product(lang, p.slug), text: p.title[lang], hint: fromPrice(lang, p.priceFrom) })))}`)
    .join('\n');

  const main = `<h1>${esc(L.city.h1(c))}</h1>
<p class="lead">${esc(L.city.lead(c))}</p>
<p>${esc(L.city.remote(c))}</p>
${focus.length ? `<section><h2>${esc(L.city.focus(c))}</h2><ul class="focus">${focus.map((p) => `<li><a href="${urls.product(lang, p.slug)}">${esc(p.title[lang])}</a> <span class="hint">${esc(fromPrice(lang, p.priceFrom))}</span><br>${esc(p.description[lang])}</li>`).join('')}</ul></section>` : ''}
<section><h2>${esc(L.city.all(c))}</h2>${groups}</section>
${faqHtml(L.ui.faq, faq)}
${nearby.length ? `<section><h2>${esc(L.city.nearby)}</h2>${linkCols(nearby.map((n) => ({ href: urls.city(lang, n.slug), text: n[lang].name })))}</section>` : ''}
${ctaBlock(lang, { title: L.product.ctaTitle, text: L.product.ctaText.split(':')[0] + '.' }, L.msg.city(c))}`;

  const alternates = altSome(CITY_LANGS, urls.city, c.slug);
  const crumbs = [{ name: L.ui.nav.home, path: urls.home(lang) }, { name: c[lang].name, path }];
  add(path, layout({
    lang,
    title: fit(L.city.title(c), TITLE_MAX),
    description: fit(L.city.description(c, products.length, fmt(minPrice)), DESC_MAX),
    path, alternates, crumbs, main, ctaMsg: L.msg.city(c),
    jsonld: [professionalService({ lang, cityName: c.ru.name }), faqPage(faq)],
  }), alternates);
}

export function buildCities() {
  for (const lang of CITY_LANGS) for (const c of cities) cityPage(lang, c);
}
