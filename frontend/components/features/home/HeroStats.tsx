import { CountUp } from '@/components/motion/CountUp';

export interface HeroStatItem {
  value: number;
  label: string;
}

/** Counter row; items with a zero value are skipped by the caller. */
export function HeroStats({ items }: { items: HeroStatItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dd className="text-stat tracking-tight text-foreground">
            <CountUp value={item.value} />
          </dd>
          <dt className="text-sm text-muted-foreground">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}
