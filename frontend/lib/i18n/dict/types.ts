import type { Channel } from '@/types/lead';
import type { Unit } from '@/types/api';

export interface Step {
  t: string;
  d: string;
}

export interface CommonDict {
  langName: string;
  switchLabel: string;
  skip: string;
  menu: string;
  nav: { catalog: string; prices: string; portfolio: string; contacts: string };
  wa: string;
  tg: string;
  faq: string;
  footerTagline: string;
  footerNote: string;
  mobileBar: { whatsapp: string; telegram: string };
  units: Record<Unit, string>;
  priceFrom: (price: string) => string;
  daysTerm: (range: string, max: number) => string;
  daysStart: (days: number) => string;
  msgGeneral: string;
  msgProduct: (title: string, url: string) => string;
  notFound: { title: string; text: string; home: string; catalog: string };
  legalHeading: string;
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
  faq: { q: string; a: string }[];
  legalQuestion: string;
  ctaTitle: string;
  ctaText: string;
  remoteNote: string;
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
}

export interface ProductDict {
  titleTemplate: (title: string, priceText: string) => string;
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

export interface Dict {
  common: CommonDict;
  home: HomeDict;
  catalog: CatalogDict;
  product: ProductDict;
  lead: LeadDict;
}
