import { Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export interface ProductIncludesProps {
  title: string;
  items: string[];
}

/** Full "what is included" checklist in a two-column grid. */
export function ProductIncludes({ title, items }: ProductIncludesProps) {
  return (
    <Card className="p-5 md:p-6">
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
              <Check aria-hidden="true" className="size-3.5" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
