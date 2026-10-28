import { FieldShell, INPUT_CLASS, describedBy } from './FieldShell';

interface NameFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

export function NameField({ id, label, placeholder, error }: NameFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name="name"
        type="text"
        required
        minLength={2}
        maxLength={80}
        autoComplete="name"
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={INPUT_CLASS}
      />
    </FieldShell>
  );
}
