import { formatKzPhone } from '@/lib/leads/phoneMask';
import { FieldShell, INPUT_CLASS, describedBy } from './FieldShell';

interface ContactFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

/** Phone input with the Kazakhstan mask. The parent keeps the value so it can clear it after a send. */
export function ContactField({ id, label, placeholder, value, onChange, error }: ContactFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        name="contact"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        maxLength={20}
        value={value}
        onChange={(event) => onChange(formatKzPhone(event.target.value))}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error)}
        className={INPUT_CLASS}
      />
    </FieldShell>
  );
}
