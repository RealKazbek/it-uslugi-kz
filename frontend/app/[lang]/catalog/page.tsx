import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogBrowser } from '@/components/features/catalog/CatalogBrowser';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { cardLabels } from '@/components/features/catalog/ProductCard';
import { loadCatalog } from '@/lib/catalog/load';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { whatsappGeneralLink } from '@/lib/format/links';
import { localePath } from '@/lib/i18n/paths';
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
  const dict = getDict(lang);
  const d = dict.catalog;
  const catalog = await loadCatalog(lang);
  const labels = {
    filterAll: d.filterAll,
    filterLabel: d.filterLabel,
    searchLabel: d.searchLabel,
    searchPlaceholder: d.searchPlaceholder,
    empty: d.empty,
    sortLabel: d.sortLabel,
    sorts: d.sorts,
    results: Array.from({ length: catalog.cards.length + 1 }, (_, n) => d.results(n)),
    reset: d.reset,
    whatsapp: dict.common.cta.whatsapp,
    card: cardLabels(dict),
  };

  const crumbs = [
    { name: getDict(lang).common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') },
    { name: d.h1, url: absoluteUrl(config.siteUrl, lang, '/catalog') },
  ];
  return (
    <>
    <JsonLd data={breadcrumbLd(crumbs)} />
    <Section className="py-8 md:py-12">
      <Container className="space-y-6">
        <header className="space-y-3">
          <Breadcrumbs
            label={dict.common.menu}
            items={[{ name: dict.common.breadcrumbHome, href: localePath(lang, '/') }, { name: d.h1, href: localePath(lang, '/catalog') }]}
          />
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{d.h1}</h1>
          <p className="max-w-prose text-lg text-muted-foreground">{d.lead}</p>
        </header>
        <CatalogBrowser
          labels={labels}
          cards={catalog.cards}
          categories={catalog.categories.filter((c) => c.productCount > 0).map((c) => ({ slug: c.slug, name: c.name }))}
          whatsappHref={whatsappGeneralLink(lang)}
        />
      </Container>
    </Section>
    </>
  );
}
