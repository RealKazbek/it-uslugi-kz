import type { Channel } from '@/types/lead';
import type { SortKey } from '@/lib/catalog/browse';
import type { Unit } from '@/types/api';

export interface Step {
  t: string;
  d: string;
}

export interface QA {
  q: string;
  a: string;
}

export interface CommonDict {
  langName: string;
  switchLabel: string;
  skip: string;
  menu: string;
  nav: { catalog: string; prices: string; reviews: string; contacts: string };
  wa: string;
  tg: string;
  faq: string;
  footerTagline: string;
  footerNote: string;
  footerContacts: string;
  mobileBar: { whatsapp: string; telegram: string };
  units: Record<Unit, string>;
  priceFrom: (price: string) => string;
  daysTerm: (range: string, max: number) => string;
  daysStart: (days: number) => string;
  msgGeneral: string;
  msgProduct: (title: string, url: string) => string;
  notFound: { title: string; text: string; home: string; catalog: string };
  legalHeading: string;
  breadcrumbHome: string;
  /** Button labels; every CTA also carries an icon. */
  cta: { whatsapp: string; telegram: string; call: string; order: string; details: string; allProducts: string };
  menuOpen: string;
  menuClose: string;
  floatingWa: string;
  timeline: string;
  social: string;
}

export interface HomeDict {
  title: string;
  description: (min: string) => string;
  h1: string;
  lead: string;
  ctaWhatsapp: string;
  catsHeading: string;
  popularHeading: string;
  allCatalog: string;
  howHeading: string;
  howSteps: Step[];
  aboutHeading: string;
  aboutFacts: string[];
  faqHeading: string;
  faq: QA[];
  legalQuestion: string;
  ctaTitle: string;
  ctaText: string;
  remoteNote: string;
  citiesHeading: string;
  citiesLead: string;
  heroBadge: string;
  heroPoints: string[];
  heroChips: { first: string; second: string };
  stats: { products: string; categories: string; languages: string; cities: string };
  catsLead: string;
  popularLead: string;
  howLead: string;
  pricesHeading: string;
  pricesLead: string;
  pricesAll: string;
  trustHeading: string;
  trustLead: string;
  trustItems: Step[];
  channelsTitle: string;
}

export interface CatalogDict {
  title: string;
  description: (count: number, min: string) => string;
  h1: string;
  lead: string;
  filterAll: string;
  filterLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  empty: string;
  categories: string;
  countLabel: (n: number) => string;
  hubTitle: (name: string) => string;
  hubDescription: (short: string, min: string) => string;
  hubH1: (name: string) => string;
  hubList: string;
  hubOthers: string;
  sortLabel: string;
  sorts: Record<SortKey, string>;
  results: (n: number) => string;
  reset: string;
  listHeading: string;
}

export interface ProductDict {
  descriptionTemplate: (short: string, priceText: string) => string;
  remote: string;
  estimate: string;
  total: string;
  forWhom: string;
  notIncluded: string;
  notIncludedLead: string;
  process: string;
  related: string;
  faq: string;
  ctaTitle: string;
  ctaText: string;
  priceNote: string;
  payNote: string;
  leadTitle: string;
  leadText: string;
  galleryLabel: string;
  photoAlt: (title: string, n: number) => string;
  orderTitle: string;
  orderHint: string;
}

export interface LeadDict {
  labels: { name: string; contact: string; channel: string; message: string };
  channels: Record<Channel, string>;
  placeholders: { name: string; contact: string; message: string };
  submit: string;
  sending: string;
  success: string;
  error: string;
  throttled: string;
  invalid: string;
  errors: { name: string; contact: string; message: string; channel: string };
}

/** City name forms: `loc` ("в Алматы" / "Алматыда"), `gen` (ru genitive), `attr` (kk "Алматыдағы"). */
export interface CityForms {
  loc: string;
  gen: string;
  attr: string;
}

/** Inputs for the city FAQ. `example` is one focus product with its reason, if the city has one. */
export interface CityFaqInput extends CityForms {
  sectors: string[];
  inPerson: boolean;
  titles: string[];
  example: { title: string; reason: string } | null;
}

export interface CityDict {
  title: (name: string) => string;
  h1: (forms: CityForms) => string;
  description: (forms: CityForms, min: string) => string;
  intro: (context: string, sectors: string[]) => string;
  remote: string;
  focusHeading: string;
  focusLead: string;
  catalogHeading: (form: string) => string;
  nearbyHeading: string;
  faqHeading: string;
  faq: (input: CityFaqInput) => QA[];
}

export interface PricesDict {
  title: (min: string) => string;
  description: (n: number, min: string) => string;
  h1: (min: string) => string;
  lead: string;
  cols: string[];
  legalHeading: string;
  ctaTitle: string;
  ctaText: string;
}

export interface ContactsDict {
  title: string;
  description: string;
  h1: string;
  lead: string;
  where: string;
  labels: { wa: string; tg: string; phone: string; email: string };
  who: string;
  legal: string;
  how: string;
  howLines: string[];
  formTitle: string;
  formText: string;
  nextTitle: string;
}

export interface ReviewsDict {
  title: string;
  description: string;
  h1: string;
  lead: string;
  formTitle: string;
  labels: { name: string; company: string; city: string; rating: string; text: string };
  placeholders: { name: string; company: string; city: string; text: string };
  submit: string;
  sending: string;
  success: string;
  error: string;
  throttled: string;
  invalid: string;
  errors: { name: string; company: string; city: string; rating: string; text: string };
  gisLabel: string;
  emptyText: string;
  /** Template with an {n} placeholder (see lib/reviews/rating.ts). */
  ratingLabel: string;
  all: string;
}

export interface Dict {
  common: CommonDict;
  home: HomeDict;
  catalog: CatalogDict;
  product: ProductDict;
  lead: LeadDict;
  city: CityDict;
  prices: PricesDict;
  contacts: ContactsDict;
  reviews: ReviewsDict;
}
