import { ratingText } from '@/lib/reviews/rating';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/features/home/Hero';
import { CategoriesSection } from '@/components/features/home/CategoriesSection';
import { ChannelsStrip } from '@/components/features/home/ChannelsStrip';
import { CitiesSection } from '@/components/features/home/CitiesSection';
import { CtaSection } from '@/components/features/home/CtaSection';
import { FaqSection } from '@/components/features/home/FaqSection';
import { HowSection } from '@/components/features/home/HowSection';
import { ReviewsSection } from '@/components/features/home/ReviewsSection';
import { PopularSection } from '@/components/features/home/PopularSection';
import { PricesSection } from '@/components/features/home/PricesSection';
import { TrustSection } from '@/components/features/home/TrustSection';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { getReviewsSafe } from '@/lib/api/reviews';
import { cardLabels } from '@/components/features/catalog/ProductCard';
import { getCities } from '@/lib/api/cities';
import { loadCatalog } from '@/lib/catalog/load';
import { priceRows } from '@/lib/catalog/minPrices';
import { parseLang } from '@/lib/catalog/params';
import { isCityLang } from '@/lib/city/types';
import { config } from '@/lib/config';
import { priceText } from '@/lib/format/price';
import { telegramLink, whatsappGeneralLink } from '@/lib/format/links';
import { getDict } from '@/lib/i18n/dict';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { getSiteFaq, HOME_FAQ_IDS, pickFaqItems } from '@/lib/faq/site';
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
  const h = d.home;
  const catalog = await loadCatalog(lang);
  const categories = catalog.categories.filter((c) => c.productCount > 0);
  const featured = catalog.groups.flatMap((group) => (group.cards[0] ? [group.cards[0]] : []));
  const faq = pickFaqItems(getSiteFaq(lang), HOME_FAQ_IDS);
  const cities = await citiesFor(lang);
  const reviews = await getReviewsSafe();
  const hrefFor = (slug: string) => localePath(lang, `/catalog/${slug}`);
  const stats = [
    { value: catalog.cards.length, label: h.stats.products },
    { value: categories.length, label: h.stats.categories },
    { value: cities.length, label: h.stats.cities },
  ].filter((item) => item.value > 0);

  return (
    <>
      <JsonLd data={[professionalServiceLd(config.siteUrl), faqPageLd(faq)]} />
      <Hero lang={lang} stats={{ products: catalog.cards.length, categories: categories.length, cities: cities.length }} />
      <PopularSection
        title={h.popularHeading}
        lead={h.popularLead}
        allLabel={h.allCatalog}
        allHref={localePath(lang, '/catalog')}
        cards={featured}
        labels={cardLabels(d, lang)}
      />
      <CategoriesSection title={h.catsHeading} lead={h.catsLead} categories={categories} hrefFor={hrefFor} countLabel={d.catalog.countLabel} />
      <ChannelsStrip title={h.channelsTitle} />
      <HowSection title={h.howHeading} lead={h.howLead} steps={h.howSteps} />
      {reviews.results.length > 0 && (
        <ReviewsSection
          title={d.reviews.title}
          lead={d.reviews.lead}
          reviews={reviews.results}
          allLabel={d.reviews.all}
          allHref={localePath(lang, '/reviews')}
          ratingLabel={(rating) => ratingText(d.reviews.ratingLabel, rating)}
        />
      )}
      <PricesSection
        title={h.pricesHeading}
        lead={h.pricesLead}
        allLabel={h.pricesAll}
        allHref={localePath(lang, '/prices')}
        rows={priceRows(catalog.categories, catalog.cards, lang, config.usdRate)}
        hrefFor={hrefFor}
        countLabel={d.catalog.countLabel}
      />
      <TrustSection title={h.trustHeading} lead={h.trustLead} items={h.trustItems} stats={stats} />
      <FaqSection title={h.faqHeading} items={faq} allLabel={d.faq.allQuestions} allHref={localePath(lang, '/faq')} />
      {cities.length > 0 && <CitiesSection title={h.citiesHeading} lead={h.citiesLead} cities={cities} />}
      <CtaSection
        title={h.ctaTitle}
        text={h.ctaText}
        whatsappLabel={h.ctaWhatsapp}
        whatsappHref={whatsappGeneralLink(lang)}
        telegramLabel={d.common.tg}
        telegramHref={telegramLink()}
      />
    </>
  );
}
