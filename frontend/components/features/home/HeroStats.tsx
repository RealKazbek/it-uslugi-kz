import { CountUp } from '@/components/motion/CountUp';

export interface HeroStatItem {
  /** A count (animated) or a non-numeric symbol such as '∞' (rendered as is). */
  value: number | '∞';
  label: string;
}

/** Counter row; zero counts are skipped by the caller. */
export function HeroStats({ items }: { items: HeroStatItem[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dd className="text-stat tracking-tight text-foreground">
            {typeof item.value === 'number' ? (
              <CountUp value={item.value} />
            ) : (
              <span className="tabular-nums">{item.value}</span>
            )}
          </dd>
          <dt className="text-sm text-muted-foreground">{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}
