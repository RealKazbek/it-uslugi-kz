'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { LeadForm } from './LeadForm';
import { LeadSuccess } from './LeadSuccess';
import type { ProductOption } from '@/types/lead';
import type { LeadDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';

export interface LeadModalTitles {
  title: string;
  subtitle: string;
  close: string;
}

export interface LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: Lang;
  product: string;
  pageUrl: string;
  products: ProductOption[];
  labels: LeadDict;
  titles: LeadModalTitles;
}

const OVERLAY_CLASS =
  'fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0';

/* No transform on the content: a transformed ancestor would trap the fixed mobile sheet of the service combobox. */
const CONTENT_CLASS =
  'fixed inset-0 z-50 m-auto h-fit max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface-100 p-6 shadow-pop duration-200 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95';

/** While the service list is open, Escape closes the list and keeps the dialog open. */
function keepEscapeForOpenCombobox(event: KeyboardEvent): void {
  const target = event.target;
  if (target instanceof HTMLElement && target.getAttribute('aria-expanded') === 'true') event.preventDefault();
}

/** Dialog with the shared lead form. The provider remounts it on every open, so the form and success state start fresh. */
export function LeadModal({ open, onOpenChange, lang, product, pageUrl, products, labels, titles }: LeadModalProps) {
  const [sent, setSent] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={OVERLAY_CLASS} />
        <DialogPrimitive.Content className={CONTENT_CLASS} onEscapeKeyDown={keepEscapeForOpenCombobox}>
          <DialogPrimitive.Close aria-label={titles.close} className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-lg hover:bg-muted">
            <X aria-hidden="true" className="size-5" />
          </DialogPrimitive.Close>
          <DialogPrimitive.Title className="pr-10 text-h3">{titles.title}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="mb-5 mt-1.5 text-muted-foreground">{titles.subtitle}</DialogPrimitive.Description>
          {sent ? (
            <LeadSuccess text={labels.success} doneLabel={labels.done} onDone={() => onOpenChange(false)} />
          ) : (
            <LeadForm
              lang={lang}
              product={product}
              pageUrl={pageUrl}
              labels={labels}
              products={products}
              onSuccess={() => setSent(true)}
            />
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
