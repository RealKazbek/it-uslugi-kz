import type { Metadata } from 'next';
import type { Lang } from '@/lib/i18n/locales';
import { DESCRIPTION_MAX, TITLE_MAX, fit } from './fit';
import { absoluteUrl, hreflangMap } from './urls';

const OG_LOCALE: Record<Lang, string> = { ru: 'ru_RU', kk: 'kk_KZ', en: 'en_US' };
const SITE_NAME = 'RK Dev';

export interface PageSeoInput {
  siteUrl: string;
  lang: Lang;
  path: string;
  title: string;
  description: string;
  /** Languages where this page exists (drives hreflang and og:locale:alternate). */
  langs: readonly Lang[];
}

/** Metadata for one page: unique title and description, canonical, hreflang, OpenGraph, Twitter summary. */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const title = fit(input.title, TITLE_MAX);
  const description = fit(input.description, DESCRIPTION_MAX);
  const canonical = absoluteUrl(input.siteUrl, input.lang, input.path);
  const otherLocales = input.langs.filter((l) => l !== input.lang).map((l) => OG_LOCALE[l]);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangMap(input.siteUrl, input.path, input.langs),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[input.lang],
      alternateLocale: otherLocales,
      type: 'website',
    },
    twitter: { card: 'summary', title, description },
  };
}
