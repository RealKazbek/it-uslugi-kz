import type { CardGroup } from '@/lib/catalog/cards';
import { priceText } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import type { QA } from '@/lib/i18n/dict/types';
import { localePath } from '@/lib/i18n/paths';
import type { CityDto } from '@/types/api';
import type { CityLang } from './types';

export interface FocusItem {
  href: string;
  title: string;
  priceText: string;
  reason: string;
}

export interface CatalogLinkGroup {
  name: string;
  items: { href: string; title: string; priceText: string }[];
}

export interface CityView {
  slug: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  remote: string;
  focusHeading: string;
  focusLead: string;
  focus: FocusItem[];
  catalogHeading: string;
  catalogGroups: CatalogLinkGroup[];
  nearbyHeading: string;
  nearby: { href: string; name: string }[];
  faqHeading: string;
  faq: QA[];
}

export interface CityViewInput {
  dto: CityDto;
  lang: CityLang;
  rate: number;
  catalog: CardGroup[];
  minPriceKzt: number | null;
}

/** Everything a city page shows. Pure: all data comes in through the input. */
export function buildCityView(input: CityViewInput): CityView {
  const { dto, lang, rate } = input;
  const d = getDict(lang).city;
  const gen = dto.gen;
  const attr = dto.attr;
  const formName = lang === 'ru' ? (gen ?? dto.name) : (attr ?? dto.name);
  const forms = { loc: dto.loc, gen: gen ?? dto.name, attr: attr ?? dto.name };
  const minText = input.minPriceKzt === null ? '' : priceText(lang, input.minPriceKzt, rate);
  const focus = dto.product_focus.map((p) => ({
    href: localePath(lang, `/products/${p.slug}`),
    title: p.title,
    priceText: priceText(lang, p.price_from_kzt, rate),
    reason: dto.focus_why[p.slug] ?? '',
  }));
  const first = focus.find((item) => item.reason !== '');
  return {
    slug: dto.slug,
    name: dto.name,
    h1: d.h1(forms),
    title: d.title(formName),
    description: d.description(forms, minText),
    intro: d.intro(dto.market_context, dto.sectors),
    remote: d.remote,
    focusHeading: d.focusHeading,
    focusLead: d.focusLead,
    focus,
    catalogHeading: d.catalogHeading(formName),
    catalogGroups: input.catalog.map((group) => ({
      name: group.name,
      items: group.cards.map((card) => ({ href: card.href, title: card.title, priceText: card.priceText })),
    })),
    nearbyHeading: d.nearbyHeading,
    nearby: dto.nearby.map((n) => ({
      href: localePath(lang, `/city/${n.slug}`),
      name: lang === 'ru' ? n.name_ru : n.name_kk,
    })),
    faqHeading: d.faqHeading,
    faq: d.faq({
      ...forms,
      sectors: dto.sectors,
      inPerson: dto.in_person,
      titles: dto.product_focus.map((p) => p.title),
      example: first ? { title: first.title, reason: first.reason } : null,
    }),
  };
}
