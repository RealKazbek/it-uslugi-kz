// Mirrors the backend's localized (?lang=ru|kk|en) JSON shapes. Source: backend/catalog/serializers, backend/cities/serializers.

export type Unit = 'once' | 'month' | 'lesson' | 'hour';

export interface CategoryDto {
  slug: string;
  sort: number;
  name_ru: string;
  name_kk: string;
  name_en: string;
  short_ru: string;
  short_kk: string;
  short_en: string;
  intro_ru: string;
  intro_kk: string;
  intro_en: string;
  product_count: number;
}

export interface ProductCardDto {
  slug: string;
  category: string;
  title: string;
  short: string;
  price_from_kzt: number;
  unit: Unit;
  days_min: number;
  days_max: number;
  /** Needs a visit; offered only in config.onsiteCities. */
  is_onsite: boolean;
}

export interface FaqDto {
  question: string;
  answer: string;
}

export interface ProductDto extends ProductCardDto {
  description: string;
  for_whom: string;
  includes: string[];
  not_included: string[];
  days_min: number;
  days_max: number;
  faqs: FaqDto[];
  related: ProductCardDto[];
  updated_at: string;
}

export interface CityRefDto {
  slug: string;
  name_ru: string;
  name_kk: string;
}

/** City in the flat shape. `gen` is ru-only and `attr` is kk-only; the other is null. */
export interface CityDto {
  slug: string;
  name: string;
  loc: string;
  region: string;
  market_context: string;
  sectors: string[];
  in_person: boolean;
  gen: string | null;
  attr: string | null;
  product_focus: ProductCardDto[];
  nearby: CityRefDto[];
  /** Hand-written reason per focus product (key: product slug), in the request language. */
  focus_why: Record<string, string>;
}

/** Approved client review from GET /api/reviews. `locale` is ru | kk | en. */
export interface ReviewDto {
  id: number;
  name: string;
  company: string;
  city: string;
  rating: number;
  text: string;
  locale: string;
  created_at: string;
}

export interface ReviewsResponse {
  results: ReviewDto[];
  /** 2GIS reviews page URL; empty string when not configured. */
  gis_url: string;
}
