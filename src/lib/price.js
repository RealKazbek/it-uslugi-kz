import { config } from '../data/config.js';

const NNBSP = ' ';

export function fmt(n) {
  return `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP)}${NNBSP}₸`;
}

// Approximate USD for English pages: nearest 5 USD from 50 up, nearest 1 USD below.
export function usd(n) {
  const v = n / config.usdRate;
  return v >= 50 ? Math.round(v / 5) * 5 : Math.max(1, Math.round(v));
}
export const usdText = (n) => `≈ $${usd(n)}`;

export const units = {
  ru: { once: 'разово', month: 'в месяц', lesson: 'за урок', hour: 'за час' },
  kk: { once: 'бір реттік', month: 'айына', lesson: 'сабағына', hour: 'сағатына' },
  en: { once: 'one-off', month: 'per month', lesson: 'per lesson', hour: 'per hour' },
};
export const unitText = (lang, unit) => units[lang][unit] || units[lang].once;

// Short price: "от 45 000 ₸" / "45 000 ₸ бастап" / "from 45 000 ₸ (≈ $90)"
export function fromPrice(lang, n) {
  if (lang === 'ru') return `от ${fmt(n)}`;
  if (lang === 'kk') return `${fmt(n)} бастап`;
  return `from ${fmt(n)} (${usdText(n)})`;
}

// With unit: "от 4 000 ₸ за урок" / "4 000 ₸ бастап сабағына" / "from 4 000 ₸ (≈ $8) per lesson"
export function priceLine(lang, n, unit) {
  const u = unitText(lang, unit);
  if (lang === 'en') return `${fromPrice(lang, n)}${unit === 'once' ? ', ' : ' '}${u}`;
  if (lang === 'kk' && unit === 'once') return `${fromPrice(lang, n)}, ${u}`;
  return `${fromPrice(lang, n)} ${u}`;
}
