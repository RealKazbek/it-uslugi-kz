import { localePath } from '@/lib/i18n/paths';
import type { Lang } from '@/lib/i18n/locales';

/** Absolute URL on the public site for a localized page path. */
export function absoluteUrl(siteUrl: string, lang: Lang, path: string): string {
  return `${siteUrl}${localePath(lang, path)}`;
}

/** hreflang map for the languages where the page exists, plus x-default -> ru when ru exists. */
export function hreflangMap(siteUrl: string, path: string, langs: readonly Lang[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const lang of langs) map[lang] = absoluteUrl(siteUrl, lang, path);
  if (langs.includes('ru')) map['x-default'] = absoluteUrl(siteUrl, 'ru', path);
  return map;
}
