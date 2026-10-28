import { LANGS, isLang, type Lang } from '@/lib/i18n/locales';

/** Parses the [lang] route segment; null means the page must return 404. */
export function parseLang(value: string): Lang | null {
  return isLang(value) ? value : null;
}

export function langParams(): { lang: Lang }[] {
  return LANGS.map((lang) => ({ lang }));
}
