import { LANGS } from '../lib/i18n.js';
import { products } from '../lib/data.js';
import { fmt } from '../lib/price.js';

// { ru: path, kk: path, en: path } for a url builder.
export const altAll = (fn, ...args) => Object.fromEntries(LANGS.map((l) => [l, fn(l, ...args)]));
export const altSome = (langs, fn, ...args) => Object.fromEntries(langs.map((l) => [l, fn(l, ...args)]));

export const minPrice = products.length ? Math.min(...products.map((p) => p.priceFrom)) : 0;
export const minPriceText = fmt(minPrice);
