import { forwardedForValue, mapBackendResponse } from './forward';
import { validateLead } from './validate';

export interface SubmitDeps {
  apiBaseUrl: string;
  fetchImpl: typeof fetch;
}

export interface ClientAddress {
  forwardedFor: string | null;
  realIp: string | null;
}

export interface SubmitResult {
  status: number;
  body: Record<string, unknown>;
}

/** Validates the lead, forwards it to the backend and maps the outcome for the browser. Logs failures with context. */
export async function submitLeadToBackend(
  raw: unknown,
  address: ClientAddress,
  deps: SubmitDeps,
): Promise<SubmitResult> {
  const checked = validateLead(raw);
  if (!checked.ok) {
    return { status: 400, body: { ok: false, reason: 'invalid', fields: checked.fields } };
  }
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const xff = forwardedForValue(address.forwardedFor, address.realIp);
  if (xff !== null) headers['X-Forwarded-For'] = xff;

  let response: Response;
  try {
    response = await deps.fetchImpl(`${deps.apiBaseUrl}/api/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(checked.value),
      cache: 'no-store',
    });
  } catch (cause) {
    console.error('[lead] backend unreachable', { lang: checked.value.lang, error: describe(cause) });
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
      console.error('[lead] backend rejected request', { lang: checked.value.lang, status: response.status });
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
