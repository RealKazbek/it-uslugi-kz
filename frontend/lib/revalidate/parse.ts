export const MAX_TAGS = 200;
const TAG_PATTERN = /^[a-z:0-9-]+$/;

export type TagParse = { ok: true; tags: string[] } | { ok: false; reason: string };

/** Validates the body of POST /api/revalidate: {"tags": string[]}. */
export function parseRevalidateBody(body: unknown): TagParse {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, reason: 'body must be an object' };
  }
  const tags = (body as Record<string, unknown>).tags;
  if (!Array.isArray(tags)) return { ok: false, reason: 'tags must be an array' };
  if (tags.length > MAX_TAGS) return { ok: false, reason: `at most ${MAX_TAGS} tags` };
  const invalid = tags.some((tag) => typeof tag !== 'string' || !TAG_PATTERN.test(tag));
  if (invalid) return { ok: false, reason: 'tags must match /^[a-z:0-9-]+$/' };
  return { ok: true, tags: tags as string[] };
}
