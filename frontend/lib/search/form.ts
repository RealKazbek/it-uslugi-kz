import { damerauLevenshtein } from './distance';
import { toLatin } from './translit';

/** A token in two comparable shapes: its raw text and a script-independent phonetic key. */
export interface Form {
  raw: string;
  key: string;
}

const FOLD_RULES: readonly [RegExp, string][] = [
  [/wh|w/g, 'v'],
  [/ph/g, 'f'],
  [/shch|sh|zh/g, 's'],
  [/ch/g, 'h'],
  [/ck|c|q/g, 'k'],
  [/z/g, 's'],
  [/y/g, 'i'],
  [/x/g, 'ks'],
  [/[^a-z0-9]/g, ''],
  [/(.)\1+/g, '$1'],
];

/** Latin-folded key so that "телеграм", "Telegram" and "telegramm" share one key. */
export function phoneticKey(token: string): string {
  return FOLD_RULES.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), toLatin(token));
}

export function makeForm(token: string): Form {
  return { raw: token, key: phoneticKey(token) };
}

/** 0 = no match; higher = better. Mirrors the rules in the search spec. */
export const QUALITY = {
  exact: 1,
  translit: 0.95,
  prefix: 0.8,
  substring: 0.6,
  fuzzy: 0.5,
} as const;

function fuzzyAllowance(length: number): number {
  if (length >= 7) return 2;
  if (length >= 4) return 1;
  return 0;
}

export function matchQuality(query: Form, doc: Form): number {
  if (query.raw === doc.raw) return QUALITY.exact;
  if (query.key === doc.key) return QUALITY.translit;
  const prefix =
    (query.raw.length >= 2 && doc.raw.startsWith(query.raw)) ||
    (query.key.length >= 2 && doc.key.startsWith(query.key));
  if (prefix) return QUALITY.prefix;
  const substring =
    (query.raw.length >= 3 && doc.raw.includes(query.raw)) ||
    (query.key.length >= 3 && doc.key.includes(query.key));
  if (substring) return QUALITY.substring;
  const allowance = fuzzyAllowance(query.key.length);
  if (allowance === 0 || Math.abs(query.key.length - doc.key.length) > allowance) return 0;
  if (damerauLevenshtein(query.key, doc.key) <= allowance) return QUALITY.fuzzy;
  return 0;
}
