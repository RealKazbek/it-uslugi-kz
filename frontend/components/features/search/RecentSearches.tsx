import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { SearchDict } from '@/lib/i18n/dict/types';

export interface RecentSearchesProps {
  items: string[];
  labels: Pick<SearchDict, 'recent' | 'clear'>;
  onPick: (query: string) => void;
  onClear: () => void;
}

/** Last queries as buttons; picking one fills the input. Renders nothing when there are none. */
export function RecentSearches({ items, labels, onPick, onClear }: RecentSearchesProps) {
  if (items.length === 0) return null;
  return (
    <section aria-label={labels.recent} className="px-1">
      <div className="flex items-center justify-between px-2 pb-1 pt-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{labels.recent}</h3>
        <Button type="button" variant="link" size="sm" className="min-h-10 text-sm" onClick={onClear}>
          <X aria-hidden="true" className="size-4" />
          {labels.clear}
        </Button>
      </div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => onPick(item)}
              className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-foreground hover:bg-muted"
            >
              <Clock aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
