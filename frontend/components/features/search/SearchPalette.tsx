'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { SearchDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';
import { PaletteBody } from './PaletteBody';
import { useSearch } from './SearchProvider';

const OVERLAY_CLASS = 'fixed inset-0 z-[60] bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 motion-reduce:animate-none';

/** Top-aligned overlay: full width with 8px margins on phones, a centred card from 640px. */
const CONTENT_CLASS =
  'fixed inset-x-2 top-2 z-[61] mx-auto max-w-xl overflow-hidden rounded-xl border border-line bg-surface-100 shadow-pop min-[640px]:top-[12vh] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 data-[state=closed]:fade-out-0 motion-reduce:animate-none duration-200 ease-out';

export interface SearchPaletteProps {
  lang: Lang;
  labels: SearchDict;
}

/** Site search dialog. Its content (and therefore the query) exists only while open. */
export function SearchPalette({ lang, labels }: SearchPaletteProps) {
  const { isOpen, setOpen } = useSearch();
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={OVERLAY_CLASS} />
        <DialogPrimitive.Content className={CONTENT_CLASS}>
          <DialogPrimitive.Title className="sr-only">{labels.dialogTitle}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">{labels.placeholder}</DialogPrimitive.Description>
          <PaletteBody lang={lang} labels={labels} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
