import { getDict } from '@/lib/i18n/dict';
import { LANGS, HTML_LANG, type Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';

const esc = (value: string): string => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Full 404 document, built from the dictionary. The middleware returns it directly with status 404,
 * because Next cannot render a not-found page as server HTML in this layout (no root layout, see M3 notes).
 * `lang` (from the URL) sets <html lang>; each language block below carries its own lang attribute.
 */
export function notFoundHtml(lang: Lang): string {
  const blocks = LANGS.map((block) => {
    const d = getDict(block).common.notFound;
    return `<section lang="${HTML_LANG[block]}"><h2>${esc(d.title)}</h2><p>${esc(d.text)}</p><p><a href="${localePath(block, '/')}">${esc(d.home)}</a> · <a href="${localePath(block, '/catalog')}">${esc(d.catalog)}</a></p></section>`;
  }).join('\n');
  const title = esc(`404: Страница не найдена | Бет табылмады | Page not found`);
  return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<link rel="icon" href="/favicon.svg">
</head>
<body style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;margin:0;padding:0 16px;line-height:1.6">
<main style="max-width:64rem;margin:0 auto;padding:64px 0">
<h1>404</h1>
${blocks}
</main>
</body>
</html>`;
}
