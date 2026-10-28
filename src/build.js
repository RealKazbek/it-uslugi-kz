import { rm, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './data/config.js';
import { pages } from './lib/site.js';
import { abs } from './lib/urls.js';
import { buildAllServiceCity } from './pages/service-city.js';
import { buildAllNicheCity } from './pages/niche-city.js';
import { buildHubs } from './pages/hubs.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.env.OUT_DIR || 'dist';
const dist = join(root, outDir);

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });

buildAllServiceCity();
buildAllNicheCity();
buildHubs();

const fileFor = (path) => (path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path));
for (const p of pages) {
  const file = fileFor(p.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, p.html);
}

await copyFile(join(root, 'src/styles.css'), join(dist, 'assets/styles.css'));

const lastmod = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => p.indexable);
const urlEntries = indexable
  .map((p) => {
    const alts = p.alternates
      ? ['ru', 'kk']
          .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(p.alternates[l])}"/>`)
          .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.alternates.ru)}"/>`)
          .join('')
      : '';
    return `<url><loc>${abs(p.path)}</loc><lastmod>${lastmod}</lastmod>${alts}</url>`;
  })
  .join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>\n`,
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
await writeFile(join(dist, 'CNAME'), new URL(config.siteUrl).hostname + '\n');

console.log(`Built ${pages.length} pages (${indexable.length} in sitemap) -> ${outDir}/`);
