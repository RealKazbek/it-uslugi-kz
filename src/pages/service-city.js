import { layout } from '../lib/layout.js';
import { esc } from '../lib/escape.js';
import { urls, abs } from '../lib/urls.js';
import { pick, pickMany } from '../lib/hash.js';
import { fmt } from '../lib/price.js';
import { T } from '../lib/i18n.js';
import { services, cities, serviceBy, cityBy, nicheBy } from '../lib/data.js';
import { linkCols, estimateCard, faqHtml, steps, ctaBlock } from '../lib/components.js';
import { professionalService, offer, faqPage } from '../lib/jsonld.js';
import { add } from '../lib/site.js';
import { lcName, cap } from '../lib/text.js';
import { svcCityCtx, present } from './ctx.js';
import { fit, TITLE_MAX } from '../lib/fit.js';

// Services that make sense to suggest to a private person or a small office (consumer pages).
const CONSUMER_SUGGEST = ['sait-vizitka', 'lending', 'telegram-bot', 'domen-hosting-ssl', 'ispravlenie-oshibok', 'podderzhka-saita', 'avtomatizaciya'];

// Kazakh: city attributive form + lowercase service name ("Оралдағы лендинг").
const kkPhrase = (c, name) => `${c.kk.attr} ${lcName(name)}`;

function nicheLinks(svc, city) {
  const own = present(svc.niches, nicheBy);
  const focus = new Set(city.nicheFocus || []);
  let ids = own.filter((n) => focus.has(n));
  for (const n of own) if (ids.length < 4 && !ids.includes(n)) ids.push(n);
  return ids.slice(0, 6);
}

export function buildServiceCity(lang, svc, city) {
  const t = T[lang];
  const path = urls.serviceCity(lang, svc.slug, city.slug);
  const x = svcCityCtx(lang, svc, city);
  const seed = path;
  const sel = (fn, salt) => pick(fn(x), seed, salt);

  const shownFaq = pickMany(svc.faq, Math.min(3, svc.faq.length), seed, 'sfaq').map((f) => ({ q: f.q[lang], a: f.a[lang] }));
  const cityFaq = [sel(t.cityFaq1, 'cf1'), sel(t.cityFaq2, 'cf2')];
  const faqItems = [...cityFaq, ...shownFaq];

  const msg = t.msg(x);
  const short = { ...x, svc: x.svcShort, svcL: x.svcShortL };
  const noBrand = (s) => s.replace(/ \| RK Dev$/, '');
  const title = fit([t.title(x), t.title(short), noBrand(t.title(x)), noBrand(t.title(short))], TITLE_MAX);
  const description = sel(t.meta, 'meta');
  const h1 = t.h1(x);

  const nicheNote = lang === 'kk' ? `<p class="note">Салалар беттері орыс тілінде.</p>` : '';
  let localLinks;
  if (svc.consumer) {
    // Private-person services have no business niches: link to other services in the same city instead.
    const skip = new Set([svc.slug, ...(svc.related || [])]);
    const others = services.filter((o) => CONSUMER_SUGGEST.includes(o.slug) && !skip.has(o.slug));
    localLinks = pickMany(others, Math.min(4, others.length), seed, 'cl').map((o) => ({
      href: urls.serviceCity(lang, o.slug, city.slug),
      text: lang === 'kk' ? kkPhrase(city, o.name.kk) : `${o.name.ru} ${city.ru.loc}`,
    }));
  } else {
    localLinks = nicheLinks(svc, city).map((n) => ({
      href: urls.nicheCity(n, city.slug),
      text: `Сайт для ${nicheBy[n].forRu} ${city.ru.loc}`,
      lang: lang === 'kk' ? 'ru' : undefined,
    }));
  }

  const rel = present(svc.related, serviceBy).map((s) => serviceBy[s]).map((s) => ({
    href: urls.serviceCity(lang, s.slug, city.slug),
    text: lang === 'kk' ? kkPhrase(city, s.name.kk) : `${s.name.ru} ${city.ru.loc}`,
    hint: lang === 'ru' ? `от ${fmt(s.priceFrom)}` : `${fmt(s.priceFrom)} бастап`,
  }));
  const near = present(city.nearby, cityBy).map((c) => cityBy[c]).map((c) => ({
    href: urls.serviceCity(lang, svc.slug, c.slug),
    text: lang === 'kk' ? kkPhrase(c, svc.name.kk) : `${svc.name.ru} ${c.ru.loc}`,
  }));

  const ruRel = lang === 'ru';
  const hRel = ruRel ? `Другие услуги ${city.ru.loc}` : `${city.kk.attr} басқа қызметтер`;
  const hNear = ruRel ? `«${svc.name.ru}» в соседних городах` : `«${cap(x.svcL)}» қызметі жақын қалаларда`;
  const hLocal = svc.consumer ? t.ui.localPeople(city[lang].loc) : t.ui.localBiz(city[lang].loc);
  const hEst = ruRel ? `Смета: ${svc.name.ru} ${city.ru.loc}` : `Смета: ${kkPhrase(city, svc.name.kk)}`;

  const card = estimateCard(lang, {
    title: hEst,
    items: svc.included[lang],
    total: lang === 'ru' ? `от ${x.price}` : `${x.price} бастап`,
    meta: `${x.unitTxt}${x.term ? ` · ${x.term}` : ''}`,
  });

  const cta = sel(t.cta, 'cta');
  const main = `<h1>${esc(h1)}</h1>
<p class="lead">${esc(sel(t.intro, 'intro'))}</p>
${card}
<p class="audience">${esc(x.audienceLine)}</p>
${localLinks.length ? `<section><h2>${esc(hLocal)}</h2><p>${esc(sel(t.local, 'local'))}</p>${linkCols(localLinks)}${svc.consumer ? '' : nicheNote}</section>` : ''}
${steps(t.ui.process, sel(t.process, 'proc'))}
<section><h2>${esc(t.ui.priceTime)}</h2><p>${esc(sel(t.price, 'price'))}</p></section>
${faqHtml(t.ui.faq, faqItems)}
${rel.length ? `<section><h2>${esc(hRel)}</h2>${linkCols(rel)}</section>` : ''}
${near.length ? `<section><h2>${esc(hNear)}</h2>${linkCols(near)}</section>` : ''}
${ctaBlock(lang, cta, msg)}`;

  const alternates = { ru: urls.serviceCity('ru', svc.slug, city.slug), kk: urls.serviceCity('kk', svc.slug, city.slug) };
  const crumbs = [
    { name: t.ui.nav.home, path: urls.home(lang) },
    { name: svc.name[lang], path: urls.serviceHub(lang, svc.slug) },
    { name: city[lang].name, path },
  ];
  const jsonld = [
    professionalService({
      lang,
      cityName: city[lang].name,
      offers: [offer({ name: svc.name[lang], price: svc.priceFrom, cityName: city[lang].name, url: abs(path) })],
    }),
    faqPage(faqItems),
  ];
  add(path, layout({ lang, title, description, path, alternates, crumbs, main, jsonld, ctaMsg: msg }), alternates);
}

export function buildAllServiceCity() {
  for (const lang of ['ru', 'kk']) for (const s of services) for (const c of cities) buildServiceCity(lang, s, c);
}
