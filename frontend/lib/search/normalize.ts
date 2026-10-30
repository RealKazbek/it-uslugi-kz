const NON_WORD = /[^\p{L}\p{N}\s]/gu;
const SPACES = /\s+/g;

/** Lowercase, unify ё with е, replace punctuation with spaces, collapse whitespace. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(NON_WORD, ' ')
    .replace(SPACES, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  const normalized = normalize(text);
  return normalized === '' ? [] : normalized.split(' ');
}
