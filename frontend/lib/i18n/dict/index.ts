import type { Lang } from '../locales';
import { catalogEn } from './en/catalog';
import { cityEn } from './en/city';
import { contactsEn } from './en/contacts';
import { pricesEn } from './en/prices';
import { commonEn } from './en/common';
import { homeEn } from './en/home';
import { leadEn } from './en/lead';
import { productEn } from './en/product';
import { reviewsEn } from './en/reviews';
import { catalogKk } from './kk/catalog';
import { cityKk } from './kk/city';
import { contactsKk } from './kk/contacts';
import { pricesKk } from './kk/prices';
import { commonKk } from './kk/common';
import { homeKk } from './kk/home';
import { leadKk } from './kk/lead';
import { productKk } from './kk/product';
import { reviewsKk } from './kk/reviews';
import { catalogRu } from './ru/catalog';
import { cityRu } from './ru/city';
import { contactsRu } from './ru/contacts';
import { pricesRu } from './ru/prices';
import { commonRu } from './ru/common';
import { homeRu } from './ru/home';
import { leadRu } from './ru/lead';
import { productRu } from './ru/product';
import { reviewsRu } from './ru/reviews';
import type { Dict } from './types';

const DICTS: Record<Lang, Dict> = {
  ru: { common: commonRu, home: homeRu, catalog: catalogRu, product: productRu, lead: leadRu, city: cityRu, prices: pricesRu, contacts: contactsRu, reviews: reviewsRu },
  kk: { common: commonKk, home: homeKk, catalog: catalogKk, product: productKk, lead: leadKk, city: cityKk, prices: pricesKk, contacts: contactsKk, reviews: reviewsKk },
  en: { common: commonEn, home: homeEn, catalog: catalogEn, product: productEn, lead: leadEn, city: cityEn, prices: pricesEn, contacts: contactsEn, reviews: reviewsEn },
};

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
