import type { Lang } from '@/lib/i18n/locales';
import { FAQ_EN } from './content/en';
import { FAQ_KK } from './content/kk';
import { FAQ_RU } from './content/ru';

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

const FAQ_BY_LANG: Record<Lang, FaqGroup[]> = { ru: FAQ_RU, kk: FAQ_KK, en: FAQ_EN };

/** Site-wide FAQ groups for one language. Every language has the same group and item ids. */
export function getSiteFaq(lang: Lang): FaqGroup[] {
  return FAQ_BY_LANG[lang];
}

/** Eight most important items, shown on the home page in this order. */
export const HOME_FAQ_IDS: readonly string[] = [
  'pay-split',
  'price-from',
  'price-no-hidden',
  'agreement',
  'support',
  'code-owner',
  'remote-cities',
  'bot-what',
];

/** Items for the given ids, in the order of `ids`. An unknown id is logged and skipped (tests guard the ids). */
export function pickFaqItems(groups: readonly FaqGroup[], ids: readonly string[]): FaqItem[] {
  const all = groups.flatMap((group) => group.items);
  return ids.flatMap((id) => {
    const item = all.find((candidate) => candidate.id === id);
    if (item) return [item];
    console.error('[faq] unknown item id', { id });
    return [];
  });
}
