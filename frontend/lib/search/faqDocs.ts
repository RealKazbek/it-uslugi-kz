import { getSiteFaq } from '@/lib/faq/site';
import type { Lang } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/paths';
import type { SearchDoc } from './types';

const ANSWER_KEYWORD_LIMIT = 300;

/** One doc per site FAQ item. Links to the FAQ anchor; the answer text (trimmed) is searchable. */
export function faqDocs(lang: Lang): SearchDoc[] {
  return getSiteFaq(lang).flatMap((group) =>
    group.items.map((item) => ({
      id: `faq:${item.id}`,
      kind: 'faq',
      title: item.q,
      subtitle: group.title,
      href: `${localePath(lang, '/faq')}#${item.id}`,
      keywords: item.a.slice(0, ANSWER_KEYWORD_LIMIT),
    })),
  );
}
