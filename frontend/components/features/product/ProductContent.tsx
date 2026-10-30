import { JsonLd } from '@/components/features/seo/JsonLd';
import { ProductDetails } from './ProductDetails';
import { ProductFaq } from './ProductFaq';
import { ProductGallery } from './ProductGallery';
import { ProductIncludes } from './ProductIncludes';
import { ProductLeadSection } from './ProductLeadSection';
import { ProductMobileBar } from './ProductMobileBar';
import { ProductOrderCard } from './ProductOrderCard';
import { ProductProcess } from './ProductProcess';
import { ProductRelated } from './ProductRelated';
import { Reveal } from '@/components/motion/Reveal';
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
  return (
    <>
      <JsonLd data={props.jsonLd} />
      <Container className="space-y-5 pb-24 pt-6 md:pb-16 md:pt-8">
        <Breadcrumbs label={d.common.menu} items={props.crumbs} />
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="space-y-8 lg:col-span-7 lg:row-span-2">
            <ProductGallery images={images} alts={images.map((_, i) => d.product.photoAlt(product.title, i + 1))} label={d.product.galleryLabel} />
            <div className="hidden space-y-8 lg:block">{null}</div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
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
            />
          </div>
        </div>
      </Container>
    </>
  );
}
