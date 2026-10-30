import Link from 'next/link';

export interface Crumb {
  name: string;
  href: string;
}

/** Visible breadcrumb trail. The last item is the current page and is not a link. */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap gap-x-2">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">{item.name}</span>
              ) : (
                <Link href={item.href} className="text-muted-foreground">{item.name}</Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
