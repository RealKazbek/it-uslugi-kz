export const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

export const endDot = (s) => {
  const t = String(s ?? '').trim();
  return /[.!?…]$/.test(t) ? t : `${t}.`;
};

export const list = (arr) => arr.join(', ');

function rangeText(d, word) {
  if (!d || !d.max) return null;
  return d.min === d.max ? `${d.max}` : `${d.min}–${d.max}`;
}

function ruDayWord(n) {
  const m = n % 100;
  const l = n % 10;
  if (m > 10 && m < 20) return 'рабочих дней';
  if (l === 1) return 'рабочий день';
  if (l >= 2 && l <= 4) return 'рабочих дня';
  return 'рабочих дней';
}

export function daysText(lang, d) {
  const r = rangeText(d);
  if (!r) return null;
  if (lang === 'kk') return `${r} жұмыс күні`;
  return d.min === d.max ? `${r} ${ruDayWord(d.max)}` : `${r} рабочих дней`;
}
