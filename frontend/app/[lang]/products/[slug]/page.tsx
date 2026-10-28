import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EstimateCard } from '@/components/features/product/EstimateCard';
import { ProductCtas } from '@/components/features/product/ProductCtas';
import { LeadForm } from '@/components/features/lead/LeadForm';
import { ProductCard } from '@/components/features/catalog/ProductCard';
import { Container } from '@/components/ui/Container';
import { FaqList } from '@/components/ui/FaqList';
import { Section } from '@/components/ui/Section';
import { StepList } from '@/components/ui/StepList';
import { getProduct, getProducts } from '@/lib/api/products';
import { cardView } from '@/lib/catalog/cards';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { daysText } from '@/lib/format/days';
import { priceText, priceWithUnit } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { selectProcess } from '@/lib/i18n/process';
import { legal } from '@/lib/site/legal';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams(): Promise<{ lang: Lang; slug: string }[]> {
  const perLang = await Promise.all(
    LANGS.map(async (lang) => (await getProducts(lang)).map((p) => ({ lang, slug: p.slug }))),
  );
  return perLang.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null) return {};
  const product = await getProduct(lang, slug);
  if (product === null) return {};
  const price = priceText(lang, product.price_from_kzt, config.usdRate);
  const d = getDict(lang).product;
  return {
    title: d.titleTemplate(product.title, price),
    description: d.descriptionTemplate(product.short, price),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null) notFound();
  const product = await getProduct(lang, slug);
  if (product === null) notFound();

  const d = getDict(lang);
  const pagePath = localePath(lang, `/products/${product.slug}`);
  const absoluteUrl = `${config.siteUrl}${pagePath}`;
  const steps = selectProcess(lang, product.category, product.unit);
  const related = product.related.map((card) => cardView(card, lang, config.usdRate));
  const faqs = product.faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <>
      <Section>
        <Container className="space-y-5">
          <h1 className="text-[1.9rem] leading-tight md:text-[2.4rem]">{product.title}</h1>
          <p className="max-w-prose text-lg text-muted">{product.description}</p>
          <ProductCtas lang={lang} title={product.title} absoluteUrl={absoluteUrl} />
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl">{d.product.forWhom}</h2>
              <p className="max-w-prose">{product.for_whom}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl">{d.product.notIncluded}</h2>
              <p className="text-muted">{d.product.notIncludedLead}</p>
              <ul className="list-disc space-y-1 pl-5">
                {product.not_included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <EstimateCard
            title={d.product.estimate}
            items={product.includes}
            totalLabel={d.product.total}
            totalText={priceWithUnit(lang, product.price_from_kzt, product.unit, config.usdRate)}
            timelineText={daysText(lang, product.unit, product.days_min, product.days_max)}
            footer={<p className="mt-4 text-sm text-muted">{d.product.priceNote}</p>}
          />
        </Container>
      </Section>
      {steps.length > 0 && (
        <Section labelledBy="process">
          <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <h2 id="process" className="text-2xl">{d.product.process}</h2>
            <StepList steps={steps} />
          </Container>
        </Section>
      )}
      <Section labelledBy="faq">
        <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <h2 id="faq" className="text-2xl">{d.product.faq}</h2>
          <div className="space-y-6">
            <FaqList items={faqs} />
            <p className="text-sm text-muted">{legal[lang]}</p>
          </div>
        </Container>
      </Section>
      {related.length > 0 && (
        <Section labelledBy="related" className="bg-mist">
          <Container className="space-y-6">
            <h2 id="related" className="text-2xl">{d.product.related}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((card) => (
                <ProductCard key={card.slug} card={card} />
              ))}
            </div>
          </Container>
        </Section>
      )}
      <Section labelledBy="cta-title">
        <Container className="space-y-4">
          <h2 id="cta-title" className="text-2xl">{d.product.ctaTitle}</h2>
          <p className="max-w-prose text-muted">{d.product.ctaText}</p>
          <ProductCtas lang={lang} title={product.title} absoluteUrl={absoluteUrl} />
        </Container>
      </Section>
      <Section labelledBy="lead-title" className="pb-24 md:pb-14">
        <Container className="space-y-5">
          <h2 id="lead-title" className="text-2xl">{d.product.leadTitle}</h2>
          <p className="max-w-prose text-muted">{d.product.leadText}</p>
          <LeadForm lang={lang} product={product.slug} pageUrl={absoluteUrl} />
        </Container>
      </Section>
    </>
  );
}
