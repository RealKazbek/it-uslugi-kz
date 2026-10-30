import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';

export interface FaqEntry {
  q: string;
  a: string;
}

/** Single-open, collapsible FAQ. Renders nothing for an empty list. */
export function ProductFaq({ title, items }: { title: string; items: FaqEntry[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq" className="space-y-2">
      <h2 id="faq" className="text-xl">{title}</h2>
      <Accordion type="single" collapsible>
        {items.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
