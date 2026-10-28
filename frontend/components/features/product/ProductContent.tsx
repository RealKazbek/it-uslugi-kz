import { JsonLd } from '@/components/features/seo/JsonLd';
import { ProductDetails } from './ProductDetails';
import { ProductFaq } from './ProductFaq';
import { ProductHero } from './ProductHero';
import { ProductLeadSection } from './ProductLeadSection';
import { ProductProcess } from './ProductProcess';
import { ProductRelated } from './ProductRelated';
import type { Crumb } from '@/components/ui/Breadcrumbs';
import type { CardView } from '@/lib/catalog/cards';
import type { Dict, Step } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import type { ProductDto } from '@/types/api';

export interface ProductContentProps {
  lang: Lang;
  dict: Dict;
  product: ProductDto;
  pageUrl: string;
  crumbs: Crumb[];
  totalText: string;
  timelineText: string;
  steps: Step[];
  related: CardView[];
  jsonLd: object[];
}

/** Everything on a product page below the head: hero, details, process, FAQ, related, CTA and form. */
export function ProductContent(props: ProductContentProps) {
  const { lang, dict: d, product, pageUrl } = props;
  return (
    <>
      <JsonLd data={props.jsonLd} />
      <ProductHero lang={lang} menuLabel={d.common.menu} crumbs={props.crumbs} title={product.title} description={product.description} absoluteUrl={pageUrl} />
      <ProductDetails
        forWhomTitle={d.product.forWhom}
        forWhom={product.for_whom}
        notIncludedTitle={d.product.notIncluded}
        notIncludedLead={d.product.notIncludedLead}
        notIncluded={product.not_included}
        estimate={{
          title: d.product.estimate,
          items: product.includes,
          totalLabel: d.product.total,
          totalText: props.totalText,
          timelineText: props.timelineText,
          priceNote: d.product.priceNote,
        }}
      />
      <ProductProcess title={d.product.process} steps={props.steps} />
      <ProductFaq title={d.product.faq} items={product.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <ProductRelated title={d.product.related} cards={props.related} />
      <ProductLeadSection
        lang={lang}
        title={product.title}
        absoluteUrl={pageUrl}
        product={product.slug}
        cta={{ heading: d.product.ctaTitle, text: d.product.ctaText }}
        form={{ heading: d.product.leadTitle, text: d.product.leadText }}
        labels={d.lead}
      />
    </>
  );
}

