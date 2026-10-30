import type { ReviewsDict } from '@/lib/i18n/dict/types';
import { REVIEW_FIELDS, type ReviewField } from '@/types/review';

export type ReviewErrors = Partial<Record<ReviewField, string>>;

function isReviewField(value: string): value is ReviewField {
  return (REVIEW_FIELDS as readonly string[]).includes(value);
}

/** Maps invalid field names to the page-language message. Unknown names (for example the locale) get no field message. */
export function reviewErrorsFrom(fields: string[], labels: ReviewsDict): ReviewErrors {
  const out: ReviewErrors = {};
  for (const field of fields) {
    if (isReviewField(field)) out[field] = labels.errors[field];
  }
  return out;
}
