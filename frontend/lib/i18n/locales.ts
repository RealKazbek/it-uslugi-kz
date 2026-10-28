export const LANGS = ['ru', 'kk', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'ru';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** Value for <html lang>. Matches the locale code of each language. */
export const HTML_LANG: Record<Lang, string> = { ru: 'ru', kk: 'kk', en: 'en' };
