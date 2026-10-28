import { layout } from '../lib/layout.js';
import { esc } from '../lib/escape.js';
import { urls } from '../lib/urls.js';
import { T, LANGS } from '../lib/i18n.js';
import { fmt } from '../lib/price.js';
import { fit, TITLE_MAX, DESC_MAX } from '../lib/fit.js';
import { products, categories, productsIn } from '../lib/data.js';
import { linkCols, productCard, ctaBlock } from '../lib/components.js';
import { add } from '../lib/site.js';
import { altAll, minPriceText } from './common.js';

const usedCategories = () => categories.filter((c) => productsIn(c.slug).length);

function catalog(lang) {
  const L = T[lang];
  const path = urls.catalog(lang);
  const cats = usedCategories();
  const attr = (s) => esc(s);
  const catsJson = esc(JSON.stringify(cats.map((c) => ({ slug: c.slug, name: c.name[lang] }))));
  const main = `<h1>${esc(L.catalog.h1)}</h1>
<p class="lead">${esc(L.catalog.lead)}</p>
<section><h2>${esc(L.catalog.categories)}</h2>${linkCols(cats.map((c) => ({ href: urls.category(lang, c.slug), text: c.name[lang] })))}</section>
<section data-catalog data-cats="${catsJson}" data-label-cat="${attr(L.catalog.filterLabel)}" data-label-all="${attr(L.catalog.filterAll)}" data-label-search="${attr(L.catalog.searchLabel)}" data-placeholder="${attr(L.catalog.searchPlaceholder)}" data-empty="${attr(L.catalog.empty)}">
<p class="note">${esc(L.catalog.count(products.length))}</p>
<ul class="grid">${products.map((p) => productCard(lang, p)).join('\n')}</ul>
</section>
${ctaBlock(lang, { title: L.product.ctaTitle, text: L.product.ctaText.split(':')[0] + '.' }, L.msg.general)}`;
  const alternates = altAll(urls.catalog);
  const crumbs = [{ name: L.ui.nav.home, path: urls.home(lang) }, { name: L.ui.nav.catalog, path }];
  add(path, layout({
    lang, title: L.catalog.title, description: fit([L.catalog.description(products.length, minPriceText)], DESC_MAX), path, alternates, crumbs, main,
    bodyEnd: '<script src="/assets/catalog.js" defer></script>',
  }), alternates);
}

function hub(lang, c) {
  const L = T[lang];
  const path = urls.category(lang, c.slug);
  const list = productsIn(c.slug);
  const min = fmt(Math.min(...list.map((p) => p.priceFrom)));
  const others = usedCategories().filter((x) => x.slug !== c.slug);
  const main = `<h1>${esc(L.hub.h1(c))}</h1>
<p class="lead">${esc(c.intro[lang])}</p>
<section><h2>${esc(L.hub.list)}</h2><ul class="grid">${list.map((p) => productCard(lang, p)).join('\n')}</ul></section>
<section><h2>${esc(L.hub.others)}</h2>${linkCols(others.map((o) => ({ href: urls.category(lang, o.slug), text: o.name[lang] })))}</section>
${ctaBlock(lang, { title: L.product.ctaTitle, text: L.product.ctaText.split(':')[0] + '.' }, L.msg.general)}`;
  const alternates = altAll(urls.category, c.slug);
  const crumbs = [{ name: L.ui.nav.home, path: urls.home(lang) }, { name: L.ui.nav.catalog, path: urls.catalog(lang) }, { name: c.name[lang], path }];
  add(path, layout({
    lang, title: fit(L.hub.title(c), TITLE_MAX), description: fit([L.hub.description(c, min)], DESC_MAX), path, alternates, crumbs, main,
  }), alternates);
}

export function buildCatalog() {
  for (const lang of LANGS) {
    catalog(lang);
    for (const c of usedCategories()) hub(lang, c);
  }
}
