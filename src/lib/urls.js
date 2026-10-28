import { config } from '../data/config.js';

const kk = (lang) => (lang === 'kk' ? '/kk' : '');

export const urls = {
  home: (lang) => (lang === 'kk' ? '/kk/' : '/'),
  serviceHub: (lang, s) => `${kk(lang)}/${s}/`,
  serviceCity: (lang, s, c) => `${kk(lang)}/${s}/${c}/`,
  cityHub: (lang, c) => `${kk(lang)}/goroda/${c}/`,
  nicheIndex: () => '/sait-dlya/',
  nicheHub: (n) => `/sait-dlya/${n}/`,
  nicheCity: (n, c) => `/sait-dlya/${n}/${c}/`,
  prices: () => '/ceny/',
  portfolio: () => '/portfolio/',
  contacts: () => '/kontakty/',
  notFound: () => '/404.html',
};

export const abs = (path) => `${config.siteUrl}${path}`;

export function tgUrl(text) {
  const base = `https://t.me/${config.telegram}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function waUrl(text) {
  const num = String(config.whatsapp || '').replace(/\D/g, '');
  if (!num) return '';
  return text ? `https://wa.me/${num}?text=${encodeURIComponent(text)}` : `https://wa.me/${num}`;
}
