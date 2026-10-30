import type { PricesDict } from '../types';

export const pricesEn: PricesDict = {
  title: (min) => `Prices for websites, bots and automation: ${min} | Perne`,
  description: (n, min) => `Price list of ${n} products by category. Prices ${min}, timelines and payment terms.`,
  h1: (min) => `Prices ${min}`,
  lead: 'All prices are starting prices in Kazakhstani tenge, with approximate USD next to them. The final amount depends on the scope and is agreed before work starts. Prices do not depend on the city.',
  cols: ['Product', 'Price', 'Format', 'Timeline or start'],
  legalHeading: 'Status and payment',
  ctaTitle: 'Need an exact estimate?',
  ctaText: 'Describe your project on WhatsApp and we will give you a price and a timeline.',
};
