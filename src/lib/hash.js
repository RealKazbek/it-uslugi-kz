// FNV-1a 32-bit hash: deterministic, no deps.
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Deterministically pick one variant by seed (+ optional salt so blocks vary independently).
export function pick(variants, seed, salt = '') {
  if (!variants.length) return undefined;
  return variants[fnv1a(`${seed}|${salt}`) % variants.length];
}

// Deterministically choose `n` distinct items, order shuffled by seed.
export function pickMany(items, n, seed, salt = '') {
  return items
    .map((item, i) => ({ item, k: fnv1a(`${seed}|${salt}|${i}`) }))
    .sort((a, b) => a.k - b.k)
    .slice(0, n)
    .map((o) => o.item);
}
