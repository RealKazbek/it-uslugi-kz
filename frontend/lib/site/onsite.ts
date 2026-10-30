import { config } from '@/lib/config';
import type { Lang } from '@/lib/i18n/locales';

const VISIT: Record<Lang, string> = { ru: 'Выезд', kk: 'Шығу', en: 'On-site visit' };
const EN_NAMES: Record<string, string> = { Алматы: 'Almaty', Астана: 'Astana', Шымкент: 'Shymkent' };

/** Badge text for on-site services, e.g. "Выезд: Алматы". Cities come from ONSITE_CITIES. Server only. */
export function onsiteText(lang: Lang, cities: string[] = config.onsiteCities): string {
  const names = cities.map((name) => (lang === 'en' ? (EN_NAMES[name] ?? name) : name));
  return `${VISIT[lang]}: ${names.join(', ')}`;
}

/** True when the Russian city name is on the on-site list. */
export function isOnsiteCity(nameRu: string, cities: string[] = config.onsiteCities): boolean {
  return cities.includes(nameRu);
}
