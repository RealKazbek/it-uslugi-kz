// Print readable text of a built page (head meta + body blocks) for language review.
import { readFileSync } from 'node:fs';
for (const u of process.argv.slice(2)) {
  const h = readFileSync(new URL(`../dist${u}index.html`, import.meta.url), 'utf8');
  const g = (re) => (h.match(re) || [])[1];
  console.log(`\n==== ${u}\nTITLE: ${g(/<title>([^<]*)/)}\nDESC: ${g(/name="description" content="([^"]*)/)}`);
  const body = h.slice(h.indexOf('<body>'));
  console.log(body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<(h[1-3]|p|li|summary|section|nav|footer|div)[^>]*>/g, '\n$&').replace(/<h([1-3])[^>]*>/g, '#$1 ').replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\n\s*\n+/g, '\n'));
}
