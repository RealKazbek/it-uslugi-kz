import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';
import type { Unit } from '@/types/api';

/** Range "3–7", or a single number when both ends match. Values below 1 are shown as 1. */
export function formatDayRange(min: number, max: number): string {
  const low = Math.max(1, min);
  const high = Math.max(low, max);
  return low === high ? `${low}` : `${low}–${high}`;
}

/** One-off work shows the term; per month, lesson or hour the start delay is shown. */
export function daysText(lang: Lang, unit: Unit, min: number, max: number): string {
  const common = getDict(lang).common;
  if (unit === 'once') {
    return common.daysTerm(formatDayRange(min, max), Math.max(1, max));
  }
  return common.daysStart(Math.max(1, min));
}
