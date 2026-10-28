import type { Lang } from '@/lib/i18n/locales';
import type { ProductCardDto, ProductDto } from '@/types/api';
import { apiGet, apiGetOrNull } from './client';

export function getProducts(lang: Lang, category?: string): Promise<ProductCardDto[]> {
  const query = new URLSearchParams({ lang });
  if (category) query.set('category', category);
  return apiGet<ProductCardDto[]>(`/api/products?${query.toString()}`, { tags: ['products'] });
}

/** Null when the product does not exist or is inactive (API 404). */
export function getProduct(lang: Lang, slug: string): Promise<ProductDto | null> {
  return apiGetOrNull<ProductDto>(`/api/products/${encodeURIComponent(slug)}?lang=${lang}`, {
    tags: [`product:${slug}`],
  });
}
