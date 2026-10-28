import type { Lang } from '@/lib/i18n/locales';
import type { CityDto } from '@/types/api';
import { apiGet, apiGetOrNull } from './client';

/** Cities exist in ru and kk only. Callers must not request en. */
export function getCities(lang: Exclude<Lang, 'en'>): Promise<CityDto[]> {
  return apiGet<CityDto[]>(`/api/cities?lang=${lang}`, { tags: ['cities'] });
}

/** Null when the city does not exist (API 404). */
export function getCity(lang: Exclude<Lang, 'en'>, slug: string): Promise<CityDto | null> {
  return apiGetOrNull<CityDto>(`/api/cities/${encodeURIComponent(slug)}?lang=${lang}`, {
    tags: ['cities', `city:${slug}`, 'products'],
  });
}
