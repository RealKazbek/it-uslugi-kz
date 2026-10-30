import type { SearchKind } from '@/lib/search/types';

export interface FaqDict {
  title: string;
  description: string;
  h1: string;
  lead: string;
  groupsLabel: string;
  allQuestions: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
}

export interface FooterDict {
  description: string;
  team: string;
  services: string;
  popular: string;
  cities: string;
  info: string;
  contactsHeading: string;
  request: string;
  agreement: string;
  hours: (value: string) => string;
  navLabel: (name: string) => string;
}

export interface SearchDict {
  label: string;
  hint: string;
  placeholder: string;
  dialogTitle: string;
  close: string;
  groups: Record<SearchKind, string>;
  recent: string;
  clear: string;
  popular: string;
  /** Template with a `{0}` placeholder (plain string so it can cross the server/client boundary). */
  noResults: string;
  request: string;
  /** Template with a `{0}` placeholder. */
  priceFrom: string;
  pageTitle: string;
  pageLead: string;
  pageSubmit: string;
  pageEmpty: string;
  pageMetaTitle: string;
  pageMetaDescription: string;
  resultsCount: string;
}
