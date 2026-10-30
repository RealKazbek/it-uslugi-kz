import { Button } from '@/components/ui/Button';

interface LeadSuccessProps {
  text: string;
  doneLabel: string;
  onDone: () => void;
}

/** Shown in the modal after a sent request. The check mark is drawn with a CSS animation (disabled for reduced motion). */
export function LeadSuccess({ text, doneLabel, onDone }: LeadSuccessProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-2 text-center">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="size-16 text-success" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round">
        <circle cx="32" cy="32" r="28" pathLength={1} className="check-draw" />
        <path d="M20 33 L29 42 L44 25" pathLength={1} className="check-draw check-draw-late" />
      </svg>
      <p className="text-lg font-semibold">{text}</p>
      <Button type="button" size="lg" className="w-full" onClick={onDone}>
        {doneLabel}
      </Button>
    </div>
  );
}
