import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { CategoryView } from '@/lib/catalog/localize';
import { categoryIcon } from './categoryIcons';

interface CategoryTilesProps {
  categories: CategoryView[];
  hrefFor: (slug: string) => string;
  countLabel: (n: number) => string;
}

/** Category tiles with icon, name and product count. */
export function CategoryTiles({ categories, hrefFor, countLabel }: CategoryTilesProps) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {categories.map((category) => {
        const Icon = categoryIcon(category.slug);
        return (
          <li key={category.slug}>
            <Card interactive className="group relative flex h-full items-center gap-3 p-4 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <Link href={hrefFor(category.slug)} className="block truncate font-bold text-foreground no-underline after:absolute after:inset-0 after:content-['']">
                  {category.name}
                </Link>
                <span className="text-sm text-muted-foreground">{countLabel(category.productCount)}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground" />
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
