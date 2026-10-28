import { T } from '../lib/i18n.js';
import { fmt, unitText, priceWithUnit } from '../lib/price.js';
import { daysText, withinText, endDot, lcName } from '../lib/text.js';
import { svcRef, nicheRef } from '../lib/refs.js';
import { nicheSite } from '../lib/niche.js';

export const present = (arr, by) => (arr || []).filter((s) => by[s]);

// Term shown for a service: one-off work has a deadline, month/lesson/hour units only a start time.
function termParts(lang, svc) {
  const t = T[lang].ui;
  const once = svc.unit === 'once';
  const days = once ? daysText(lang, svc.days) : null;
  const start = once ? null : withinText(lang, svc.days);
  const term = days ? `${t.timelineLabel}: ${days}` : start ? `${t.startLabel}: ${start}` : null;
  return { days, start, term };
}

// Context object consumed by content templates.
export function svcCityCtx(lang, svc, city) {
  const t = T[lang];
  const c = city[lang];
  const { days, start, term } = termParts(lang, svc);
  const x = {
    slug: svc.slug,
    consumer: !!svc.consumer,
    svc: svc.name[lang],
    svcL: lang === 'kk' ? lcName(svc.name.kk) : svc.name[lang],
    r: svcRef(svc.name.ru),
    loc: c.loc,
    attr: c.attr,
    name: c.name,
    gen: c.gen,
    unit: svc.unit,
    price: fmt(svc.priceFrom),
    unitTxt: unitText(lang, svc.unit),
    priceFull: priceWithUnit(lang, svc.priceFrom, svc.unit),
    days,
    start,
    term,
    context: city.context[lang],
    sectors: city.sectors[lang].join(', '),
    s0: city.sectors[lang][0],
    audience: endDot(svc.audience[lang]),
    audienceLine: `${t.ui.audience}: ${endDot(svc.audience[lang])}`,
    inPerson: !!city.inPerson,
    meet: t.meet(!!city.inPerson),
  };
  x.timeline = t.timeline(x);
  return x;
}

export function nicheCityCtx(niche, city) {
  const c = city.ru;
  const { fitting, site, price } = nicheSite(niche);
  const siteDays = site.unit === 'once' ? daysText('ru', site.days) : null;
  const t = T.ru;
  return {
    fitting,
    site,
    x: {
      forRu: niche.forRu,
      loc: c.loc,
      attr: c.attr,
      name: c.name,
      gen: c.gen,
      svc: `сайт для ${niche.forRu}`,
      r: nicheRef(niche.forRu),
      price: fmt(price),
      cheapest: site.name.ru,
      cheapestRef: svcRef(site.name.ru).nom,
      cheapestDays: siteDays,
      context: city.context.ru,
      sectors: city.sectors.ru.join(', '),
      s0: city.sectors.ru[0],
      audience: endDot(site.audience.ru),
      audienceLine: `${t.ui.audience}: ${endDot(site.audience.ru)}`,
      inPerson: !!city.inPerson,
      feature0: endDot(niche.features[0]),
      meet: t.meet(!!city.inPerson),
    },
  };
}

