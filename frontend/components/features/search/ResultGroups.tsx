import { formatKzt } from '@/lib/format/price';
import type { SearchDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import type { SearchGroup } from '@/lib/search/group';
import type { SearchDoc } from '@/lib/search/types';
import { ResultRow } from './ResultRow';

export interface ResultLabels {
  groups: SearchDict['groups'];
  priceFrom: SearchDict['priceFrom'];
}

export interface ResultGroupsProps {
  lang: Lang;
  groups: SearchGroup[];
  labels: ResultLabels;
  /** DOM id prefix; rows get `${idPrefix}-${doc.id}` so aria-activedescendant can point at them. */
  idPrefix: string;
  activeId?: string;
  onSelect?: (doc: SearchDoc) => void;
  onHover?: (doc: SearchDoc) => void;
}

/** Grouped result list, one heading per kind. Usable from the server page (no handlers) and the palette. */
export function ResultGroups({ lang, groups, labels, idPrefix, activeId, onSelect, onHover }: ResultGroupsProps) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <section key={group.kind} aria-labelledby={`${idPrefix}-${group.kind}`}>
          <h3 id={`${idPrefix}-${group.kind}`} className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.groups[group.kind]}
          </h3>
          <div role="listbox" aria-labelledby={`${idPrefix}-${group.kind}`}>
            {group.hits.map(({ doc }) => {
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
                  onSelect={onSelect ? () => onSelect(doc) : undefined}
                  onHover={onHover ? () => onHover(doc) : undefined}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
