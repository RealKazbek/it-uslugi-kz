import { isLang, type Lang } from '@/lib/i18n/locales';

/** Validates the `lang` query parameter of the search index route. Null means reject with 400. */
export function parseSearchLang(value: string | null | undefined): Lang | null {
  return typeof value === 'string' && isLang(value) ? value : null;
}
