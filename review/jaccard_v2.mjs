// v2: independent exact Jaccard (word 5-shingles as strings, no hashing) on <main> text,
// exhaustive over ALL same-language page pairs (ru, kk, en). Optional arg: a URL prefix filter to dump top pairs.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const ent = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
const text = (h) => {
  const m = h.match(/<main\b[^>]*>([\s\S]*)<\/main>/i); if (!m) return '';
  return m[1].replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]*>/g, ' ')
    .replace(/&(#?\w+);/g, (_, e) => ent[e] ?? ' ').toLowerCase();
};
export const shingles = (h, sorted = false) => {
  const w = text(h).match(/[\p{L}\p{N}]+/gu) || [];
  const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
};
const docs = new Map();
for (const f of walk(dist).filter((f) => f.endsWith('index.html'))) {
  const url = f.slice(dist.length - 1).replace(/index\.html$/, '');
  docs.set(url, shingles(readFileSync(f, 'utf8')));
}
const lang = (u) => (u.startsWith('/kk/') ? 'kk' : u.startsWith('/en/') ? 'en' : 'ru');
const type = (u) => { const p = u.split('/').filter(Boolean); if (p[0] === 'kk' || p[0] === 'en') p.shift(); return p.length === 0 ? 'home' : p[0] === 'catalog' && p.length === 2 ? 'hub' : p[0]; };
const J = (a, b) => { let i = 0; const [s, l] = a.size < b.size ? [a, b] : [b, a]; for (const x of s) if (l.has(x)) i++; return i / (a.size + b.size - i); };
const all = [...docs.keys()]; const res = [];
for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
  if (lang(all[i]) !== lang(all[j])) continue;
  res.push([J(docs.get(all[i]), docs.get(all[j])), all[i], all[j]]);
}
res.sort((a, b) => b[0] - a[0]);
console.log(`docs=${docs.size} same-language pairs=${res.length}`);
console.log('>=0.70:', res.filter((x) => x[0] >= 0.7).length, ' >=0.60:', res.filter((x) => x[0] >= 0.6).length, ' >=0.50:', res.filter((x) => x[0] >= 0.5).length);
for (const x of res.slice(0, 12)) console.log(x[0].toFixed(3), x[1], x[2]);
const by = {};
for (const [s, a, b] of res) { const k = lang(a) + ':' + [type(a), type(b)].sort().join('-'); (by[k] ||= []).push(s); }
for (const k of Object.keys(by).sort()) { const v = by[k].sort((a, b) => a - b); if (v.length < 3) continue; console.log(k.padEnd(28), 'n', String(v.length).padStart(5), 'median', v[v.length >> 1].toFixed(3), 'max', v[v.length - 1].toFixed(3)); }
