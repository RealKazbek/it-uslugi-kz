import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/features/home/Hero';
import {
  AboutSection,
  CitiesSection,
  CtaSection,
  CategoriesSection,
  FaqSection,
  FeaturedSection,
  HowSection,
} from '@/components/features/home/HomeSections';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { getCities } from '@/lib/api/cities';
import { loadCatalog } from '@/lib/catalog/load';
import { parseLang } from '@/lib/catalog/params';
import { isCityLang } from '@/lib/city/types';
import { config } from '@/lib/config';
import { priceText } from '@/lib/format/price';
import { whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { legal } from '@/lib/site/legal';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { faqPageLd, professionalServiceLd } from '@/lib/seo/jsonld';

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
  const d = getDict(lang).home;
  return buildPageMetadata({ siteUrl: config.siteUrl, lang, path: '/', title: d.title, description: d.description(min), langs: LANGS });
}

async function citiesFor(lang: Lang): Promise<{ href: string; name: string }[]> {
  if (!isCityLang(lang)) return [];
  return (await getCities(lang)).map((c) => ({ href: localePath(lang, `/city/${c.slug}`), name: c.name }));
}

export default async function HomePage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const catalog = await loadCatalog(lang);
  const featured = catalog.groups.flatMap((group) => (group.cards[0] ? [group.cards[0]] : []));
  const faq = [...d.home.faq, { q: d.home.legalQuestion, a: legal[lang] }];
  const cities = await citiesFor(lang);

  return (
    <>
      <JsonLd data={[professionalServiceLd(config.siteUrl), faqPageLd(faq)]} />
      <Container>
        <Hero lang={lang} />
      </Container>
      <CategoriesSection
        title={d.home.catsHeading}
        categories={catalog.categories.filter((c) => c.productCount > 0)}
        hrefFor={(slug) => localePath(lang, `/catalog/${slug}`)}
        countLabel={d.catalog.countLabel}
      />
      <FeaturedSection title={d.home.popularHeading} allLabel={d.home.allCatalog} allHref={localePath(lang, '/catalog')} cards={featured} />
      <HowSection title={d.home.howHeading} steps={d.home.howSteps} />
      <AboutSection title={d.home.aboutHeading} facts={d.home.aboutFacts} />
      <FaqSection title={d.home.faqHeading} items={faq} />
      <CitiesSection title={d.home.citiesHeading} lead={d.home.citiesLead} cities={cities} />
      <CtaSection title={d.home.ctaTitle} text={d.home.ctaText} label={d.home.ctaWhatsapp} href={whatsappGeneralLink(lang)} />
    </>
  );
}
