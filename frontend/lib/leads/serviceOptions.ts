import type { CategoryView } from '@/lib/catalog/localize';
import type { ProductCardDto } from '@/types/api';
import type { ComboboxGroup, ComboboxOption } from '@/types/combobox';
import type { ProductOption } from '@/types/lead';

/** Value sent when the visitor is not sure and wants a consultation (no product). */
export const CONSULTATION_VALUE = '';
/** Value sent for a task that is not in the catalog. Passes the backend slug check. */
export const OTHER_VALUE = 'other';

export interface ServiceLabels {
  consultation: string;
  other: string;
}

/** Lower-case, trimmed, ё folded to е, single spaces. Used on both sides of a search. */
export function normalizeSearch(text: string): string {
  return text.trim().toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ');
}

/** Groups the products by category, keeping the order in which categories first appear. */
function groupByCategory(products: ProductOption[]): ComboboxGroup[] {
  const byCategory = new Map<string, ComboboxOption[]>();
  for (const product of products) {
    const key = product.category ?? '';
    const options = byCategory.get(key) ?? [];
    options.push({ value: product.slug, label: product.title });
    byCategory.set(key, options);
  }
  return [...byCategory].map(([label, options]) => ({ label: label || undefined, options }));
}

/** Pinned consultation and other rows first, then the products grouped by category. */
export function buildServiceGroups(products: ProductOption[], labels: ServiceLabels): ComboboxGroup[] {
  const pinned: ComboboxGroup = {
    pinned: true,
    options: [
      { value: CONSULTATION_VALUE, label: labels.consultation },
      { value: OTHER_VALUE, label: labels.other },
    ],
  };
  return [pinned, ...groupByCategory(products)];
}

/** Keeps the options whose label contains the query. Pinned groups are kept as they are. Empty query keeps everything. */
export function filterServiceGroups(groups: ComboboxGroup[], query: string): ComboboxGroup[] {
  const needle = normalizeSearch(query);
  if (needle === '') return groups;
  return groups.flatMap((group) => {
    if (group.pinned) return [group];
    const options = group.options.filter((option) => normalizeSearch(option.label).includes(needle));
    return options.length > 0 ? [{ ...group, options }] : [];
  });
}

/** Sorts products by category order and attaches the localized category name. */
export function toProductOptions(products: ProductCardDto[], categories: CategoryView[]): ProductOption[] {
  const rank = new Map(categories.map((category, index) => [category.slug, index]));
  const names = new Map(categories.map((category) => [category.slug, category.name]));
  const lastRank = categories.length;
  const rankOf = (slug: string): number => rank.get(slug) ?? lastRank;
  return [...products]
    .sort((a, b) => rankOf(a.category) - rankOf(b.category))
    .map((product) => ({
      slug: product.slug,
      title: product.title,
      category: names.get(product.category) ?? product.category,
    }));
}
