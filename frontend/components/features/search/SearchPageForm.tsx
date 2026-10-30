import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export interface SearchPageFormProps {
  query: string;
  labels: { placeholder: string; pageSubmit: string; label: string };
}

/** Plain GET form (works without JavaScript): /search?q=... */
export function SearchPageForm({ query, labels }: SearchPageFormProps) {
  return (
    <form role="search" method="get" className="flex max-w-xl flex-col gap-3 sm:flex-row">
      <label htmlFor="search-page-q" className="sr-only">
        {labels.label}
      </label>
      <Input
        id="search-page-q"
        name="q"
        type="search"
        defaultValue={query}
        placeholder={labels.placeholder}
        enterKeyHint="search"
        autoComplete="off"
        className="sm:flex-1"
      />
      <Button type="submit" variant="secondary">
        {labels.pageSubmit}
      </Button>
    </form>
  );
}
