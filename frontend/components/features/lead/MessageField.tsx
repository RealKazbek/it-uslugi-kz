import { FieldShell, describedBy } from './FieldShell';

interface MessageFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

export function MessageField({ id, label, placeholder, error }: MessageFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        name="message"
        rows={4}
        maxLength={2000}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-primary"
      />
    </FieldShell>
  );
}
