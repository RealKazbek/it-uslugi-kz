import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from '../src/data/config.js';
import { esc } from '../src/lib/escape.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, process.env.OUT_DIR || 'dist');
const site = config.siteUrl;
const minPages = Number(process.env.MIN_PAGES ?? (process.env.DATA_DIR ? 1 : 250));
const OLD_MAIL = new RegExp('g7' + 'kazbek', 'i');
const errors = [];
const langOf = (u) => (u.startsWith('/kk/') ? 'kk' : u.startsWith('/en/') ? 'en' : 'ru');
const ALLOWED_URL = /^(\/(kk|en))?\/(|catalog\/|catalog\/[a-z0-9-]+\/|products\/[a-z0-9-]+\/|goroda\/[a-z0-9-]+\/|ceny\/|bagalar\/|prices\/|portfolio\/|kontakty\/|bailanys\/|contacts\/)$/;
const LEGAL_WORDS = [
  /(?<![\p{L}])(ИП|ТОО|ЖК|ЖШС|НДС|ҚҚС|VAT)(?![\p{L}])/u,
  /сч[её]т-фактур|шот-фактур|invoice|юрлиц|официальный договор|legal entity/i,
];
const fail = (m) => errors.push(m);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const exists = async (p) => stat(p).then((s) => s.isFile(), () => false);

const files = await walk(dist);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const rel = (f) => f.slice(dist.length).replace(/\\/g, '/');
const toUrl = (f) => {
  const r = rel(f);
  return r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r;
};

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? decode(m[1]) : null;
};

const pages = new Map(); // url -> info
for (const f of htmlFiles) {
  const html = await readFile(f, 'utf8');
  const url = toUrl(f);
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  const descTag = (html.match(/<meta name="description"[^>]*>/) || [])[0];
  const canonTag = (html.match(/<link\b[^>]*>/g) || []).find((t) => attr(t, 'rel') === 'canonical');
  const linkTags = html.match(/<link\b[^>]*>/g) || [];
  const alternates = linkTags
    .filter((t) => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang'))
    .map((t) => [attr(t, 'hreflang'), attr(t, 'href') || '']);
  const metaTags = html.match(/<meta\b[^>]*>/g) || [];
  const metaProp = (name) => {
    const t = metaTags.find((m) => attr(m, 'property') === name || attr(m, 'name') === name);
    return t ? attr(t, 'content') : null;
  };
  const robots = metaProp('robots') || '';
  const htmlLang = attr((html.match(/<html\b[^>]*>/) || [''])[0], 'lang');
  const ids = [...html.matchAll(/<[a-z][a-z0-9]*\b[^>]*?\sid="([^"]*)"/g)].map((m) => m[1]);
  const hrefs = [...html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map((m) => decode(m[1]));
  const srcs = [...html.matchAll(/<(?:link|script|img)\b[^>]*?\s(?:href|src)="([^"]*)"/g)].map((m) => decode(m[1]));
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [''])[0];
  const h1s = (html.replace(/<script[\s\S]*?<\/script>/g, '').match(/<h1[ >]/g) || []).length;
  const hasWa = /https:\/\/wa\.me\/77066620060/.test(html);
  pages.set(url, {
    file: f, url, title: title && decode(title), desc: descTag && attr(descTag, 'content'),
    canonical: canonTag && attr(canonTag, 'href'), alternates, hrefs, srcs, ld, main, h1s, html,
    metaProp, robots, htmlLang, ids, hasWa,
  });
}

// 1. count
console.log(`HTML pages: ${pages.size}`);
if (pages.size < minPages) fail(`page count ${pages.size} < required ${minPages}`);

// resolve internal link to dist file
function internalTarget(href, from) {
  if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/.test(href)) return null;
  let h = href;
  if (h.startsWith(site)) h = h.slice(site.length) || '/';
  else if (/^[a-z][a-z0-9+.-]*:/i.test(h) || h.startsWith('//')) return null;
  h = h.split('#')[0].split('?')[0];
  if (!h) return null;
  if (!h.startsWith('/')) h = new URL(h, `${site}${from}`).pathname;
  return h;
}
const fileExists = async (p) => (p.endsWith('/') ? exists(join(dist, p, 'index.html')) : exists(join(dist, p)));

// 2. links, meta, canonical, JSON-LD, h1
const inbound = new Map();
const seenTitles = new Map();
const seenDescs = new Map();
for (const p of pages.values()) {
  for (const h of [...p.hrefs, ...p.srcs]) {
    const t = internalTarget(h, p.url);
    if (t === null) continue;
    if (!(await fileExists(t))) fail(`${p.url}: broken link ${h}`);
  }
  for (const h of p.hrefs) {
    const t = internalTarget(h, p.url);
    if (t && t !== p.url) {
      if (!inbound.has(t)) inbound.set(t, new Set());
      inbound.get(t).add(p.url);
    }
  }
  if (!p.title || !p.title.trim()) fail(`${p.url}: empty title`);
  else (seenTitles.get(p.title) || seenTitles.set(p.title, []).get(p.title)).push(p.url);
  if (!p.desc || !p.desc.trim()) fail(`${p.url}: empty meta description`);
  else (seenDescs.get(p.desc) || seenDescs.set(p.desc, []).get(p.desc)).push(p.url);
  const noindex = /noindex/.test(p.robots);
  if (noindex) { if (p.canonical) fail(`${p.url}: noindex page must not have canonical`); }
  else if (!p.canonical) fail(`${p.url}: missing canonical`);
  else if (p.canonical && !p.canonical.startsWith(`${site}/`)) fail(`${p.url}: canonical not on site domain: ${p.canonical}`);
  else if (p.canonical && p.canonical !== site + p.url) fail(`${p.url}: canonical mismatch ${p.canonical}`);
  if (p.h1s !== 1) fail(`${p.url}: expected 1 <h1>, found ${p.h1s}`);
  // html lang, duplicate ids, OG/twitter tags, WhatsApp hidden when not configured
  const expectLang = langOf(p.url);
  if (p.htmlLang !== expectLang) fail(`${p.url}: <html lang="${p.htmlLang}"> expected ${expectLang}`);
  const dup = p.ids.filter((id, i) => p.ids.indexOf(id) !== i);
  if (dup.length) fail(`${p.url}: duplicate id(s) ${[...new Set(dup)].join(', ')}`);
  for (const k of ['og:title', 'og:description', 'og:url', 'og:type', 'og:locale', 'twitter:card']) {
    if (!p.metaProp(k)) fail(`${p.url}: missing ${k}`);
  }
  if (p.url !== '/404.html' && !p.hasWa) fail(`${p.url}: no wa.me/77066620060 link`);
  if (p.title && p.title.length > 70) fail(`${p.url}: title longer than 70 (${p.title.length})`);
  if (p.desc && p.desc.length > 200) fail(`${p.url}: description longer than 200 (${p.desc.length})`);
  if (p.url !== '/404.html' && !ALLOWED_URL.test(p.url)) fail(`${p.url}: URL not part of the v2 page model (old service/niche page?)`);
  if (p.url.includes('/sait-dlya/')) fail(`${p.url}: /sait-dlya/ must not exist`);
  if (!/<link rel="icon" href="\/favicon\.svg"/.test(p.html)) fail(`${p.url}: favicon link missing`);
  let legalText = p.html;
  for (const l of Object.values(config.legal)) legalText = legalText.split(l).join(' ').split(esc(l)).join(' ');
  for (const re of LEGAL_WORDS) {
    const m = legalText.match(re);
    if (m) fail(`${p.url}: forbidden legal word "${m[0]}" outside config.legal`);
  }
  if (OLD_MAIL.test(p.html)) fail(`${p.url}: old gmail address present`);
  for (const block of p.ld) {
    try {
      const j = JSON.parse(block);
      const s = JSON.stringify(j);
      if (/aggregateRating|"review"|"Review"/.test(s)) fail(`${p.url}: JSON-LD contains aggregateRating/review`);
    } catch (e) {
      fail(`${p.url}: invalid JSON-LD (${e.message})`);
    }
  }
}
for (const [t, urls] of seenTitles) if (urls.length > 1) fail(`duplicate title "${t}": ${urls.slice(0, 3).join(', ')}`);
for (const [d, urls] of seenDescs) if (urls.length > 1) fail(`duplicate description "${d.slice(0, 60)}...": ${urls.slice(0, 3).join(', ')}`);

// 3. hreflang
for (const p of pages.values()) {
  if (p.url !== '/404.html' && langOf(p.url) !== 'ru' && !p.alternates.length) fail(`${p.url}: ${langOf(p.url)} page without hreflang alternates`);
  if (p.alternates.length) {
    const own = langOf(p.url);
    const find = (l) => p.alternates.find(([x]) => x === l);
    if (!find('x-default')) fail(`${p.url}: hreflang x-default missing`);
    const self = find(own);
    if (!self || self[1] !== site + p.url) fail(`${p.url}: hreflang self-reference (${own}) missing or wrong`);
  }
  for (const [lang, href] of p.alternates) {
    if (!href.startsWith(site)) { fail(`${p.url}: hreflang ${lang} off-site`); continue; }
    const t = href.slice(site.length);
    const target = pages.get(t);
    if (!target) { fail(`${p.url}: hreflang ${lang} target missing ${t}`); continue; }
    if (!target.alternates.some(([, h]) => h === site + p.url)) fail(`${p.url}: hreflang to ${t} not reciprocal`);
  }
}

// 4. orphans
for (const p of pages.values()) {
  if (p.url === '/' || p.url === '/404.html') continue;
  if (!inbound.has(p.url)) fail(`orphan page: ${p.url}`);
}

// 5. sitemap / robots / CNAME
const sitemapFile = join(dist, 'sitemap.xml');
if (!(await exists(sitemapFile))) fail('sitemap.xml missing');
else {
  const sm = await readFile(sitemapFile, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if ((sm.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) || []).length !== locs.length) fail('sitemap: every <url> needs <lastmod>');
  const set = new Set();
  for (const l of locs) {
    if (!l.startsWith(site)) { fail(`sitemap off-site url ${l}`); continue; }
    const u = l.slice(site.length);
    set.add(u);
    if (!(await fileExists(u))) fail(`sitemap url does not exist in dist: ${u}`);
  }
  for (const u of pages.keys()) if (u !== '/404.html' && !set.has(u)) fail(`page missing from sitemap: ${u}`);
  console.log(`Sitemap URLs: ${locs.length}`);
}
if (!(await exists(join(dist, 'robots.txt')))) fail('robots.txt missing');
else if (!/Sitemap:/i.test(await readFile(join(dist, 'robots.txt'), 'utf8'))) fail('robots.txt has no Sitemap line');
if (!(await exists(join(dist, 'CNAME')))) fail('CNAME missing');
else if ((await readFile(join(dist, 'CNAME'), 'utf8')).trim() !== new URL(site).hostname) fail('CNAME content mismatch');
for (const f of ['favicon.svg', 'assets/catalog.js']) if (!(await exists(join(dist, f)))) fail(`${f} missing`);
for (const f of files) if (/\.(html|xml|txt|svg|js|css)$/.test(f) && OLD_MAIL.test(await readFile(f, 'utf8'))) fail(`${rel(f)}: old gmail address present`);
if (!(await exists(join(dist, 'assets/styles.css')))) fail('assets/styles.css missing');

// 6. near-duplicates: 5-word shingles, MinHash prefilter (128), exact Jaccard
const strip = (html) =>
  decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')).toLowerCase();
const fnv = (s) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
};
const K = 128;
let seed = 12345;
const rnd = () => ((seed = (Math.imul(seed, 1103515245) + 12345) >>> 0), seed);
const A = Uint32Array.from({ length: K }, () => rnd() | 1);
const B = Uint32Array.from({ length: K }, () => rnd());

const docs = [];
for (const p of pages.values()) {
  if (p.url === '/404.html') continue;
  const words = strip(p.main).match(/[\p{L}\p{N}]+/gu) || [];
  const set = new Set();
  for (let i = 0; i + 5 <= words.length; i++) set.add(fnv(words.slice(i, i + 5).join(' ')));
  const sig = new Uint32Array(K).fill(0xffffffff);
  for (const h of set) {
    for (let k = 0; k < K; k++) {
      const v = (Math.imul(A[k], h) + B[k]) >>> 0;
      if (v < sig[k]) sig[k] = v;
    }
  }
  docs.push({ url: p.url, set, sig });
}
const jaccard = (a, b) => {
  const [s, l] = a.size <= b.size ? [a, b] : [b, a];
  let inter = 0;
  for (const h of s) if (l.has(h)) inter++;
  const uni = a.size + b.size - inter;
  return uni ? inter / uni : 0;
};
const top = []; // top estimated pairs
const cands = [];
for (let i = 0; i < docs.length; i++) {
  const si = docs[i].sig;
  for (let j = i + 1; j < docs.length; j++) {
    const sj = docs[j].sig;
    let m = 0;
    for (let k = 0; k < K; k++) if (si[k] === sj[k]) m++;
    const est = m / K;
    if (est > 0.5) cands.push([i, j]);
    else if (top.length < 10 || est > top[top.length - 1][0]) {
      top.push([est, i, j]);
      top.sort((a, b) => b[0] - a[0]);
      if (top.length > 10) top.pop();
    }
  }
}
const scored = [];
for (const [i, j] of cands) scored.push({ a: docs[i].url, b: docs[j].url, s: jaccard(docs[i].set, docs[j].set) });
for (const [, i, j] of top) scored.push({ a: docs[i].url, b: docs[j].url, s: jaccard(docs[i].set, docs[j].set) });
scored.sort((x, y) => y.s - x.s);
console.log(`\nNear-duplicate check: ${docs.length} pages, ${cands.length} candidate pairs (MinHash est > 0.5)`);
console.log('Top 10 most similar pairs:');
for (const p of scored.slice(0, 10)) console.log(`  ${p.s.toFixed(3)}  ${p.a}  <->  ${p.b}`);
console.log(`Max similarity: ${scored.length ? scored[0].s.toFixed(3) : 'n/a'}`);
for (const p of scored) if (p.s > 0.7) fail(`near-duplicate ${p.s.toFixed(3)}: ${p.a} <-> ${p.b}`);

// summary
console.log('');
if (errors.length) {
  console.log(`FAILED: ${errors.length} problem(s)`);
  for (const e of errors.slice(0, 80)) console.log(` - ${e}`);
  if (errors.length > 80) console.log(` ... and ${errors.length - 80} more`);
  process.exit(1);
}
console.log(`OK: ${pages.size} pages, all checks passed`);
