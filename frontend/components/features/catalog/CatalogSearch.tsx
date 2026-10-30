'use client';

import { Search } from 'lucide-react';
import { useId } from 'react';
import { Input } from '@/components/ui/Input';

interface CatalogSearchProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function CatalogSearch({ label, placeholder, value, onChange }: CatalogSearchProps) {
  const id = useId();
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <Input id={id} type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="pl-10" />
    </div>
  );
}
