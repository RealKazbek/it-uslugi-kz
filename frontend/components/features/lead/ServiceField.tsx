'use client';

import { useMemo, useState } from 'react';
import { Combobox } from '@/components/ui/Combobox';
import type { LeadDict } from '@/lib/i18n/dict/types';
import { buildServiceGroups, filterServiceGroups } from '@/lib/leads/serviceOptions';
import type { ProductOption } from '@/types/lead';
import { FieldShell } from './FieldShell';

interface ServiceFieldProps {
  id: string;
  label: string;
  texts: LeadDict['combobox'];
  products: ProductOption[];
  /** Slug preselected by the caller (e.g. the product page). Empty means consultation. */
  defaultValue: string;
}

/** Searchable service picker. The hidden input carries the chosen slug ("" for consultation, "other" for other). */
export function ServiceField({ id, label, texts, products, defaultValue }: ServiceFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const groups = useMemo(
    () => buildServiceGroups(products, { consultation: texts.consultation, other: texts.other }),
    [products, texts.consultation, texts.other],
  );

  return (
    <FieldShell id={id} label={label}>
      <Combobox
        id={id}
        value={value}
        onChange={setValue}
        groups={groups}
        filter={filterServiceGroups}
        listLabel={label}
        searchPlaceholder={texts.search}
        noResultsText={texts.noResults}
      />
      <input type="hidden" name="product" value={value} />
    </FieldShell>
  );
}
