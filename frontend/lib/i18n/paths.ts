import { DEFAULT_LANG, isLang, LANGS, type Lang } from './locales';

/**
 * Public URL for a page in a language. ru has no prefix; kk and en get /kk and /en.
 * `path` is a site path such as "/", "/catalog" or "/products/lending". No trailing slash in output.
 */
export function localePath(lang: Lang, path: string): string {
  const clean = normalizePath(path);
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  if (clean === '/') return prefix === '' ? '/' : prefix;
  return `${prefix}${clean}`;
}

/** Map of language -> URL for hreflang. Only the languages passed in are returned. */
export function alternates(path: string, langs: readonly Lang[]): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const lang of langs) out[lang] = localePath(lang, path);
  return out;
}

/** Splits a pathname that may start with a language segment. */
export function splitLocale(pathname: string): { lang: Lang | null; rest: string } {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first !== undefined && isLang(first)) {
    const rest = `/${segments.slice(1).join('/')}`;
    return { lang: first, rest: normalizePath(rest) };
  }
  return { lang: null, rest: normalizePath(pathname) };
}

export function normalizePath(path: string): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withSlash.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export const SUPPORTED_LANGS: readonly Lang[] = LANGS;
