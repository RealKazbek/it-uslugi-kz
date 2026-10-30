import type { CatalogDict } from '../types';

export const catalogEn: CatalogDict = {
  title: 'Service catalog: websites, bots, AI, automation | Perne',
  description: (count, min) =>
    `A catalog of ${count} ready-made services: websites, online stores, bots, AI assistants, automation and lessons. Prices ${min}, with filter and search.`,
  h1: 'Service catalog',
  lead: 'Pick a ready format for your task. Every product has a price, a timeline, a list of what is included and an honest list of what is not.',
  filterAll: 'All categories',
  filterLabel: 'Category',
  searchLabel: 'Search the catalog',
  searchPlaceholder: 'For example: bot, website, Kaspi',
  empty: 'Nothing found. Try another search or message us.',
  categories: 'Categories',
  countLabel: (n) => `Products: ${n}`,
  hubTitle: (name) => `${name}: catalog and prices | Perne`,
  hubDescription: (short, min) => `${short}. Prices ${min}. Remote work from Kazakhstan.`,
  hubH1: (name) => `${name}: catalog and prices`,
  hubList: 'Products in this category',
  hubOthers: 'Other categories',
  sortLabel: 'Sort',
  sorts: { popular: 'Most popular', priceAsc: 'Price: low to high', priceDesc: 'Price: high to low', fast: 'Fastest first' },
  results: (n) => `${n} ${n === 1 ? 'result' : 'results'}`,
  reset: 'Reset filters',
  listHeading: 'Services',
};
