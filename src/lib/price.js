const NNBSP = ' ';

export function fmt(n) {
  return `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP)}${NNBSP}₸`;
}

export const units = {
  ru: { once: 'разово', month: 'в месяц', lesson: 'за урок', hour: 'за час' },
  kk: { once: 'бір реттік', month: 'айына', lesson: 'сабағына', hour: 'сағатына' },
};

export function unitText(lang, unit) {
  return units[lang][unit] || units[lang].once;
}

// "45 000 ₸ разово" / "45 000 ₸ (бір реттік)"
export function priceWithUnit(lang, n, unit) {
  const u = unitText(lang, unit);
  if (lang === 'kk' && unit === 'once') return `${fmt(n)} (${u})`;
  return `${fmt(n)} ${u}`;
}
