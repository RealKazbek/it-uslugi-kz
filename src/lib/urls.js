import { config } from '../data/config.js';

const P = (lang) => (lang === 'ru' ? '' : `/${lang}`);
const by = (map) => (lang) => map[lang];

export const urls = {
  home: (lang) => (lang === 'ru' ? '/' : `/${lang}/`),
  catalog: (lang) => `${P(lang)}/catalog/`,
  category: (lang, c) => `${P(lang)}/catalog/${c}/`,
  product: (lang, s) => `${P(lang)}/products/${s}/`,
  city: (lang, c) => `${P(lang)}/goroda/${c}/`,
  prices: by({ ru: '/ceny/', kk: '/kk/bagalar/', en: '/en/prices/' }),
  portfolio: (lang) => `${P(lang)}/portfolio/`,
  contacts: by({ ru: '/kontakty/', kk: '/kk/bailanys/', en: '/en/contacts/' }),
  notFound: () => '/404.html',
};

export const abs = (path) => `${config.siteUrl}${path}`;

export function tgUrl(text) {
  const base = `https://t.me/${config.telegram}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function waUrl(text) {
  const num = String(config.whatsapp).replace(/\D/g, '');
  return text ? `https://wa.me/${num}?text=${encodeURIComponent(text)}` : `https://wa.me/${num}`;
}
