import type { Lang } from '@/lib/i18n/locales';

export const REVIEW_FIELDS = ['name', 'company', 'city', 'rating', 'text'] as const;
export type ReviewField = (typeof REVIEW_FIELDS)[number];

/** Body the review form sends to /api/review; the route forwards it to the backend /api/reviews. */
export interface ReviewPayload {
  name: string;
  company: string;
  city: string;
  rating: number;
  text: string;
  locale: Lang;
  website: string;
}

export type ReviewSubmitResult =
  | { ok: true }
  | { ok: false; reason: 'throttled' }
  | { ok: false; reason: 'invalid'; fields: ReviewField[] }
  | { ok: false; reason: 'error' };
