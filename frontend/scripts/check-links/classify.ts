import type { LinkRef } from './types';

export type Target =
  | { kind: 'internal'; url: URL }
  | { kind: 'external'; href: string }
  | { kind: 'problem'; reason: string };

const EXTERNAL_SCHEME = /^(mailto|tel):/i;
const NON_HTTP_SCHEME = /^(javascript|data|blob|vbscript):/i;

/**
 * Pure: decides whether a raw href/src value points at this site (internal, resolved against the page),
 * at another resource (external, checked by format only) or is unusable (problem).
 */
export function classifyUrl(raw: string, pageUrl: URL, origin: URL): Target {
  const value = raw.trim();
  if (value === '') return { kind: 'problem', reason: 'empty URL' };
  if (EXTERNAL_SCHEME.test(value)) return { kind: 'external', href: value };
  if (NON_HTTP_SCHEME.test(value)) return { kind: 'problem', reason: `unsupported scheme: ${value.slice(0, 40)}` };
  let url: URL;
  try {
    url = new URL(value, pageUrl);
  } catch {
    return { kind: 'problem', reason: 'unparseable URL' };
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { kind: 'problem', reason: `unsupported scheme: ${url.protocol}` };
  }
  if (url.origin === origin.origin) return { kind: 'internal', url };
  return { kind: 'external', href: value };
}

/** Pure: true for media URLs that are inline (data:, blob:) and need no request. */
export function isInlineMedia(ref: LinkRef): boolean {
  return /^(data|blob):/i.test(ref.value.trim());
}
