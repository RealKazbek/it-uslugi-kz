import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import type { Unit } from '@/types/api';

const NBSP = ' ';

/** 45000 -> "45 000 ₸" (ru, kk: narrow no-break space) or "45,000 ₸" (en). */
export function formatKzt(amount: number, lang: Lang = 'ru'): string {
  const separator = lang === 'en' ? ',' : NBSP;
  const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${digits}${NBSP}₸`;
}

/** Approximate USD: price / rate, rounded to 5 USD from 50 up, to 1 USD below that (never below 1). */
export function usdAmount(amount: number, rate: number): number {
  const value = amount / rate;
  return value >= 50 ? Math.round(value / 5) * 5 : Math.max(1, Math.round(value));
}

export function usdHint(amount: number, rate: number): string {
  return `≈ $${usdAmount(amount, rate)}`;
}

/**
 * Starting price as shown on cards: "от 45 000 ₸", "45 000 ₸ бастап", "from 45,000 ₸ (≈ $90)".
 * `withUsd` drops the English USD hint when a caller needs a shorter string (titles).
 */
export function priceText(lang: Lang, amount: number, rate: number, withUsd = true): string {
  const base = getDict(lang).common.priceFrom(formatKzt(amount, lang));
  return lang === 'en' && withUsd ? `${base} (${usdHint(amount, rate)})` : base;
}

/** Price plus the unit label: "от 4 000 ₸ за урок". */
export function priceWithUnit(lang: Lang, amount: number, unit: Unit, rate: number): string {
  return `${priceText(lang, amount, rate)} ${getDict(lang).common.units[unit]}`;
}
