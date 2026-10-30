import type { Step } from '@/lib/i18n/dict/types';

/** Ordered steps of a real sequence: numbered circles beside each step. */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-6">
      {steps.map((step, index) => (
        <li key={step.t} className="flex gap-4">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-base font-extrabold text-primary-hover"
          >
            {index + 1}
          </span>
          <div className="min-w-0 space-y-1">
            <p className="font-bold">{step.t}</p>
            <p className="text-muted-foreground">{step.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
