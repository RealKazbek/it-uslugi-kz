import type { Step } from '@/lib/i18n/dict/types';

/** Ordered steps of a real sequence (process). Numbers come from the list element. */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step) => (
        <li key={step.t} className="border-l-2 border-border pl-4">
          <p className="font-bold">{step.t}</p>
          <p className="text-muted-foreground">{step.d}</p>
        </li>
      ))}
    </ol>
  );
}
