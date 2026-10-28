import { getCity, getCities } from '@/lib/api/cities';
import { loadCatalog } from '@/lib/catalog/load';
import { config } from '@/lib/config';
import { CITY_LANGS, type CityLang } from './types';
import { buildCityView, type CityView } from './view';

/** Data for one city page, or null when the city does not exist. Server only. */
export async function loadCityView(lang: CityLang, slug: string): Promise<CityView | null> {
  const [dto, catalog] = await Promise.all([getCity(lang, slug), loadCatalog(lang)]);
  if (dto === null) return null;
  return buildCityView({
    dto,
    lang,
    rate: config.usdRate,
    catalog: catalog.groups,
    minPriceKzt: catalog.minPriceKzt,
  });
}

/** Every city in every city language, for generateStaticParams. */
export async function cityParams(): Promise<{ lang: CityLang; slug: string }[]> {
  const lists = await Promise.all(
    CITY_LANGS.map(async (lang) => (await getCities(lang)).map((c) => ({ lang, slug: c.slug }))),
  );
  return lists.flat();
}
