import { esc } from './escape.js';
import { ctaButtons } from './layout.js';
import { T } from './i18n.js';

export const link = (href, text, extra = '') => `<a href="${href}"${extra}>${esc(text)}</a>`;

// Plain multi-column list of links. items: [{href, text, hint?}]
export function linkCols(items, cls = 'cols') {
  return `<ul class="${cls}">${items
    .map((i) => `<li>${link(i.href, i.text, i.lang ? ` lang="${i.lang}"` : '')}${i.hint ? ` <span class="hint">${esc(i.hint)}</span>` : ''}</li>`)
    .join('')}</ul>`;
}

// Receipt-style estimate card, the signature element.
export function estimateCard(lang, { title, items, total, meta }) {
  const t = T[lang].ui;
  const rows = items
    .map((i) => `<li><span class="it">${esc(i)}</span><span class="dots" aria-hidden="true"></span><span class="ok" aria-hidden="true">✓</span></li>`)
    .join('');
  return `<section class="estimate" aria-labelledby="est-h">
<h2 id="est-h">${esc(title)}</h2>
<ul class="est-list">${rows}</ul>
<p class="est-total"><span>${esc(t.total)}</span><span class="dots" aria-hidden="true"></span><strong>${esc(total)}</strong></p>
<p class="est-meta">${esc(meta)}</p>
</section>`;
}

export function faqHtml(title, items) {
  if (!items.length) return '';
  const body = items
    .map((i) => `<details><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>`)
    .join('\n');
  return `<section class="faq"><h2>${esc(title)}</h2>\n${body}\n</section>`;
}

export function steps(title, list) {
  const li = list.map((s) => `<li><strong>${esc(s.t)}.</strong> ${esc(s.d)}</li>`).join('');
  return `<section><h2>${esc(title)}</h2><ol class="steps">${li}</ol></section>`;
}

export function ctaBlock(lang, { title, text }, msg) {
  return `<section class="cta-block"><h2>${esc(title)}</h2><p>${esc(text)}</p><p class="btns">${ctaButtons(lang, msg, { phone: true, mail: true })}</p></section>`;
}
