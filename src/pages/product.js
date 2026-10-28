import { layout } from '../lib/layout.js';
import { esc } from '../lib/escape.js';
import { urls, abs } from '../lib/urls.js';
import { T, LANGS } from '../lib/i18n.js';
import { fmt, fromPrice, priceLine } from '../lib/price.js';
import { termText, endDot } from '../lib/text.js';
import { fit, TITLE_MAX, DESC_MAX } from '../lib/fit.js';
import { products, productBy, categoryBy, present } from '../lib/data.js';
import { linkCols, faqHtml, steps, estimateCard, ctaBlock } from '../lib/components.js';
import { productService, faqPage } from '../lib/jsonld.js';
import { add } from '../lib/site.js';
import { altAll } from './common.js';

function processFor(L, p) {
  return L.process[`${p.category}-${p.unit}`] || L.process[p.category] || L.process.websites;
}

function productPage(lang, p) {
  const L = T[lang];
  const path = urls.product(lang, p.slug);
  const url = abs(path);
  const cat = categoryBy[p.category];
  const title = p.title[lang];
  const term = termText(lang, p);
  const price = fromPrice(lang, p.priceFrom);

  const pageTitle = fit(L.product.title(title, lang === 'en' ? `from ${fmt(p.priceFrom)}` : fmt(p.priceFrom)), TITLE_MAX);
  const shortTxt = endDot(p.short[lang]);
  const description = fit(L.product.description(shortTxt, fmt(p.priceFrom), term, L.product.remote), DESC_MAX);

  const faq = p.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
  const msg = L.msg.product(title, url);
  const meta = [term, L.product.priceNote].filter(Boolean).join(' · ');
  const related = present(p.relatedProducts, productBy).map((s) => productBy[s]);

  const notIncl = p.notIncluded[lang].map((i) => `<li>${esc(i)}</li>`).join('');
  const main = `<h1>${esc(title)}</h1>
<p class="lead">${esc(endDot(p.description[lang]))}</p>
<p class="price-line"><strong>${esc(priceLine(lang, p.priceFrom, p.unit))}</strong>${term ? ` · ${esc(term)}` : ''}</p>
<p class="btns">${ctaPair(lang, msg)}</p>
${estimateCard(lang, { title: L.product.estimate, items: p.includes[lang], totalLabel: L.product.total, total: price, meta })}
<section><h2>${esc(L.product.forWhom)}</h2><p>${esc(endDot(p.forWhom[lang]))}</p></section>
<section><h2>${esc(L.product.notIncluded)}</h2><p>${esc(L.product.notIncludedLead)}</p><ul class="crosses">${notIncl}</ul></section>
${steps(L.product.process, processFor(L, p))}
${faqHtml(L.ui.faq, faq)}
${related.length ? `<section><h2>${esc(L.product.related)}</h2>${linkCols(related.map((r) => ({ href: urls.product(lang, r.slug), text: r.title[lang], hint: fromPrice(lang, r.priceFrom) })))}</section>` : ''}
${ctaBlock(lang, { title: L.product.ctaTitle, text: L.product.ctaText }, msg)}`;

  const alternates = altAll(urls.product, p.slug);
  const crumbs = [
    { name: L.ui.nav.home, path: urls.home(lang) },
    { name: L.ui.nav.catalog, path: urls.catalog(lang) },
    { name: cat.name[lang], path: urls.category(lang, p.category) },
    { name: title, path },
  ];
  add(
    path,
    layout({
      lang, title: pageTitle, description, path, alternates, crumbs, main, ctaMsg: msg,
      jsonld: [productService({ lang, name: title, description: endDot(p.description[lang]), price: p.priceFrom, url }), faqPage(faq)],
    }),
    alternates,
  );
}

// WhatsApp primary + Telegram secondary, as on every CTA.
import { ctaButtons } from '../lib/layout.js';
const ctaPair = (lang, msg) => ctaButtons(lang, msg);

export function buildProducts() {
  for (const lang of LANGS) for (const p of products) productPage(lang, p);
}
