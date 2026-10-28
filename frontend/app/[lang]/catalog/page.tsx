import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogBrowser } from '@/components/features/catalog/CatalogBrowser';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { loadCatalog } from '@/lib/catalog/load';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { priceText } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { LANGS } from '@/lib/i18n/locales';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/urls';
import { breadcrumbLd } from '@/lib/seo/jsonld';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = parseLang((await params).lang);
  if (lang === null) return {};
  const catalog = await loadCatalog(lang);
  const min = catalog.minPriceKzt === null ? '' : priceText(lang, catalog.minPriceKzt, config.usdRate);
  const d = getDict(lang).catalog;
  return buildPageMetadata({ siteUrl: config.siteUrl, lang, path: '/catalog', title: d.title, description: d.description(catalog.cards.length, min), langs: LANGS });
}

export default async function CatalogPage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang).catalog;
  const catalog = await loadCatalog(lang);

  const crumbs = [
    { name: getDict(lang).common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') },
    { name: d.h1, url: absoluteUrl(config.siteUrl, lang, '/catalog') },
  ];
  return (
    <>
    <JsonLd data={breadcrumbLd(crumbs)} />
    <Section>
      <Container className="space-y-6">
        <h1 className="text-[1.9rem] md:text-[2.4rem]">{d.h1}</h1>
        <p className="max-w-prose text-lg text-muted">{d.lead}</p>
        <CatalogBrowser lang={lang} groups={catalog.groups} />
      </Container>
    </Section>
    </>
  );
}
