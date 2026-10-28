import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import type { Unit } from '@/types/api';

const NBSP = ' ';

/** 45000 -> "45 000 ₸" with non-breaking spaces. */
export function formatKzt(amount: number): string {
  const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
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

/** Starting price as shown on cards: "от 45 000 ₸", "45 000 ₸ бастап", "from 45 000 ₸ (≈ $90)". */
export function priceText(lang: Lang, amount: number, rate: number): string {
  const base = getDict(lang).common.priceFrom(formatKzt(amount));
  return lang === 'en' ? `${base} (${usdHint(amount, rate)})` : base;
}

/** Price plus the unit label: "от 4 000 ₸ за урок". */
export function priceWithUnit(lang: Lang, amount: number, unit: Unit, rate: number): string {
  return `${priceText(lang, amount, rate)} ${getDict(lang).common.units[unit]}`;
}
