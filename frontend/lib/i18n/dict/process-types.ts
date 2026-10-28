import type { Lang } from '@/lib/i18n/locales';
import type { Step } from './types';

/** Process keys: `${category}-${unit}` or a category slug. See lib/i18n/process.ts. */
export type ProcessTable = Record<string, Step[]>;

export type ProcessByLang = Record<Lang, ProcessTable>;
