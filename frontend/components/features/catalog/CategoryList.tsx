import Link from 'next/link';
import type { CategoryView } from '@/lib/catalog/localize';

export function CategoryList({ categories, hrefFor, countLabel }: {
  categories: CategoryView[];
  hrefFor: (slug: string) => string;
  countLabel: (n: number) => string;
}) {
  return (
    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      {categories.map((category) => (
        <li key={category.slug} className="border-t border-border pt-4">
          <Link href={hrefFor(category.slug)} className="text-lg font-bold text-foreground no-underline hover:underline">
            {category.name}
          </Link>
          <p className="text-muted-foreground">{category.short}</p>
          <p className="text-sm text-muted-foreground">{countLabel(category.productCount)}</p>
        </li>
      ))}
    </ul>
  );
}
