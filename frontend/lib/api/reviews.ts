import type { ReviewsResponse } from '@/types/api';
import { REVIEW_FIELDS, type ReviewField, type ReviewPayload, type ReviewSubmitResult } from '@/types/review';
import { apiGet } from './client';
import { ApiError } from './errors';

const REVIEW_ENDPOINT = '/api/review';

export function getReviews(): Promise<ReviewsResponse> {
  return apiGet<ReviewsResponse>('/api/reviews', { tags: ['reviews'] });
}

/** Approved reviews for pages that must render without them. Any failure yields an empty list and is logged. */
export async function getReviewsSafe(): Promise<ReviewsResponse> {
  try {
    return await getReviews();
  } catch (cause) {
    console.error('[reviews] load failed', {
      status: cause instanceof ApiError ? cause.status : 'unknown',
      error: cause instanceof Error ? cause.message : 'unknown',
    });
    return { results: [], gis_url: '' };
  }
}

function invalidFieldsFrom(body: unknown): ReviewField[] {
  if (typeof body !== 'object' || body === null) return [];
  const fields = (body as { fields?: unknown }).fields;
  if (!Array.isArray(fields)) return [];
  return fields.filter((f): f is ReviewField => typeof f === 'string' && (REVIEW_FIELDS as readonly string[]).includes(f));
}

/** Sends the review through the Next route handler. The only network call for the review form. */
export async function submitReview(payload: ReviewPayload): Promise<ReviewSubmitResult> {
  let response: Response;
  try {
    response = await fetch(REVIEW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, reason: 'error' };
  }
  if (response.status === 429) return { ok: false, reason: 'throttled' };
  if (response.status === 400) {
    const body: unknown = await response.json().catch(() => null);
    return { ok: false, reason: 'invalid', fields: invalidFieldsFrom(body) };
  }
  if (response.ok) return { ok: true };
  return { ok: false, reason: 'error' };
}
