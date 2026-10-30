'use client';

import { useMemo, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import type { FaqItem } from '@/lib/faq/site';
import { useHashOpen } from './useHashOpen';

/** Animated multi-open accordion. Each item has id=<item.id>, and the item named by the URL hash opens itself. */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<string[]>([]);
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  useHashOpen(ids, setOpen);
  return (
    <Accordion type="multiple" value={open} onValueChange={setOpen} className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.id} id={item.id} value={item.id} className="scroll-mt-24">
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>
            <p className="max-w-prose">{item.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
