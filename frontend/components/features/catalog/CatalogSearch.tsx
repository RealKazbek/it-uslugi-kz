'use client';

import { useId } from 'react';

interface CatalogSearchProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function CatalogSearch({ label, placeholder, value, onChange }: CatalogSearchProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-11 w-full max-w-md rounded-lg border border-border bg-background px-3 text-foreground"
      />
    </div>
  );
}
