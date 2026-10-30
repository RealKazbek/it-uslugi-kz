import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { PriceGroup } from '@/lib/prices/load';

/** One card per category with a price table. The table scrolls horizontally on phones instead of squeezing the cells. */
export function PriceTable({ groups, cols }: { groups: PriceGroup[]; cols: string[] }) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.slug} aria-labelledby={`prices-${group.slug}`}>
          <Card className="space-y-4 p-4 md:p-6">
            <h2 id={`prices-${group.slug}`} className="text-h3">{group.name}</h2>
            <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {cols.map((col) => (
                      <th key={col} scope="col" className="py-2 pr-4 font-semibold text-muted-foreground">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.href} className="border-b border-border align-top last:border-0">
                      <th scope="row" className="py-3 pr-4 font-semibold">
                        <Link href={row.href} className="text-foreground hover:underline">{row.title}</Link>
                      </th>
                      <td className="py-3 pr-4 font-bold tabular-nums">{row.price}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.format}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{row.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      ))}
    </div>
  );
}
