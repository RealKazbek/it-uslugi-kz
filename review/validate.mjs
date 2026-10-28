// Scratch HTML/SEO validator: tag balance, nested <a>, duplicate ids, lang, OG, hreflang self+x-default, JSON-LD types.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const VOID = new Set(['meta', 'link', 'br', 'img', 'input', 'hr', 'source', 'wbr', 'area', 'base', 'col', 'embed', 'track']);
const issues = {}; const bump = (k, u) => { (issues[k] ||= []).push(u); };
const types = {}; let n = 0;
for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
  n++;
  const u = f.slice(dist.length - 1).replace(/index\.html$/, '');
  const h = readFileSync(f, 'utf8');
  const noScript = h.replace(/<script[\s\S]*?<\/script>/g, '');
  const stack = []; let inA = 0;
  for (const m of noScript.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g)) {
    const [, close, tg] = m; const t = tg.toLowerCase();
    if (VOID.has(t) || t === '!doctype') continue;
    if (!close) { if (t === 'a') { if (inA) bump('nested <a>', u); inA++; } stack.push(t); }
    else { if (t === 'a') inA--; const top = stack.pop(); if (top !== t) { bump(`tag mismatch ${top}/${t}`, u); break; } }
  }
  if (stack.length) bump('unclosed ' + stack.join(','), u);
  const ids = [...noScript.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) bump('duplicate id', u);
  for (const m of noScript.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(m[1])) bump('anchor target missing #' + m[1], u);
  if (!/<html lang="(ru|kk)">/.test(h)) bump('html lang', u);
  if ((u.startsWith('/kk/')) !== /<html lang="kk">/.test(h)) bump('lang/path mismatch', u);
  for (const p of ['og:title', 'og:description', 'og:url', 'og:type', 'og:locale']) if (!h.includes(`property="${p}"`)) bump('missing ' + p, u);
  if (!h.includes('og:image')) bump('no og:image', u);
  if (!/name="viewport"/.test(h)) bump('no viewport', u);
  const alts = [...h.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)];
  if (alts.length) {
    if (!alts.some((a) => a[1] === 'x-default')) bump('no x-default', u);
    if (!alts.some((a) => a[2].endsWith(u))) bump('hreflang no self-ref', u);
  }
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)]; for (const i of imgs) if (!/\salt="/.test(i[0])) bump('img no alt', u);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const j = JSON.parse(m[1]); types[j['@type']] = (types[j['@type']] || 0) + 1;
    if (j['@type'] === 'ProfessionalService') { if (!j.areaServed) bump('PS no areaServed', u); for (const o of j.makesOffer || []) if (o.priceCurrency !== 'KZT' || !/^\d+$/.test(o.price)) bump('bad offer', u); }
    if (j['@type'] === 'FAQPage') for (const q of j.mainEntity) if (!h.includes(q.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;'))) { bump('FAQ q not visible', u); break; }
    if (j['@type'] === 'BreadcrumbList') { const vis = (h.match(/<nav class="crumbs[\s\S]*?<\/nav>/) || [''])[0]; if ((vis.match(/<li/g) || []).length !== j.itemListElement.length) bump('crumb count mismatch', u); }
  }
  const h1 = (h.match(/<h1>([^<]*)/) || [])[1] || '';
  if (/\/(?:kk\/)?[a-z-]+\/[a-z-]+\/$/.test(u) && !u.startsWith('/sait-dlya/') && !u.includes('/goroda/') && !/₸/.test(h1)) bump('svc-city h1 no price', u);
  if (h.includes('wa.me')) bump('whatsapp shown although empty', u);
  if (!h.includes('t.me/RealKazbek?text=')) bump('no prefilled tg', u);
}
console.log('files', n, 'jsonld types', types);
for (const [k, v] of Object.entries(issues)) console.log(`${k}: ${v.length}  e.g. ${v.slice(0, 3).join(' ')}`);
