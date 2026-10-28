export const endDot = (s) => {
  const t = String(s ?? '').trim();
  return /[.!?…]$/.test(t) ? t : `${t}.`;
};

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

function ruDayNom(n) {
  const m = n % 100;
  const l = n % 10;
  if (m > 10 && m < 20) return 'рабочих дней';
  if (l === 1) return 'рабочий день';
  if (l >= 2 && l <= 4) return 'рабочих дня';
  return 'рабочих дней';
}
const ruDayGen = (n) => (n % 10 === 1 && n % 100 !== 11 ? 'рабочего дня' : 'рабочих дней');

export function daysText(lang, d) {
  const r = rangeText(d);
  if (!r) return null;
  const max = norm(d).max;
  if (lang === 'kk') return `${r} жұмыс күні`;
  if (lang === 'en') return `${r} working ${max === 1 ? 'day' : 'days'}`;
  return `${r} ${ruDayNom(max)}`;
}

export function withinText(lang, d) {
  const r = rangeText(d);
  if (!r) return null;
  const max = norm(d).max;
  if (lang === 'kk') return `${r} жұмыс күні ішінде`;
  if (lang === 'en') return `within ${r} working ${max === 1 ? 'day' : 'days'}`;
  return `в течение ${r} ${ruDayGen(max)}`;
}

// Labelled timeline: one-off work shows a term, month/lesson/hour units only a start time.
export function termText(lang, p) {
  const label = { ru: ['Срок', 'Старт'], kk: ['Мерзімі', 'Бастау'], en: ['Timeline', 'Start'] }[lang];
  if (p.unit === 'once') {
    const d = daysText(lang, p.days);
    return d ? `${label[0]}: ${d}` : null;
  }
  const w = withinText(lang, p.days);
  return w ? `${label[1]}: ${w}` : null;
}
