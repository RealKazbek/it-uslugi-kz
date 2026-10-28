import type { Lang } from '../locales';
import { catalogEn } from './en/catalog';
import { cityEn } from './en/city';
import { contactsEn } from './en/contacts';
import { portfolioEn } from './en/portfolio';
import { pricesEn } from './en/prices';
import { commonEn } from './en/common';
import { homeEn } from './en/home';
import { leadEn } from './en/lead';
import { productEn } from './en/product';
import { catalogKk } from './kk/catalog';
import { cityKk } from './kk/city';
import { contactsKk } from './kk/contacts';
import { portfolioKk } from './kk/portfolio';
import { pricesKk } from './kk/prices';
import { commonKk } from './kk/common';
import { homeKk } from './kk/home';
import { leadKk } from './kk/lead';
import { productKk } from './kk/product';
import { catalogRu } from './ru/catalog';
import { cityRu } from './ru/city';
import { contactsRu } from './ru/contacts';
import { portfolioRu } from './ru/portfolio';
import { pricesRu } from './ru/prices';
import { commonRu } from './ru/common';
import { homeRu } from './ru/home';
import { leadRu } from './ru/lead';
import { productRu } from './ru/product';
import type { Dict } from './types';

const DICTS: Record<Lang, Dict> = {
  ru: { common: commonRu, home: homeRu, catalog: catalogRu, product: productRu, lead: leadRu, city: cityRu, prices: pricesRu, portfolio: portfolioRu, contacts: contactsRu },
  kk: { common: commonKk, home: homeKk, catalog: catalogKk, product: productKk, lead: leadKk, city: cityKk, prices: pricesKk, portfolio: portfolioKk, contacts: contactsKk },
  en: { common: commonEn, home: homeEn, catalog: catalogEn, product: productEn, lead: leadEn, city: cityEn, prices: pricesEn, portfolio: portfolioEn, contacts: contactsEn },
};

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
