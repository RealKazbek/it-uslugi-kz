// M2 independent check: internal links (a/link/script/img), unique title+description, hreflang reciprocity,
// canonical, JSON-LD shape, sitemap/robots/CNAME, OG, orphans. Read-only on dist/.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://uslugi.realkazbek.site';
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist);
const html = files.filter((f) => f.endsWith('.html'));
const urlOf = (f) => f.slice(dist.length - 1).replace(/index\.html$/, '');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2].replace(/&amp;/g, '&')]));
const exists = (p) => { p = decodeURI(p.split('#')[0].split('?')[0]); if (p.endsWith('/')) return existsSync(join(dist, p, 'index.html')); return existsSync(join(dist, p)); };
const issues = {}; const bump = (k, u) => (issues[k] ||= []).push(u);
const titles = new Map(), descs = new Map(); const inbound = new Map(); const alt = new Map();
let links = 0, ext = 0; const types = {}; const byType = {};
for (const f of html) {
  const u = urlOf(f); const h = readFileSync(f, 'utf8');
  const p = u.split('/').filter(Boolean);
  const t = u === '/404.html' ? '404' : p[0] === 'kk' ? (p.length === 3 && p[1] !== 'goroda' ? 'kk service×city' : 'kk hub') : p[0] === 'sait-dlya' && p.length === 3 ? 'niche×city' : p.length === 2 && !['goroda', 'sait-dlya'].includes(p[0]) ? 'ru service×city' : 'ru hub';
  byType[t] = (byType[t] || 0) + 1;
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1]; if (!title) bump('no title', u); else (titles.get(title) || titles.set(title, []).get(title)).push(u);
  let desc, canon, ogs = {}, noindex = false; const alts = [];
  for (const m of h.matchAll(/<(meta|link)\b[^>]*>/g)) {
    const a = attrs(m[0]);
    if (m[1] === 'meta' && a.name === 'description') desc = a.content;
    if (m[1] === 'meta' && a.name === 'robots' && /noindex/.test(a.content)) noindex = true;
    if (m[1] === 'meta' && a.property?.startsWith('og:')) ogs[a.property] = a.content;
    if (m[1] === 'link' && a.rel === 'canonical') canon = a.href;
    if (m[1] === 'link' && a.rel === 'alternate' && a.hreflang) alts.push([a.hreflang, a.href]);
  }
  if (!desc) bump('no desc', u); else { (descs.get(desc) || descs.set(desc, []).get(desc)).push(u); if (desc.length < 50 || desc.length > 200) bump('desc length ' , u + ' ' + desc.length); }
  if (title && (title.length > 80)) bump('title >80', u + ' ' + title.length);
  if (!noindex) { if (canon !== SITE + u) bump('canonical mismatch', u + ' ' + canon); if (ogs['og:url'] !== SITE + u) bump('og:url mismatch', u); }
  else if (canon) bump('noindex with canonical', u);
  for (const k of ['og:title', 'og:description', 'og:type', 'og:url', 'og:locale', 'og:site_name']) if (!ogs[k] && !noindex) bump('missing ' + k, u);
  if (alts.length) {
    alt.set(u, alts);
    if (!alts.some(([l]) => l === 'x-default')) bump('no x-default', u);
    if (!alts.some(([, hr]) => hr === SITE + u)) bump('no self alt', u);
    const langs = alts.map(([l]) => l); if (new Set(langs).size !== langs.length) bump('dup hreflang', u);
    for (const [l] of alts) if (!['ru', 'kk', 'x-default', 'ru-KZ', 'kk-KZ'].includes(l)) bump('odd hreflang ' + l, u);
  } else if (t.startsWith('kk') ) bump('kk page without alternates', u);
  // links
  const body = h.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const m of body.matchAll(/<(a|link|img|script|source)\b[^>]*>/g)) {
    const a = attrs(m[0]); const ref = a.href ?? a.src; if (!ref) continue;
    if (/^(mailto|tel):/.test(ref)) continue;
    let path = null;
    if (ref.startsWith(SITE)) path = ref.slice(SITE.length) || '/';
    else if (/^https?:\/\//.test(ref) || ref.startsWith('//')) { ext++; continue; }
    else if (ref.startsWith('#')) continue;
    else if (ref.startsWith('/')) path = ref;
    else { bump('relative link', u + ' ' + ref); continue; }
    links++;
    if (!exists(path)) bump('BROKEN link', u + ' -> ' + ref);
    if (m[1] === 'a') { const k = path.split('#')[0]; if (k !== u) inbound.set(k, (inbound.get(k) || 0) + 1); }
  }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch { bump('JSON-LD parse', u); continue; }
    const s = JSON.stringify(j); if (/aggregateRating|"review"|ratingValue/i.test(s)) bump('rating/review in LD', u);
    for (const node of j['@graph'] || [j]) {
      types[node['@type']] = (types[node['@type']] || 0) + 1;
      if (node['@type'] === 'ProfessionalService') {
        if (!node.areaServed) bump('PS no areaServed', u);
        const offers = [].concat(node.makesOffer || node.offers || []);
        if (!offers.length && t.includes('×')) bump('PS no offer', u);
        for (const o of offers) if (o.priceCurrency !== 'KZT' || !(Number(o.price) > 0)) bump('bad offer', u);
      }
      if (node['@type'] === 'FAQPage') for (const q of node.mainEntity) if (q['@type'] !== 'Question' || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer.text) bump('bad FAQ q', u);
      if (node['@type'] === 'BreadcrumbList') node.itemListElement.forEach((it, i) => { if (it.position !== i + 1 || !it.name) bump('bad crumb', u); if (it.item && !exists(it.item.replace(SITE, ''))) bump('crumb item broken', u); });
    }
  }
  if (t.includes('×') && !/"ProfessionalService"/.test(h)) bump('svc page no PS', u);
}
// reciprocity
for (const [u, alts] of alt) for (const [l, hr] of alts) {
  if (l === 'x-default') continue; const tu = hr.replace(SITE, '');
  const back = alt.get(tu); if (!back) { bump('alt target has no alternates', u + ' -> ' + tu); continue; }
  if (!back.some(([, h2]) => h2 === SITE + u)) bump('non-reciprocal hreflang', u + ' <-> ' + tu);
  const xd = alts.find(([l]) => l === 'x-default')[1]; const xd2 = back.find(([l]) => l === 'x-default')?.[1]; if (xd !== xd2) bump('x-default differs in cluster', u);
}
for (const [k, v] of titles) if (v.length > 1) bump('DUP title', v.join(' '));
for (const [k, v] of descs) if (v.length > 1) bump('DUP desc', v.join(' '));
for (const f of html) { const u = urlOf(f); if (u !== '/' && u !== '/404.html' && !inbound.get(u)) bump('orphan', u); }
// sitemap
const sm = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ''));
for (const l of locs) if (!exists(l)) bump('sitemap loc missing', l);
const idx = html.map(urlOf).filter((u) => u !== '/404.html'); const ls = new Set(locs);
for (const u of idx) if (!ls.has(u)) bump('page not in sitemap', u);
if (new Set(locs).size !== locs.length) bump('dup sitemap loc', '');
const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
const cname = readFileSync(join(dist, 'CNAME'), 'utf8').trim();
console.log('pages', html.length, byType);
console.log('internal refs checked', links, 'external', ext, 'unique titles', titles.size, 'unique descs', descs.size, 'hreflang pages', alt.size);
console.log('JSON-LD node types', types);
console.log('sitemap locs', locs.length, 'bytes', sm.length, 'xmlns xhtml', sm.includes('xmlns:xhtml'));
console.log('robots:', JSON.stringify(robots)); console.log('CNAME:', JSON.stringify(cname));
if (!Object.keys(issues).length) console.log('NO ISSUES');
for (const [k, v] of Object.entries(issues)) console.log(`${k}: ${v.length}  e.g. ${v.slice(0, 3).join(' | ')}`);
