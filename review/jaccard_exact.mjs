// Independent exact Jaccard (word 5-shingles as strings, no hashing) on <main> text.
// Exhaustive over all same-service (per lang), same-niche, same-city groups; plus 300 random pairs.
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
const docs = new Map();
for (const f of walk(dist).filter((f) => f.endsWith('index.html'))) {
  const url = f.slice(dist.length - 1).replace(/index\.html$/, '');
  const w = text(readFileSync(f, 'utf8')).match(/[\p{L}\p{N}]+/gu) || [];
  const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  docs.set(url, s);
}
const J = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i); };
const groups = new Map(); const add = (k, u) => (groups.get(k) || groups.set(k, []).get(k)).push(u);
for (const u of docs.keys()) {
  const p = u.split('/').filter(Boolean);
  if (p[0] === 'kk' && p.length === 3) { add('kk-svc:' + p[1], u); add('kk-city:' + p[2], u); }
  else if (p[0] === 'sait-dlya' && p.length === 3) { add('niche:' + p[1], u); add('ncity:' + p[2], u); }
  else if (p.length === 2 && p[0] !== 'goroda' && p[0] !== 'kk' && p[0] !== 'sait-dlya') { add('svc:' + p[0], u); add('city:' + p[1], u); }
  else add('hubs', u);
}
let n = 0; const res = [];
for (const [, us] of groups) for (let i = 0; i < us.length; i++) for (let j = i + 1; j < us.length; j++) { n++; res.push([J(docs.get(us[i]), docs.get(us[j])), us[i], us[j]]); }
const all = [...docs.keys()]; let seed = 7; const r = () => ((seed = (seed * 48271) % 2147483647), seed);
for (let k = 0; k < 300; k++) { const a = all[r() % all.length], b = all[r() % all.length]; if (a !== b) { n++; res.push([J(docs.get(a), docs.get(b)), a, b]); } }
res.sort((a, b) => b[0] - a[0]);
console.log(`docs=${docs.size} pairs=${n}`);
console.log('>0.70:', res.filter((x) => x[0] > 0.7).length, ' >0.60:', res.filter((x) => x[0] > 0.6).length, ' >0.50:', res.filter((x) => x[0] > 0.5).length);
for (const x of res.slice(0, 15)) console.log(x[0].toFixed(3), x[1], x[2]);
const by = {}; for (const [s, a] of res) { const k = a.split('/')[1] === 'kk' ? 'kk' : a.startsWith('/sait-dlya/') ? 'niche' : 'ru'; (by[k] ||= []).push(s); }
for (const k in by) { const v = by[k].sort((a, b) => a - b); console.log(k, 'median', v[v.length >> 1].toFixed(3), 'p99', v[Math.floor(v.length * 0.99)].toFixed(3), 'max', v[v.length - 1].toFixed(3)); }
