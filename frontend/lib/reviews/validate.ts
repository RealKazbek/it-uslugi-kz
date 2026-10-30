import { isLang, type Lang } from '@/lib/i18n/locales';
import type { ReviewPayload } from '@/types/review';

export const NAME_MIN = 2;
export const NAME_MAX = 80;
export const COMPANY_MAX = 120;
export const CITY_MAX = 80;
export const TEXT_MIN = 10;
export const TEXT_MAX = 2000;
export const RATING_MIN = 1;
export const RATING_MAX = 5;

export type ReviewValidation = { ok: true; value: ReviewPayload } | { ok: false; fields: string[] };

function text(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === 'string' ? value : '';
}

/** Accepts a number or a numeric string (form values arrive as strings). Null when not an integer in 1..5. */
function ratingOf(input: Record<string, unknown>): number | null {
  const raw = input.rating;
  const value = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : NaN;
  return Number.isInteger(value) && value >= RATING_MIN && value <= RATING_MAX ? value : null;
}

/** Validates a review body shared by the website form and the route handler. Returns field names only. */
export function validateReview(input: unknown): ReviewValidation {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false, fields: ['body'] };
  }
  const record = input as Record<string, unknown>;
  const name = text(record, 'name').trim();
  const company = text(record, 'company').trim();
  const city = text(record, 'city').trim();
  const body = text(record, 'text').trim();
  const rating = ratingOf(record);
  const locale = text(record, 'locale');

  const fields: string[] = [];
  if (name.length < NAME_MIN || name.length > NAME_MAX) fields.push('name');
  if (company.length > COMPANY_MAX) fields.push('company');
  if (city.length > CITY_MAX) fields.push('city');
  if (rating === null) fields.push('rating');
  if (body.length < TEXT_MIN || body.length > TEXT_MAX) fields.push('text');
  if (!isLang(locale)) fields.push('locale');
  if (fields.length > 0 || rating === null || !isLang(locale)) {
    return { ok: false, fields };
  }

  return {
    ok: true,
    value: {
      name,
      company,
      city,
      rating,
      text: body,
      locale: locale as Lang,
      website: text(record, 'website'),
    },
  };
}
