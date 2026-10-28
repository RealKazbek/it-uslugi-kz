import type { Lang } from '../locales';
import { catalogEn } from './en/catalog';
import { commonEn } from './en/common';
import { homeEn } from './en/home';
import { leadEn } from './en/lead';
import { productEn } from './en/product';
import { catalogKk } from './kk/catalog';
import { commonKk } from './kk/common';
import { homeKk } from './kk/home';
import { leadKk } from './kk/lead';
import { productKk } from './kk/product';
import { catalogRu } from './ru/catalog';
import { commonRu } from './ru/common';
import { homeRu } from './ru/home';
import { leadRu } from './ru/lead';
import { productRu } from './ru/product';
import type { Dict } from './types';

const DICTS: Record<Lang, Dict> = {
  ru: { common: commonRu, home: homeRu, catalog: catalogRu, product: productRu, lead: leadRu },
  kk: { common: commonKk, home: homeKk, catalog: catalogKk, product: productKk, lead: leadKk },
  en: { common: commonEn, home: homeEn, catalog: catalogEn, product: productEn, lead: leadEn },
};

export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
