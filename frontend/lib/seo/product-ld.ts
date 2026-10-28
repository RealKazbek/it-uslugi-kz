import { breadcrumbLd, faqPageLd, serviceLd, type Crumb, type FaqEntry } from './jsonld';

export interface ProductLdInput {
  name: string;
  description: string;
  url: string;
  priceKzt: number;
  faqs: FaqEntry[];
  crumbs: Crumb[];
}

/** Service + FAQPage + BreadcrumbList for a product page, in that order. */
export function productLd(input: ProductLdInput): object[] {
  return [
    serviceLd({ name: input.name, description: input.description, url: input.url, priceKzt: input.priceKzt }),
    faqPageLd(input.faqs),
    breadcrumbLd(input.crumbs),
  ];
}
