import type { ReactNode } from 'react';

export const INPUT_CLASS = 'mt-1 min-h-11 w-full rounded-lg border border-line bg-paper px-3 text-ink';

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
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

export function describedBy(id: string, error?: string): string | undefined {
  return error ? `${id}-error` : undefined;
}
