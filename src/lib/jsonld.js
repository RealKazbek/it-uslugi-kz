import { config } from '../data/config.js';
import { abs } from './urls.js';

export function script(obj) {
  const json = JSON.stringify(obj).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

const country = { '@type': 'Country', name: 'Kazakhstan' };

export function professionalService({ lang = 'ru', cityName, offers = [] } = {}) {
  const o = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: config.brand,
    url: config.siteUrl + '/',
    email: config.email,
    areaServed: cityName ? { '@type': 'City', name: cityName } : country,
    address: { '@type': 'PostalAddress', addressLocality: 'Almaty', addressCountry: 'KZ' },
    founder: { '@type': 'Person', name: config.person.name[lang] || config.person.name.ru },
    sameAs: [config.github, config.portfolioUrl],
  };
  if (config.phone) o.telephone = config.phone;
  if (offers.length) o.makesOffer = offers;
  return o;
}

export function offer({ name, price, cityName, url }) {
  return {
    '@type': 'Offer',
    priceCurrency: 'KZT',
    price: String(price),
    url,
    itemOffered: {
      '@type': 'Service',
      name,
      areaServed: cityName ? { '@type': 'City', name: cityName } : country,
    },
  };
}

export function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbList(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}
