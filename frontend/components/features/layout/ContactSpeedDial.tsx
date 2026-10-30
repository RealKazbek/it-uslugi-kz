'use client';

import { Phone, X } from 'lucide-react';
import { useCallback, useId, useRef, useState } from 'react';
import { type Lang } from '@/lib/i18n/locales';
import { whatsappGeneralLink } from '@/lib/format/links';
import { CONTACTS } from '@/lib/site/contacts';
import { activeContacts } from '@/lib/site/speedDialItems';
import { SpeedDialList } from './SpeedDialList';
import type { SpeedDialLabels } from './speedDialMeta';
import { useSpeedDialDismiss } from './useSpeedDialDismiss';

export interface ContactSpeedDialProps {
  lang: Lang;
  labels: SpeedDialLabels;
  /** Overrides the default prefilled WhatsApp link. */
  whatsappHref?: string;
}

/** Floating contact button bottom-right; expands into a list of contact pills. Pulses until first opened. */
export function ContactSpeedDial({ lang, labels, whatsappHref }: ContactSpeedDialProps) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const items = activeContacts({ ...CONTACTS, whatsapp: whatsappHref ?? whatsappGeneralLink(lang) });

  const close = useCallback(() => setOpen(false), []);
  const closeToButton = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);
  useSpeedDialDismiss({ open, containerRef, onOutside: close, onEscape: closeToButton });

  const toggle = () => {
    setOpen((value) => !value);
    setHasOpened(true);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 size-14 md:bottom-6 md:right-6"
    >
      <SpeedDialList id={listId} items={items} labels={labels} open={open} />
      {!hasOpened && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp animate-dial-pulse motion-reduce:hidden" />
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={open ? labels.close : labels.open}
        className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-pop"
      >
        <Phone aria-hidden="true" className={`absolute size-6 transition-all duration-200 ease-out ${open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
        <X aria-hidden="true" className={`absolute size-6 transition-all duration-200 ease-out ${open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
      </button>
    </div>
  );
}
