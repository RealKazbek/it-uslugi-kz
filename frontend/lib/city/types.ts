import type { Lang } from '@/lib/i18n/locales';

/** Languages that have city pages. en is never a city language. */
export type CityLang = Exclude<Lang, 'en'>;

export const CITY_LANGS: readonly CityLang[] = ['ru', 'kk'];

export function isCityLang(lang: Lang): lang is CityLang {
  return lang !== 'en';
}
