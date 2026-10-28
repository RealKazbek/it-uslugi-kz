export const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export const endDot = (s) => {
  const t = String(s ?? '').trim();
  return /[.!?…]$/.test(t) ? t : `${t}.`;
};

export const list = (arr) => arr.join(', ');

// Kazakh: lowercase the first letter of a service name inside a sentence,
// unless it starts with a Latin letter/digit (brand: Telegram, SEO, CRM, 2GIS) or a Cyrillic acronym.
export function lcName(s) {
  if (!s) return s;
  if (/^[A-Za-z0-9]/.test(s) || /^\p{Lu}{2}/u.test(s)) return s;
  return s[0].toLowerCase() + s.slice(1);
}

// Working days are never "0": a minimum below 1 is shown as 1.
function norm(d) {
  if (!d || !d.max) return null;
  const min = Math.max(1, d.min || 1);
  return { min: Math.min(min, d.max), max: d.max };
}

function rangeText(d) {
  const n = norm(d);
  if (!n) return null;
  return n.min === n.max ? `${n.max}` : `${n.min}–${n.max}`;
}

// Nominative: "1 рабочий день", "2–4 рабочих дня", "3–7 рабочих дней"
function ruDayNom(n) {
  const m = n % 100;
  const l = n % 10;
  if (m > 10 && m < 20) return 'рабочих дней';
  if (l === 1) return 'рабочий день';
  if (l >= 2 && l <= 4) return 'рабочих дня';
  return 'рабочих дней';
}

// Genitive (after "в течение"): "1 рабочего дня", otherwise "рабочих дней"
function ruDayGen(n) {
  return n % 10 === 1 && n % 100 !== 11 ? 'рабочего дня' : 'рабочих дней';
}

export function daysText(lang, d) {
  const r = rangeText(d);
  if (!r) return null;
  if (lang === 'kk') return `${r} жұмыс күні`;
  return `${r} ${ruDayNom(norm(d).max)}`;
}

// "в течение 1 рабочего дня" / "1 жұмыс күні ішінде"
export function withinText(lang, d) {
  const r = rangeText(d);
  if (!r) return null;
  if (lang === 'kk') return `${r} жұмыс күні ішінде`;
  return `в течение ${r} ${ruDayGen(norm(d).max)}`;
}

// Timeline for tables: one-off services show a term, subscriptions/lessons/hours show the start time.
export function termText(lang, s) {
  if (s.unit === 'once') return daysText(lang, s.days);
  const w = withinText(lang, s.days);
  if (!w) return null;
  return lang === 'kk' ? `бастау: ${w}` : `старт ${w}`;
}
