import Image from 'next/image';
import Link from 'next/link';
import type { CategoryView } from '@/lib/catalog/localize';
import { categoryImage } from '@/lib/media/images';
import { categoryIcon } from '@/components/features/catalog/categoryIcons';

interface CategoryTileProps {
  category: CategoryView;
  href: string;
  countLabel: string;
}

/** Photo tile with a dark gradient, name, product count and icon. Zooms and lifts on hover. */
export function CategoryTile({ category, href, countLabel }: CategoryTileProps) {
  const Icon = categoryIcon(category.slug);
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-muted text-primary-foreground no-underline transition-[box-shadow,transform] duration-base ease-out hover:shadow-card-hover motion-safe:hover:-translate-y-1 md:aspect-[3/4]"
    >
      <Image
        src={categoryImage(category.slug)}
        alt={category.name}
        width={1200}
        height={800}
        sizes="(min-width: 768px) 25vw, 50vw"
        className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-slow motion-safe:group-hover:scale-105"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
      <span aria-hidden="true" className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-lg bg-background/90 text-primary">
        <Icon className="size-5" />
      </span>
      <span className="absolute inset-x-0 bottom-0 space-y-1 p-4">
        <span className="block text-lg font-bold leading-snug">{category.name}</span>
        <span className="block text-sm text-primary-foreground/90">{countLabel}</span>
      </span>
    </Link>
  );
}
