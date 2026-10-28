import { serviceBy } from './data.js';

// Single source of truth for niche pricing: only services flagged `site: true` count,
// fallback is the business-card site, then (fixtures only) the cheapest fitting service.
export function nicheSite(niche) {
  const fitting = (niche.services || []).filter((s) => serviceBy[s]).map((s) => serviceBy[s]);
  const sites = fitting.filter((s) => s.site);
  const pool = sites.length ? sites : serviceBy['sait-vizitka'] ? [serviceBy['sait-vizitka']] : fitting;
  const site = pool.reduce((a, b) => (a.priceFrom <= b.priceFrom ? a : b));
  return { fitting, site, price: site.priceFrom };
}
