import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryList } from '@/components/features/catalog/CategoryList';
import { ProductCard } from '@/components/features/catalog/ProductCard';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { getCategories } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import { loadCatalog } from '@/lib/catalog/load';
import { cardView } from '@/lib/catalog/cards';
import { langParams, parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { priceText } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { JsonLd } from '@/components/features/seo/JsonLd';
import { LANGS } from '@/lib/i18n/locales';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/seo/urls';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import type { ProductCardDto } from '@/types/api';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; category: string }>;
}

/** Starting price of the category as display text, or '' when it has no products. */
function categoryMinPrice(lang: Lang, products: ProductCardDto[]): string {
  if (products.length === 0) return '';
  const min = Math.min(...products.map((p) => p.price_from_kzt));
  return priceText(lang, min, config.usdRate);
}

export async function generateStaticParams(): Promise<{ lang: Lang; category: string }[]> {
  const categories = await getCategories();
  return langParams().flatMap(({ lang }) =>
    categories.filter((c) => c.product_count > 0).map((c) => ({ lang, category: c.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, category } = await params;
  const lang = parseLang(raw);
  if (lang === null) return {};
  const catalog = await loadCatalog(lang);
  const current = catalog.categories.find((c) => c.slug === category);
  if (!current) return {};
  const products = await getProducts(lang, category);
  const d = getDict(lang).catalog;
  return buildPageMetadata({
    siteUrl: config.siteUrl,
    lang,
    path: `/catalog/${category}`,
    title: d.hubTitle(current.name),
    description: d.hubDescription(current.short, categoryMinPrice(lang, products)),
    langs: LANGS,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang: raw, category } = await params;
  const lang = parseLang(raw);
  if (lang === null) notFound();
  const catalog = await loadCatalog(lang);
  const current = catalog.categories.find((c) => c.slug === category);
  if (!current || current.productCount === 0) notFound();
  const d = getDict(lang).catalog;
  const products = await getProducts(lang, category);
  const cards = products.map((p) => cardView(p, lang, config.usdRate));
  const others = catalog.categories.filter((c) => c.slug !== category && c.productCount > 0);

  const crumbs = [
    { name: getDict(lang).common.breadcrumbHome, url: absoluteUrl(config.siteUrl, lang, '/') },
    { name: d.h1, url: absoluteUrl(config.siteUrl, lang, '/catalog') },
    { name: current.name, url: absoluteUrl(config.siteUrl, lang, `/catalog/${category}`) },
  ];
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Section>
        <Container className="space-y-4">
          <h1 className="text-[1.9rem] md:text-[2.4rem]">{d.hubH1(current.name)}</h1>
          <p className="max-w-prose text-lg text-muted-foreground">{current.intro}</p>
        </Container>
      </Section>
      <Section labelledBy="list">
        <Container className="space-y-6">
          <h2 id="list" className="text-2xl">{d.hubList}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <ProductCard key={card.slug} card={card} />
            ))}
          </div>
        </Container>
      </Section>
      <Section labelledBy="others">
        <Container className="space-y-6">
          <h2 id="others" className="text-2xl">{d.hubOthers}</h2>
          <CategoryList
            categories={others}
            hrefFor={(slug) => localePath(lang, `/catalog/${slug}`)}
            countLabel={d.countLabel}
          />
        </Container>
      </Section>
    </>
  );
}
