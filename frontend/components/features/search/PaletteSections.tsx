import type { SearchDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import type { SearchGroup } from '@/lib/search/group';
import type { SearchDoc } from '@/lib/search/types';
import { EmptyState } from './EmptyState';
import { RecentSearches } from './RecentSearches';
import { RequestLine } from './RequestLine';
import { ResultGroups } from './ResultGroups';
import { ROW_ID_PREFIX } from './rowIds';

export interface PaletteSectionsProps {
  lang: Lang;
  labels: SearchDict;
  query: string;
  groups: SearchGroup[];
  recent: string[];
  popular: SearchDoc[];
  activeId?: string;
  onPickRecent: (query: string) => void;
  onClearRecent: () => void;
  onSelect: (doc: SearchDoc) => void;
  onHover: (doc: SearchDoc) => void;
  onBeforeRequest: () => void;
}

/** What the palette shows under the input: recents and popular products (empty query), results, or no-results. */
export function PaletteSections(props: PaletteSectionsProps) {
  const { lang, labels, query, groups, recent, popular, activeId, onSelect, onHover, onBeforeRequest } = props;
  if (query === '') {
    return (
      <div className="flex flex-col gap-2">
        <RecentSearches items={recent} labels={labels} onPick={props.onPickRecent} onClear={props.onClearRecent} />
        <EmptyState
          lang={lang}
          popular={popular}
          labels={labels}
          idPrefix={ROW_ID_PREFIX}
          activeId={activeId}
          onSelect={onSelect}
          onHover={onHover}
          onBeforeRequest={onBeforeRequest}
        />
      </div>
    );
  }
  if (groups.length === 0) {
    return (
      <div className="px-3 py-4">
        <p className="text-muted-foreground">{labels.noResults.replace('{0}', () => query)}</p>
        <RequestLine label={labels.request} onBeforeOpen={onBeforeRequest} />
      </div>
    );
  }
  return (
    <ResultGroups
      lang={lang}
      groups={groups}
      labels={labels}
      idPrefix={ROW_ID_PREFIX}
      activeId={activeId}
      onSelect={onSelect}
      onHover={onHover}
    />
  );
}
