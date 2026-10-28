import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CityCatalogSection, CityFaqSection, CityFocusSection, CityIntro, CityNearbySection } from '@/components/features/city/CitySections';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { cityParams, loadCityView } from '@/lib/city/load';
import { isCityLang } from '@/lib/city/types';
import { config } from '@/lib/config';
import { parseLang } from '@/lib/catalog/params';
import { whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbLd, faqPageLd } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/lib/seo/urls';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams(): Promise<{ lang: Lang; slug: string }[]> {
  return cityParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null || !isCityLang(lang)) return {};
  const view = await loadCityView(lang, slug);
  if (view === null) return {};
  return buildPageMetadata({
    siteUrl: config.siteUrl,
    lang,
    path: `/city/${slug}`,
    title: view.title,
    description: view.description,
    langs: ['ru', 'kk'],
  });
}

export default async function CityPage({ params }: PageProps) {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null || !isCityLang(lang)) notFound();
  const view = await loadCityView(lang, slug);
  if (view === null) notFound();
  const d = getDict(lang);
  const home = { name: d.common.breadcrumbHome, path: '/' };
  const here = { name: view.name, path: `/city/${slug}` };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([home, here].map((c) => ({ name: c.name, url: absoluteUrl(config.siteUrl, lang, c.path) }))),
          faqPageLd(view.faq),
        ]}
      />
      <CityIntro
        menuLabel={d.common.menu}
        crumbs={[home, here].map((c) => ({ name: c.name, href: localePath(lang, c.path) }))}
        h1={view.h1}
        intro={view.intro}
        remote={view.remote}
        ctaLabel={d.home.ctaWhatsapp}
        ctaHref={whatsappGeneralLink(lang)}
      />
      <CityFocusSection heading={view.focusHeading} lead={view.focusLead} items={view.focus} />
      <CityCatalogSection heading={view.catalogHeading} groups={view.catalogGroups} />
      <CityNearbySection heading={view.nearbyHeading} cities={view.nearby} />
      <CityFaqSection heading={view.faqHeading} view={view} />
    </>
  );
}
