import type { SearchDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import type { SearchDoc } from '@/lib/search/types';
import { ResultRow } from './ResultRow';
import { RequestLine } from './RequestLine';
import { formatKzt } from '@/lib/format/price';

export interface EmptyStateProps {
  lang: Lang;
  popular: SearchDoc[];
  labels: Pick<SearchDict, 'popular' | 'priceFrom' | 'request'>;
  idPrefix: string;
  activeId?: string;
  onSelect: (doc: SearchDoc) => void;
  onHover: (doc: SearchDoc) => void;
  onBeforeRequest: () => void;
}

/** Shown with an empty query and no recents: popular products, then the request line. */
export function EmptyState({ lang, popular, labels, idPrefix, activeId, onSelect, onHover, onBeforeRequest }: EmptyStateProps) {
  return (
    <section aria-label={labels.popular} className="px-1">
      <h3 className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{labels.popular}</h3>
      <div role="listbox" aria-label={labels.popular}>
        {popular.map((doc) => {
          const rowId = `${idPrefix}-${doc.id}`;
          return (
            <ResultRow
              key={doc.id}
              id={rowId}
              href={doc.href}
              title={doc.title}
              subtitle={doc.subtitle}
              price={doc.priceFrom === undefined ? undefined : labels.priceFrom.replace('{0}', formatKzt(doc.priceFrom, lang))}
              active={rowId === activeId}
              onSelect={() => onSelect(doc)}
              onHover={() => onHover(doc)}
            />
          );
        })}
      </div>
      <RequestLine label={labels.request} onBeforeOpen={onBeforeRequest} />
    </section>
  );
}
