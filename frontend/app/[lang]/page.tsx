import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/features/home/Hero';
import { CategoryList } from '@/components/features/catalog/CategoryList';
import { ProductCard } from '@/components/features/catalog/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FaqList } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import { loadCatalog } from '@/lib/catalog/load';
import { parseLang } from '@/lib/catalog/params';
import { priceText } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import { localePath } from '@/lib/i18n/paths';
import { config } from '@/lib/config';
import { legal } from '@/lib/site/legal';
import { whatsappGeneralLink } from '@/lib/format/links';

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
  return { title: d.title, description: d.description(min) };
}

export default async function HomePage({ params }: PageProps) {
  const lang = parseLang((await params).lang);
  if (lang === null) notFound();
  const d = getDict(lang);
  const catalog = await loadCatalog(lang);
  const featured = catalog.groups.flatMap((group) => (group.cards[0] ? [group.cards[0]] : []));
  const faq = [...d.home.faq, { q: d.home.legalQuestion, a: legal[lang] }];

  return (
    <>
      <Container>
        <Hero lang={lang} />
      </Container>
      <Section labelledBy="categories">
        <Container className="space-y-6">
          <h2 id="categories" className="text-2xl">{d.home.catsHeading}</h2>
          <CategoryList
            categories={catalog.categories.filter((c) => c.productCount > 0)}
            hrefFor={(slug) => localePath(lang, `/catalog/${slug}`)}
            countLabel={d.catalog.countLabel}
          />
        </Container>
      </Section>
      <Section labelledBy="popular" className="bg-mist">
        <Container className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="popular" className="text-2xl">{d.home.popularHeading}</h2>
            <Link href={localePath(lang, '/catalog')} className="font-semibold">{d.home.allCatalog}</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((card) => (
              <ProductCard key={card.slug} card={card} />
            ))}
          </div>
        </Container>
      </Section>
      <Section labelledBy="how">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="how" className="text-2xl">{d.home.howHeading}</h2>
          <StepList steps={d.home.howSteps} />
        </Container>
      </Section>
      <Section labelledBy="about">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="about" className="text-2xl">{d.home.aboutHeading}</h2>
          <ul className="max-w-prose list-disc space-y-2 pl-5">
            {d.home.aboutFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section labelledBy="faq">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="faq" className="text-2xl">{d.home.faqHeading}</h2>
          <FaqList items={faq} />
        </Container>
      </Section>
      <Section labelledBy="cta" className="pb-24 md:pb-14">
        <Container className="space-y-4">
          <h2 id="cta" className="text-2xl">{d.home.ctaTitle}</h2>
          <p className="max-w-prose text-muted">{d.home.ctaText}</p>
          <ButtonLink href={whatsappGeneralLink(lang)}>{d.home.ctaWhatsapp}</ButtonLink>
        </Container>
      </Section>
    </>
  );
}
