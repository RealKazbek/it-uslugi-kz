const MAX_QUERY_LENGTH = 200;

/** Cleans the `q` search parameter: a single string, trimmed, collapsed spaces, length-capped. */
export function parseSearchQuery(raw: string | string[] | undefined): string {
  if (typeof raw !== 'string') return '';
  return raw.trim().replace(/\s+/g, ' ').slice(0, MAX_QUERY_LENGTH);
}
