// Renders every product in ru/kk/en and checks the page content: includes list, for-whom block, timeline,
// price with ₸, 3-5 FAQ entries and a WhatsApp link prefilled with the product title.
// Usage: BASE=http://127.0.0.1:3000 API=http://127.0.0.1:8000 node scripts/check-products.mjs
const BASE = process.env.BASE ?? 'http://127.0.0.1:3000';
const API = process.env.API ?? 'http://127.0.0.1:8000';
const LANGS = ['ru', 'kk', 'en'];
const failures = [];
for (const lang of LANGS) {
  const products = await (await fetch(`${API}/api/products?lang=${lang}`)).json();
  for (const p of products) {
    const detail = await (await fetch(`${API}/api/products/${p.slug}?lang=${lang}`)).json();
    const res = await fetch(`${BASE}${lang === 'ru' ? '' : '/' + lang}/products/${p.slug}`);
    const html = (await res.text()).replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
    const where = `${lang}/${p.slug}`;
    const faqCount = detail.faqs.length;
    if (res.status !== 200) failures.push(`${where}: status ${res.status}`);
    if (faqCount < 3 || faqCount > 5) failures.push(`${where}: ${faqCount} faqs`);
    for (const faq of detail.faqs) if (!html.includes(faq.question.replace(/&/g, '&amp;').slice(0, 25))) { failures.push(`${where}: faq not rendered`); break; }
    if (detail.includes.length === 0 || !html.includes(detail.includes[0].slice(0, 20))) failures.push(`${where}: includes missing`);
    if (!detail.for_whom || !html.includes(detail.for_whom.slice(0, 20))) failures.push(`${where}: for-whom missing`);
    if (!/₸/.test(html)) failures.push(`${where}: no price`);
    if (!/\d+\s*[–-]\s*\d+|\d+/.test(detail.days_min + '')) failures.push(`${where}: timeline`);
    const wa = [...html.matchAll(/wa\.me\/\d+\?text=([^"&]+)/g)].map((m) => decodeURIComponent(m[1]));
    if (!wa.some((t) => t.includes(p.title.replace(/&/g, '')))) failures.push(`${where}: WhatsApp link without product title`);
  }
}
console.log(`checked ${LANGS.length} languages`);
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('all product pages OK');
