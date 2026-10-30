export type LeadOutcome = 'idle' | 'sending' | 'success' | 'throttled' | 'invalid' | 'error';

/** Result of the last submit. Success is announced politely; problems use an alert role. */
export function LeadStatus({ outcome, text }: { outcome: LeadOutcome; text: string }) {
  if (outcome === 'idle' || outcome === 'sending') return null;
  if (outcome === 'success') {
    return (
      <p role="status" className="font-semibold text-success">
        {text}
      </p>
    );
  }
  return (
    <p role="alert" className="text-foreground">
      {text}
    </p>
  );
}
