import { rm, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './data/config.js';
import { pages } from './lib/site.js';
import { abs } from './lib/urls.js';
import { LANGS } from './lib/i18n.js';
import { faviconSvg } from './lib/brand.js';
import { buildProducts } from './pages/product.js';
import { buildCatalog } from './pages/catalog.js';
import { buildCities } from './pages/city.js';
import { buildStatic, copyPortfolioImages } from './pages/static.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.env.OUT_DIR || 'dist';
const dist = join(root, outDir);

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });

buildProducts();
buildCatalog();
buildCities();
buildStatic();

const fileFor = (path) => (path.endsWith('/') ? join(dist, path, 'index.html') : join(dist, path));
for (const p of pages) {
  const file = fileFor(p.path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, p.html);
}

await copyFile(join(root, 'src/styles.css'), join(dist, 'assets/styles.css'));
await copyFile(join(root, 'src/assets/catalog.js'), join(dist, 'assets/catalog.js'));
await copyPortfolioImages(dist);
await writeFile(join(dist, 'favicon.svg'), faviconSvg());

const lastmod = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => p.indexable);
const urlEntries = indexable
  .map((p) => {
    const langs = p.alternates ? LANGS.filter((l) => p.alternates[l]) : [];
    const alts = langs.length > 1
      ? langs
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
