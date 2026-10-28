import { FieldShell, INPUT_CLASS, describedBy } from './FieldShell';

interface ContactFieldProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
}

export function ContactField({ id, label, placeholder, error }: ContactFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name="contact"
        type="text"
        required
        minLength={3}
        maxLength={100}
        autoComplete="off"
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={INPUT_CLASS}
      />
    </FieldShell>
  );
}
