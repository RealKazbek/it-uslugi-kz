import { ProductDetails } from './ProductDetails';
import { ProductFaq } from './ProductFaq';
import { ProductIncludes } from './ProductIncludes';
import { ProductProcess } from './ProductProcess';
import { Reveal } from '@/components/motion/Reveal';
import type { Dict, Step } from '@/lib/i18n/dict/types';
import type { ProductDto } from '@/types/api';

interface ProductBodyProps {
  dict: Dict;
  product: ProductDto;
  steps: Step[];
}

/** Content sections under the gallery: includes, audience, exclusions, process and FAQ. */
export function ProductBody({ dict: d, product, steps }: ProductBodyProps) {
  return (
    <div className="space-y-10">
      <Reveal>
        <ProductIncludes title={d.product.estimate} items={product.includes} />
      </Reveal>
      <Reveal>
        <ProductDetails
          forWhomTitle={d.product.forWhom}
          forWhom={product.for_whom}
          notIncludedTitle={d.product.notIncluded}
          notIncludedLead={d.product.notIncludedLead}
          notIncluded={product.not_included}
        />
      </Reveal>
      <ProductProcess title={d.product.process} steps={steps} />
      <Reveal>
        <ProductFaq title={d.product.faq} items={product.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      </Reveal>
    </div>
  );
}
