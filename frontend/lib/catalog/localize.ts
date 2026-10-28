import type { Lang } from '@/lib/i18n/locales';
import type { CategoryDto } from '@/types/api';

export interface CategoryView {
  slug: string;
  name: string;
  short: string;
  intro: string;
  productCount: number;
}

/** Picks the language columns of a category for display. */
export function categoryView(dto: CategoryDto, lang: Lang): CategoryView {
  const pick = (base: 'name' | 'short' | 'intro'): string => {
    switch (lang) {
      case 'ru':
        return dto[`${base}_ru`];
      case 'kk':
        return dto[`${base}_kk`];
      case 'en':
        return dto[`${base}_en`];
    }
  };
  return {
    slug: dto.slug,
    name: pick('name'),
    short: pick('short'),
    intro: pick('intro'),
    productCount: dto.product_count,
  };
}
