import type { ReactNode } from 'react';

export const INPUT_CLASS =
  'mt-1.5 min-h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-primary';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label, control and error text for one form field. The control gets aria-describedby from `id`. */
export function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string): string | undefined {
  return error ? `${id}-error` : undefined;
}
