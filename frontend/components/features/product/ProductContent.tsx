import { JsonLd } from '@/components/features/seo/JsonLd';
import { ProductBody } from './ProductBody';
import { ProductGallery } from './ProductGallery';
import { ProductLeadSection } from './ProductLeadSection';
import { ProductMobileBar } from './ProductMobileBar';
import { ProductOrderCard } from './ProductOrderCard';
import { onsiteText } from '@/lib/site/onsite';
import { ProductRelated } from './ProductRelated';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import type { CardView } from '@/lib/catalog/cards';
import type { Dict, Step } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { productGallery } from '@/lib/media/images';
import type { ProductDto } from '@/types/api';

export interface ProductContentProps {
  lang: Lang;
  dict: Dict;
  product: ProductDto;
  pageUrl: string;
  crumbs: Crumb[];
  categoryLabel: string;
  totalText: string;
  timelineText: string;
  steps: Step[];
  related: CardView[];
  jsonLd: object[];
}

/** Kaspi-style product page: gallery and content on the left, sticky order card on the right. */
export function ProductContent(props: ProductContentProps) {
  const { lang, dict: d, product, pageUrl } = props;
  const images = productGallery(product.slug, product.category);
  const alts = images.map((_, i) => d.product.photoAlt(product.title, i + 1));
  return (
    <>
      <JsonLd data={props.jsonLd} />
      <Container className="space-y-5 pb-28 pt-6 md:pb-16 md:pt-8">
        <Breadcrumbs label={d.common.menu} items={props.crumbs} />
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <ProductGallery images={images} alts={alts} label={d.product.galleryLabel} />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start lg:sticky lg:top-24">
            <ProductOrderCard
              lang={lang}
              category={props.categoryLabel}
              title={product.title}
              description={product.description}
              absoluteUrl={pageUrl}
              totalText={props.totalText}
              timelineText={props.timelineText}
              highlights={product.includes.slice(0, 3)}
              orderTitle={d.product.orderTitle}
              orderHint={d.product.orderHint}
              priceNote={d.product.priceNote}
              onsiteText={product.is_onsite ? onsiteText(lang) : undefined}
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
            <ProductBody dict={d} product={product} steps={props.steps} />
          </div>
        </div>
      </Container>
      <ProductRelated title={d.product.related} cards={props.related} labels={{ order: d.common.cta.order, timeline: d.common.timeline, onsite: onsiteText(lang) }} />
      <ProductLeadSection
        lang={lang}
        title={product.title}
        absoluteUrl={pageUrl}
        product={product.slug}
        cta={{ heading: d.product.ctaTitle, text: d.product.ctaText }}
        form={{ heading: d.product.leadTitle, text: d.product.leadText }}
        labels={d.lead}
      />
      <ProductMobileBar
        lang={lang}
        title={product.title}
        absoluteUrl={pageUrl}
        totalText={props.totalText}
        labels={d.common.cta}
      />
    </>
  );
}
