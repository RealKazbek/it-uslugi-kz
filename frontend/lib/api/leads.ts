import type { LeadField, LeadPayload, LeadSubmitResult } from '@/types/lead';

const LEAD_ENDPOINT = '/api/lead';
const KNOWN_FIELDS: readonly LeadField[] = ['name', 'contact', 'channel', 'message'];

function invalidFieldsFrom(body: unknown): LeadField[] {
  if (typeof body !== 'object' || body === null) return [];
  const fields = (body as { fields?: unknown }).fields;
  if (!Array.isArray(fields)) return [];
  return fields.filter((f): f is LeadField => typeof f === 'string' && (KNOWN_FIELDS as readonly string[]).includes(f));
}

/** Sends the lead through the Next route handler. The only network call for the lead form. */
export async function submitLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  let response: Response;
  try {
    response = await fetch(LEAD_ENDPOINT, {
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
