// v2 independent check (read-only on dist/): page set, contacts/CTAs, WhatsApp prefill, legal words, gmail,
// brand/favicon, unique title/desc, canonical, hreflang reciprocity, JSON-LD types, sitemap alternates, links, CNAME.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { config } from '../src/data/config.js';
const dist = new URL('../dist/', import.meta.url).pathname;
const SITE = config.siteUrl;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist); const html = files.filter((f) => f.endsWith('.html'));
const urlOf = (f) => f.slice(dist.length - 1).replace(/index\.html$/, '');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')]));
const exists = (p) => { p = decodeURI(p.split('#')[0].split('?')[0]); return p.endsWith('/') ? existsSync(join(dist, p, 'index.html')) : existsSync(join(dist, p)); };
const issues = {}; const bump = (k, u) => (issues[k] ||= []).push(u);
const count = {}; const titles = new Map(), descs = new Map(), alt = new Map(); const ld = {};
const lang = (u) => (u.startsWith('/kk/') ? 'kk' : u.startsWith('/en/') ? 'en' : 'ru');
const typeOf = (u) => { if (u === '/404.html') return '404'; const p = u.split('/').filter(Boolean); if (p[0] === 'kk' || p[0] === 'en') p.shift(); if (!p.length) return 'home'; if (p[0] === 'catalog') return p.length === 1 ? 'catalog' : 'hub'; return p[0]; };
const LEGAL = /(^|[^\p{L}])(ИП|ТОО|ЖК|ЖШС|НДС|ҚҚС)(?![\p{L}])|сч[её]т-фактур|шот-фактур|invoice|\bVAT\b|юрлиц|юридическ\p{L}* лиц|официальн\p{L}* договор|legal entity|registered company|ИП\b/giu;
const strip = (s) => { for (const l of Object.values(config.legal)) s = s.split(l).join(''); return s; };
const BAD = /отзыв\p{L}* клиентов|\b\d{2,}\+? (клиентов|проектов|clients|projects)|рейтинг \d|guarantee(d)? (top|first)|гарантир\p{L}* (топ|первое|место)|100%/giu;
for (const f of html) {
  const u = urlOf(f); const h = readFileSync(f, 'utf8'); const L = lang(u); const T = typeOf(u);
  count[L + ':' + T] = (count[L + ':' + T] || 0) + 1;
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  (titles.get(title) || titles.set(title, []).get(title)).push(u);
  let desc, canon, noindex = false; const alts = [];
  for (const m of h.matchAll(/<(meta|link)\b[^>]*>/g)) { const a = attrs(m[0]);
    if (m[1] === 'meta' && a.name === 'description') desc = a.content;
    if (m[1] === 'meta' && a.name === 'robots' && /noindex/.test(a.content)) noindex = true;
    if (m[1] === 'link' && a.rel === 'canonical') canon = a.href;
    if (m[1] === 'link' && a.rel === 'alternate' && a.hreflang) alts.push([a.hreflang, a.href]);
    if (m[1] === 'link' && a.rel === 'icon' && a.href !== '/favicon.svg') bump('icon href ' + a.href, u); }
  if (!/<link rel="icon"[^>]*href="\/favicon.svg"/.test(h)) bump('no favicon link', u);
  (descs.get(desc) || descs.set(desc, []).get(desc)).push(u);
  if (!noindex && canon !== SITE + u) bump('canonical mismatch', u);
  if (alts.length) alt.set(u, alts);
  if (T === 'goroda') { if (alts.map((a) => a[0]).sort().join() !== 'kk,ru,x-default') bump('city hreflang set', u); }
  else if (T !== '404' && alts.map((a) => a[0]).sort().join() !== 'en,kk,ru,x-default') bump('hreflang set ' + alts.map((a) => a[0]).join(), u);
  // brand
  if (!/<a class="brand"[^>]*><svg class="logo"/.test(h.slice(0, h.indexOf('</header>') + 1))) bump('no RK svg in header', u);
  if (!/RK Dev/.test(h.slice(0, h.indexOf('</header>') + 1))) bump('no wordmark in header', u);
  // contacts
  const body = h.slice(h.indexOf('<body'));
  const waLinks = [...body.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'"));
  if (T !== '404') { if (!waLinks.length) bump('no wa.me', u); if (!body.includes('https://t.me/RealKazbek')) bump('no telegram', u);
    if (!body.includes('href="tel:+77066620060"')) bump('no tel', u); if (!body.includes(config.phoneDisplay)) bump('no phone display', u);
    if (!body.includes('37765@iitu.edu.kz')) bump('no email', u); }
  for (const w of waLinks) if (!w.startsWith('https://wa.me/77066620060')) bump('wrong wa ' + w, u);
  // WA before TG in first CTA block
  const iw = body.search(/href="https:\/\/wa\.me/), it = body.search(/href="https:\/\/t\.me\/RealKazbek"/);
  if (T !== '404' && iw > it) bump('Telegram before WhatsApp', u);
  if (T === 'products') { const want = SITE + u; const pre = waLinks.map((w) => { try { return decodeURIComponent(new URL(w).searchParams.get('text') || ''); } catch { return ''; } });
    const t1 = (h.match(/<h1>([^<]*)<\/h1>/) || [])[1]?.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
    if (!pre.some((p) => p.includes(want) && p.includes(t1))) bump('product WA not prefilled with title+url', u + ' ' + pre[0]); }
  if (/[a-z0-9._-]+@gmail\.com/i.test(h)) bump('gmail', u);
  const txt = strip(h.replace(/<script[\s\S]*?<\/script>/g, (s) => (s.includes('ld+json') ? s : '')).replace(/<[^>]+>/g, ' ')).replace(/&[#\w]+;/g, ' ');
  for (const m of txt.matchAll(LEGAL)) bump('LEGAL word "' + m[0].trim() + '"', u);
  for (const m of txt.matchAll(BAD)) bump('honesty pattern "' + m[0] + '"', u);
  if (['contacts', 'kontakty', 'bailanys', 'prices', 'ceny', 'bagalar'].includes(T) || T === 'home') if (!h.includes(config.legal[L].replace(/'/g, '&#39;')) && !h.includes(config.legal[L])) bump('legal text missing', u);
  // links
  const nob = h.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const m of nob.matchAll(/<(a|link|img|script)\b[^>]*>/g)) { const a = attrs(m[0]); const ref = a.href ?? a.src; if (!ref || /^(mailto|tel|data|#)/.test(ref)) continue;
    let p = ref.startsWith(SITE) ? ref.slice(SITE.length) || '/' : ref.startsWith('/') ? ref : null; if (!p) continue; if (!exists(p)) bump('BROKEN', u + ' -> ' + ref); }
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { let j; try { j = JSON.parse(m[1]); } catch { bump('LD parse', u); continue; }
    const s = JSON.stringify(j); if (/aggregateRating|"review"|ratingValue/i.test(s)) bump('rating in LD', u);
    for (const x of [].concat(j['@graph'] || j)) { ld[x['@type']] = (ld[x['@type']] || 0) + 1;
      if (x['@type'] === 'Service') { const o = x.offers; if (!o || o.priceCurrency !== 'KZT' || !(o.price || o.priceSpecification)) bump('Service offer', u); } } }
}
// reciprocity
for (const [u, alts] of alt) for (const [l, href] of alts) { if (l === 'x-default') continue; const t = href.slice(SITE.length); const back = alt.get(t); if (!back) { bump('alt target w/o alts', u + ' -> ' + t); continue; } if (!back.some(([, h2]) => h2 === SITE + u)) bump('not reciprocal', u + ' -> ' + t); }
for (const [t, us] of titles) if (us.length > 1) bump('dup title', us.join(' '));
for (const [d, us] of descs) if (us.length > 1) bump('dup desc', us.join(' '));
// sitemap
const sm = readFileSync(join(dist, 'sitemap.xml'), 'utf8'); const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const l of locs) if (!exists(l.slice(SITE.length))) bump('sitemap loc missing', l);
const smAlt = (sm.match(/xhtml:link/g) || []).length;
console.log('pages', html.length, 'sitemap locs', locs.length, 'sitemap alternates', smAlt, 'CNAME', readFileSync(join(dist, 'CNAME'), 'utf8').trim(), 'favicon', existsSync(join(dist, 'favicon.svg')));
console.log(Object.entries(count).sort().map(([k, v]) => k + '=' + v).join('  '));
console.log('JSON-LD', JSON.stringify(ld));
const ks = Object.keys(issues); console.log(ks.length ? 'ISSUES:' : 'NO ISSUES');
for (const k of ks) console.log(' ', k, issues[k].length, issues[k].slice(0, 3).join(' | '));
