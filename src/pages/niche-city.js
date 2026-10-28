import { layout } from '../lib/layout.js';
import { esc } from '../lib/escape.js';
import { urls, abs } from '../lib/urls.js';
import { pick } from '../lib/hash.js';
import { fmt, priceWithUnit } from '../lib/price.js';
import { T } from '../lib/i18n.js';
import { niches, cities, cityBy, nicheBy } from '../lib/data.js';
import { linkCols, faqHtml, steps, ctaBlock } from '../lib/components.js';
import { professionalService, offer, faqPage } from '../lib/jsonld.js';
import { add } from '../lib/site.js';
import { nicheCityCtx, present } from './ctx.js';
import { cap } from '../lib/text.js';

const t = T.ru;

export function buildNicheCity(niche, city) {
  const path = urls.nicheCity(niche.slug, city.slug);
  const { x, fitting, site } = nicheCityCtx(niche, city);
  const seed = path;
  const sel = (arr, salt) => pick(arr, seed, salt);

  const faqItems = [...t.niche.faq(x), sel(t.cityFaq1(x), 'cf1'), sel(t.nicheCityFaq(x), 'cf2')];
  const msg = `Здравствуйте! Нужен сайт для ${niche.forRu} ${city.ru.loc} (от ${x.price}). Хочу обсудить задачу.`;
  const title = t.niche.title(x);
  const description = sel(t.niche.meta(x), 'meta');

  const svcLinks = fitting.map((s) => ({
    href: urls.serviceCity('ru', s.slug, city.slug),
    text: `${s.name.ru} ${city.ru.loc}`,
    hint: `от ${priceWithUnit('ru', s.priceFrom, s.unit)}`,
  }));
  const features = niche.features.map((f) => `<li>${esc(f)}</li>`).join('');
  const focus = present(city.nicheFocus, nicheBy).filter((n) => n !== niche.slug).map((n) => ({
    href: urls.nicheCity(n, city.slug),
    text: `Сайт для ${nicheBy[n].forRu} ${city.ru.loc}`,
  }));
  const near = present(city.nearby, cityBy).map((c) => ({
    href: urls.nicheCity(niche.slug, c),
    text: `Сайт для ${niche.forRu} ${cityBy[c].ru.loc}`,
  }));

  const main = `<h1>${esc(t.niche.h1(x))}</h1>
<p class="lead">${esc(sel(t.niche.intro(x), 'intro'))}</p>
<p class="audience">${esc(x.audienceLine)}</p>
<section><h2>Что учесть ${esc(city.ru.loc)}</h2><p>${esc(sel(t.niche.local(x), 'local'))}</p></section>
<section><h2>Что нужно на сайте для ${esc(niche.forRu)}</h2><ul class="ticks">${features}</ul></section>
<section><h2>Какие услуги подойдут</h2>${linkCols(svcLinks)}</section>
<section class="qa"><h2>Вопрос клиентов</h2><p><strong>${esc(niche.question)}</strong></p><p>${esc(niche.answer)}</p></section>
${steps(t.ui.process, sel(t.process(x), 'proc'))}
${faqHtml(t.ui.faq, faqItems)}
${focus.length ? `<section><h2>Сайты для других ниш ${esc(city.ru.loc)}</h2>${linkCols(focus)}</section>` : ''}
${near.length ? `<section><h2>Сайт для ${esc(niche.forRu)} в соседних городах</h2>${linkCols(near)}</section>` : ''}
${ctaBlock('ru', sel(t.cta(x), 'cta'), msg)}`;

  const crumbs = [
    { name: t.ui.nav.home, path: '/' },
    { name: t.ui.nav.niches, path: urls.nicheIndex() },
    { name: cap(niche.name.ru), path: urls.nicheHub(niche.slug) },
    { name: city.ru.name, path },
  ];
  const jsonld = [
    professionalService({
      lang: 'ru',
      cityName: city.ru.name,
      offers: [offer({ name: `Сайт для ${niche.forRu}`, price: site.priceFrom, cityName: city.ru.name, url: abs(path) })],
    }),
    faqPage(faqItems),
  ];
  add(path, layout({ lang: 'ru', title, description, path, crumbs, main, jsonld, ctaMsg: msg }));
}

export function buildAllNicheCity() {
  for (const n of niches) for (const c of cities) buildNicheCity(n, c);
}
