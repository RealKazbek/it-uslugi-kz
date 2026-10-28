import type { Step } from './dict/types';
import { processEn } from './dict/en/process';
import { processKk } from './dict/kk/process';
import { processRu } from './dict/ru/process';
import type { Lang } from './locales';
import type { Unit } from '@/types/api';

const TABLES: Record<Lang, Record<string, Step[]>> = { ru: processRu, kk: processKk, en: processEn };

/**
 * 4-step process for a product. Looks up `${category}-${unit}` first, then `category`.
 * Returns [] when neither key exists, so the page can hide the section.
 */
export function selectProcess(lang: Lang, category: string, unit: Unit): Step[] {
  const table = TABLES[lang];
  return table[`${category}-${unit}`] ?? table[category] ?? [];
}
