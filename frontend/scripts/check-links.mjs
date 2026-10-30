// Crawls the running site: every page in /sitemap.xml must answer 200, and every internal href found on
// those pages must too. Usage: BASE=http://127.0.0.1:3000 node scripts/check-links.mjs
const BASE = (process.env.BASE ?? 'http://127.0.0.1:3000').replace(/\/$/, '');

const get = async (url) => {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, body: res.status === 200 ? await res.text() : '' };
};

const sitemap = await get(`${BASE}/sitemap.xml`);
if (sitemap.status !== 200) throw new Error(`sitemap.xml answered ${sitemap.status}`);
const pages = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = new Set(pages);
const failures = [];
const queue = [...pages];

while (queue.length > 0) {
  const batch = queue.splice(0, 8);
  await Promise.all(
    batch.map(async (path) => {
      const { status, body } = await get(BASE + path);
      if (status !== 200) return void failures.push(`${status} ${path}`);
      for (const m of body.matchAll(/href="(\/[^"#?]*)"/g)) {
        const href = m[1];
        if (/\.(svg|png|webp|ico|xml|txt)$/.test(href) || href.startsWith('/_next') || seen.has(href)) continue;
        seen.add(href);
        queue.push(href);
      }
    }),
  );
}

console.log(`checked ${seen.size} URLs`);
if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
