export const TITLE_MAX = 70;
export const DESCRIPTION_MAX = 200;

/** Shortens text to max characters at a word boundary, ending with an ellipsis. Short text is returned as is. */
export function fit(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  const base = space > max / 2 ? cut.slice(0, space) : cut;
  return `${base.replace(/[\s,;:.-]+$/, '')}…`;
}
