export type BackendOutcome =
  | { kind: 'created' }
  | { kind: 'invalid'; fields: string[] }
  | { kind: 'throttled' }
  | { kind: 'error' };

/** Maps the backend status of POST /api/leads to the outcome the route returns to the browser. */
export function mapBackendResponse(status: number, body: unknown): BackendOutcome {
  if (status === 201 || status === 200) return { kind: 'created' };
  if (status === 429) return { kind: 'throttled' };
  if (status === 400) return { kind: 'invalid', fields: invalidKeys(body) };
  return { kind: 'error' };
}

/** DRF error bodies are objects like {"name": ["..."]}. Only the keys matter here. */
function invalidKeys(body: unknown): string[] {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return [];
  return Object.keys(body);
}

/** Picks the client address header to forward: X-Forwarded-For unchanged, else x-real-ip. */
export function forwardedForValue(
  forwardedFor: string | null,
  realIp: string | null,
): string | null {
  if (forwardedFor !== null && forwardedFor.trim() !== '') return forwardedFor;
  if (realIp !== null && realIp.trim() !== '') return realIp.trim();
  return null;
}
