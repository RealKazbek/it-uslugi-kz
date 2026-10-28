import { contacts } from '@/lib/site/contacts';

type Json = Record<string, unknown>;

export interface FaqEntry {
  q: string;
  a: string;
}

export interface Crumb {
  name: string;
  url: string;
}

/** ProfessionalService for the whole business. No aggregateRating and no invented facts. */
export function professionalServiceLd(siteUrl: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: contacts.brand,
    url: `${siteUrl}/`,
    telephone: contacts.phone,
    email: contacts.email,
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    sameAs: [contacts.github, contacts.portfolioUrl],
  };
}

/** Service with a KZT Offer. `price` is the starting price (the page says "от"). */
export function serviceLd(input: { name: string; description: string; url: string; priceKzt: number }): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { '@type': 'ProfessionalService', name: contacts.brand },
    areaServed: { '@type': 'Country', name: 'Kazakhstan' },
    offers: {
      '@type': 'Offer',
      price: input.priceKzt,
      priceCurrency: 'KZT',
      url: input.url,
      availability: 'https://schema.org/InStock',
    },
  };
}

export function faqPageLd(items: FaqEntry[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbLd(crumbs: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
