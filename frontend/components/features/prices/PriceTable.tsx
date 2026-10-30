import Link from 'next/link';
import type { PriceGroup } from '@/lib/prices/load';

/** One table per category. The wrapper scrolls horizontally on phones instead of squeezing the cells. */
export function PriceTable({ groups, cols }: { groups: PriceGroup[]; cols: string[] }) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.slug} aria-labelledby={`prices-${group.slug}`} className="space-y-3">
          <h2 id={`prices-${group.slug}`} className="text-2xl">{group.name}</h2>
          <div className="-mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  {cols.map((col) => (
                    <th key={col} scope="col" className="py-2 pr-4 font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={row.href} className="border-b border-border align-top">
                    <th scope="row" className="py-2 pr-4 font-semibold">
                      <Link href={row.href} className="text-foreground">{row.title}</Link>
                    </th>
                    <td className="py-2 pr-4 tabular-nums">{row.price}</td>
                    <td className="py-2 pr-4">{row.format}</td>
                    <td className="py-2 pr-4">{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
