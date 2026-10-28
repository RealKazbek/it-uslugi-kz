// Scan visible text for residual language defects (M1 MAJOR regressions). Read-only.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pats = {
  'kk lowercase start «x': /(?:^|[.?!>]\s*|content=")«[а-яәіңғүұқөһ]/,
  'kk loc+Capital noun (Оралда Лендинг)': /[а-яәіңғүұқөһ](?:да|де|та|те) [А-ЯӘІҢҒҮҰҚӨҺ][а-яәіңғүұқөһ]+ —/,
  'kk noun then loc in link (X Оралда<)': />[^<]{2,60} [А-ЯӘІҢҒҮҰҚӨҺ][а-яәіңғүұқөһ]+(?:да|де|та|те)<\/a>/,
  'kk accusative + тапсырыс': /қызметін[^.<]{0,40}тапсырыс бер/,
  'ru 0–1 days': /0–1 (?:рабоч|жұмыс)/,
  'ru prep + Nom quote': /(?:^|[ >])(?:по|о|об|для|перед заказом|Стоимость|Закажите|Заказать) «/,
  'Кому подходит: Подходит': /Кому подходит: (?:Подходит|Для)|Кімге арналған: [^<]*арналған\./,
  'niche sector FAQ': /Подойдёт ли [^<]*сайт для [^<]*бизнесу/,
  'consumer business intro': /Репетитор[^<]{0,80}чтобы клиенты находили бизнес|помощь с компьютером[^<]{0,80}чтобы клиенты находили бизнес/,
  'Какой сайт нужен <gen>': /Какой сайт нужен [а-я]+(?:ого|ой|ии|а|ы) /,
  'double space/punct': /[а-яА-Я]  [а-я]|,,|\.\.(?!\.)| ,|\( /,
  'undefined/NaN/[object': /undefined|NaN|\[object|\$\{/,
  'kk Russian leftovers in kk prose': /<p>[^<]*(?: и | для | в городе )[^<]*<\/p>/,
};
const res = {};
for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
  const u = f.slice(dist.length - 1).replace(/index\.html$/, '');
  const h = readFileSync(f, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  const kk = u.startsWith('/kk/');
  for (const [k, re] of Object.entries(pats)) {
    if (k.startsWith('kk') && !kk) continue; if (k.startsWith('ru') && kk && k !== 'ru 0–1 days') continue;
    const m = h.match(re); if (m) (res[k] ||= []).push(u + '  «' + h.slice(Math.max(0, m.index - 40), m.index + 70).replace(/\s+/g, ' ') + '»');
  }
}
for (const k of Object.keys(pats)) console.log(`${k}: ${(res[k] || []).length}${res[k] ? '\n   ' + res[k].slice(0, 3).join('\n   ') : ''}`);
