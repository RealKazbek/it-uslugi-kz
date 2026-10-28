// Print readable <main> text + title/description of built pages (v2 language review).
import { readFileSync } from 'node:fs';
for (const u of process.argv.slice(2)) {
  const h = readFileSync(new URL(`../dist${u}index.html`, import.meta.url), 'utf8');
  const g = (re) => (h.match(re) || [])[1];
  const m = (h.match(/<main\b[^>]*>([\s\S]*)<\/main>/) || [])[1] || '';
  console.log(`\n==== ${u}\nTITLE: ${g(/<title>([^<]*)/)}\nDESC: ${g(/name="description" content="([^"]*)/)}`);
  console.log(m.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<(h[1-3]|p|li|summary|section|tr|dt|dd|div)[^>]*>/g, '\n$&').replace(/<h([1-3])[^>]*>/g, '#$1 ').replace(/<\/t[dh]>/g, ' | ').replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\n\s*\n+/g, '\n'));
}
