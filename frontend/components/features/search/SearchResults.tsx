import { RequestLine } from './RequestLine';
import { ResultGroups } from './ResultGroups';
import { loadSearchDocs } from '@/lib/search/buildDocs';
import { buildIndex, groupHits, search } from '@/lib/search/index';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';

const PAGE_LIMIT = 100;

/** Server-rendered results for /search. Empty query shows a hint; no hits shows the request line. */
export async function SearchResults({ lang, query }: { lang: Lang; query: string }) {
  const d = getDict(lang).search;
  if (query === '') return <p className="text-muted-foreground">{d.pageEmpty}</p>;

  const index = buildIndex(await loadSearchDocs(lang));
  const groups = groupHits(search(index, query, { limit: PAGE_LIMIT }));
  if (groups.length === 0) {
    return (
      <div className="max-w-prose space-y-3">
        <p>{d.noResults.replace('{0}', () => query)}</p>
        <RequestLine label={d.request} />
      </div>
    );
  }
  const total = groups.reduce((sum, group) => sum + group.hits.length, 0);
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{d.resultsCount.replace("{0}", String(total))}</p>
      <ResultGroups lang={lang} groups={groups} labels={d} idPrefix="search-page" />
    </div>
  );
}
