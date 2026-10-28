import { T } from '../lib/i18n.js';
import { fmt, unitText, priceWithUnit } from '../lib/price.js';
import { daysText, endDot } from '../lib/text.js';
import { cityBy, serviceBy, nicheBy } from '../lib/data.js';

export const present = (arr, by) => (arr || []).filter((s) => by[s]);

// Context object consumed by content templates.
export function svcCityCtx(lang, svc, city) {
  const t = T[lang];
  const c = city[lang];
  const days = daysText(lang, svc.days);
  const sectors = city.sectors[lang].join(', ');
  const x = {
    svc: svc.name[lang],
    loc: c.loc,
    attr: c.attr,
    name: c.name,
    unit: svc.unit,
    price: fmt(svc.priceFrom),
    unitTxt: unitText(lang, svc.unit),
    priceFull: priceWithUnit(lang, svc.priceFrom, svc.unit),
    days,
    context: city.context[lang],
    sectors,
    s0: city.sectors[lang][0],
    audience: svc.audience[lang],
    audienceSentence: `${t.ui.audience}: ${endDot(svc.audience[lang])}`,
    inPerson: !!city.inPerson,
    meet:
      lang === 'ru'
        ? city.inPerson ? 'встреча в Алматы или созвон' : 'созвон или переписка в Telegram'
        : city.inPerson ? 'Алматыда жүзбе-жүз кездесу немесе қоңырау' : 'қоңырау немесе Telegram-дағы хат алмасу',
  };
  x.timeline = t.timeline(x);
  return x;
}

export function nicheCityCtx(niche, city) {
  const c = city.ru;
  const fitting = present(niche.services, serviceBy).map((s) => serviceBy[s]);
  const minPrice = Math.min(...fitting.map((s) => s.priceFrom));
  const cheapest = fitting.find((s) => s.priceFrom === minPrice);
  return {
    fitting,
    x: {
      forRu: niche.forRu,
      loc: c.loc,
      attr: c.attr,
      name: c.name,
      svc: `сайт для ${niche.forRu}`,
      price: fmt(minPrice),
      cheapest: cheapest.name.ru,
      cheapestDays: cheapest.unit === 'once' ? daysText('ru', cheapest.days) : null,
      context: city.context.ru,
      sectors: city.sectors.ru.join(', '),
      s0: city.sectors.ru[0],
      audienceSentence: `Кому подходит: ${endDot(cheapest.audience.ru)}`,
      inPerson: !!city.inPerson,
      feature0: endDot(niche.features[0]),
      meet: city.inPerson ? 'встреча в Алматы или созвон' : 'созвон или переписка в Telegram',
    },
  };
}
