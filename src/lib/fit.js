// Pick the first candidate that fits `max` characters; otherwise the shortest one.
export function fit(candidates, max) {
  const ok = candidates.find((c) => c.length <= max);
  if (ok) return ok;
  return candidates.reduce((a, b) => (b.length < a.length ? b : a));
}

export const TITLE_MAX = 70;
export const DESC_MAX = 200;
