import { forwardedForValue, mapBackendResponse } from '@/lib/leads/forward';
import type { ClientAddress, SubmitDeps, SubmitResult } from '@/lib/leads/submit';
import type { ReviewPayload } from '@/types/review';
import { validateReview } from './validate';

/** Drops empty optional fields so the backend sees them as absent. */
function toBackendBody(value: ReviewPayload): Record<string, unknown> {
  const body: Record<string, unknown> = { ...value };
  if (value.company === '') delete body.company;
  if (value.city === '') delete body.city;
  return body;
}

/** Validates the review, forwards it to the backend and maps the outcome for the browser. Logs failures with context. */
export async function submitReviewToBackend(
  raw: unknown,
  address: ClientAddress,
  deps: SubmitDeps,
): Promise<SubmitResult> {
  const checked = validateReview(raw);
  if (!checked.ok) {
    return { status: 400, body: { ok: false, reason: 'invalid', fields: checked.fields } };
  }
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const xff = forwardedForValue(address.forwardedFor, address.realIp);
  if (xff !== null) headers['X-Forwarded-For'] = xff;

  let response: Response;
  try {
    response = await deps.fetchImpl(`${deps.apiBaseUrl}/api/reviews`, {
      method: 'POST',
      headers,
      body: JSON.stringify(toBackendBody(checked.value)),
      cache: 'no-store',
    });
  } catch (cause) {
    console.error('[review] backend unreachable', { lang: checked.value.locale, error: describe(cause) });
    return { status: 502, body: { ok: false, reason: 'error' } };
  }

  const outcome = mapBackendResponse(response.status, await readJson(response));
  switch (outcome.kind) {
    case 'created':
      return { status: 201, body: { ok: true } };
    case 'invalid':
      return { status: 400, body: { ok: false, reason: 'invalid', fields: outcome.fields } };
    case 'throttled':
      return { status: 429, body: { ok: false, reason: 'throttled' } };
    case 'error':
      console.error('[review] backend rejected request', { lang: checked.value.locale, status: response.status });
      return { status: 502, body: { ok: false, reason: 'error' } };
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function describe(cause: unknown): string {
  return cause instanceof Error ? cause.name : 'unknown';
}
