export type SlugKind = 'products' | 'categories' | 'cities';

/** Raw answer of GET /api/slugs. */
export interface SlugPayload {
  products: string[];
  categories: string[];
  cities: string[];
}
