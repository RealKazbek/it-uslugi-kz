/** Optimal-string-alignment Damerau-Levenshtein distance (adjacent transpositions count as 1). */
export function damerauLevenshtein(a: string, b: string): number {
  const n = a.length;
  const m = b.length;
  const w = m + 1;
  const d = new Array<number>((n + 1) * w).fill(0);
  for (let i = 0; i <= n; i++) d[i * w] = i;
  for (let j = 0; j <= m; j++) d[j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
      let v = Math.min(d[(i - 1) * w + j]! + 1, d[i * w + j - 1]! + 1, d[(i - 1) * w + j - 1]! + cost);
      if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
        v = Math.min(v, d[(i - 2) * w + j - 2]! + 1);
      }
      d[i * w + j] = v;
    }
  }
  return d[n * w + m] ?? 0;
}
