import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductContent } from '@/components/features/product/ProductContent';
import { getProduct, getProducts } from '@/lib/api/products';
import { cardView } from '@/lib/catalog/cards';
import { categoryName } from '@/lib/catalog/load';
import { parseLang } from '@/lib/catalog/params';
import { config } from '@/lib/config';
import { daysText } from '@/lib/format/days';
import { priceText, priceWithUnit } from '@/lib/format/price';
import { getDict } from '@/lib/i18n/dict';
import { LANGS, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import { selectProcess } from '@/lib/i18n/process';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { productLd } from '@/lib/seo/product-ld';
import { fitPriceTitle } from '@/lib/seo/title';
import { absoluteUrl } from '@/lib/seo/urls';
import type { ProductDto } from '@/types/api';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams(): Promise<{ lang: Lang; slug: string }[]> {
  const perLang = await Promise.all(LANGS.map(async (lang) => (await getProducts(lang)).map((p) => ({ lang, slug: p.slug }))));
  return perLang.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null) return {};
  const product = await getProduct(lang, slug);
  if (product === null) return {};
  const price = priceText(lang, product.price_from_kzt, config.usdRate);
  return buildPageMetadata({
    siteUrl: config.siteUrl,
    lang,
    path: `/products/${slug}`,
    title: fitPriceTitle({ head: product.title, priceWithUsd: price, priceWithoutUsd: priceText(lang, product.price_from_kzt, config.usdRate, false) }),
    description: getDict(lang).product.descriptionTemplate(product.short, price),
    langs: LANGS,
  });
}

/** Crumb trail as site paths. The visible links and the JSON-LD URLs are both derived from it. */
function trailFor(dict: ReturnType<typeof getDict>, product: ProductDto, category: string) {
  return [
    { name: dict.common.breadcrumbHome, path: '/' },
    { name: dict.common.nav.catalog, path: '/catalog' },
    { name: category, path: `/catalog/${product.category}` },
    { name: product.title, path: `/products/${product.slug}` },
  ];
}

export default async function ProductPage({ params }: PageProps) {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  if (lang === null) notFound();
  const product = await getProduct(lang, slug);
  if (product === null) notFound();

  const dict = getDict(lang);
  const trail = trailFor(dict, product, await categoryName(lang, product.category));
  const pageUrl = absoluteUrl(config.siteUrl, lang, `/products/${product.slug}`);

  return (
    <ProductContent
      lang={lang}
      dict={dict}
      product={product}
      pageUrl={pageUrl}
      crumbs={trail.map((c) => ({ name: c.name, href: localePath(lang, c.path) }))}
      totalText={priceWithUnit(lang, product.price_from_kzt, product.unit, config.usdRate)}
      timelineText={daysText(lang, product.unit, product.days_min, product.days_max)}
      steps={selectProcess(lang, product.category, product.unit)}
      related={product.related.map((card) => cardView(card, lang, config.usdRate))}
      jsonLd={productLd({
        name: product.title,
        description: product.short,
        url: pageUrl,
        priceKzt: product.price_from_kzt,
        faqs: product.faqs.map((f) => ({ q: f.question, a: f.answer })),
        crumbs: trail.map((c) => ({ name: c.name, url: absoluteUrl(config.siteUrl, lang, c.path) })),
      })}
    />
  );
}
