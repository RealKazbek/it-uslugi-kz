'use client';

import { useId, useMemo, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ALL_CATEGORIES, filterGroups } from '@/lib/catalog/filter';
import type { CardGroup } from '@/lib/catalog/cards';
import { getDict } from '@/lib/i18n/dict';
import type { Lang } from '@/lib/i18n/locales';

interface CatalogBrowserProps {
  lang: Lang;
  groups: CardGroup[];
}

/** Category chips and text search. Without JavaScript the full grouped list is already in the HTML. */
export function CatalogBrowser({ lang, groups }: CatalogBrowserProps) {
  const d = getDict(lang).catalog;
  const searchId = useId();
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [query, setQuery] = useState('');
  const visible = useMemo(() => filterGroups(groups, category, query), [groups, category, query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <label htmlFor={searchId} className="font-semibold">
          {d.searchLabel}
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={d.searchPlaceholder}
          className="min-h-11 w-full max-w-md rounded-lg border border-line bg-paper px-3 text-ink"
        />
        <div role="group" aria-label={d.filterLabel} className="flex flex-wrap gap-2">
          {[{ slug: ALL_CATEGORIES, name: d.filterAll }, ...groups.map((g) => ({ slug: g.slug, name: g.name }))].map(
            (chip) => (
              <button
                key={chip.slug}
                type="button"
                aria-pressed={category === chip.slug}
                onClick={() => setCategory(chip.slug)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${
                  category === chip.slug ? 'border-tg bg-tg text-tgtext' : 'border-line text-ink'
                }`}
              >
                {chip.name}
              </button>
            ),
          )}
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="text-muted">{d.empty}</p>
      ) : (
        visible.map((group) => (
          <section key={group.slug} aria-labelledby={`group-${group.slug}`} className="space-y-4">
            <h2 id={`group-${group.slug}`} className="text-2xl">
              {group.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {group.cards.map((card) => (
                <ProductCard key={card.slug} card={card} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
