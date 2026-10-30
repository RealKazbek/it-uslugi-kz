'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LeadModal, type LeadModalTitles } from './LeadModal';
import type { ProductOption } from '@/types/lead';
import type { LeadDict } from '@/lib/i18n/dict/types';
import type { Lang } from '@/lib/i18n/locales';

export interface OpenLeadOptions {
  product?: string;
}

export interface LeadModalApi {
  open: (options?: OpenLeadOptions) => void;
  close: () => void;
}

interface ModalState {
  open: boolean;
  product: string;
  pageUrl: string;
  /** Bumped on every open so the modal remounts with a clean form. */
  session: number;
}

const LeadModalContext = createContext<LeadModalApi | null>(null);
const LeadProductsContext = createContext<ProductOption[]>([]);

/** Products for the service select, shared by the modal and inline forms. */
export function useLeadProducts(): ProductOption[] {
  return useContext(LeadProductsContext);
}

/** Opens the shared lead modal from any client component. Throws when the provider is missing. */
export function useLeadModal(): LeadModalApi {
  const api = useContext(LeadModalContext);
  if (api === null) throw new Error('useLeadModal must be used inside LeadModalProvider');
  return api;
}

interface LeadModalProviderProps {
  lang: Lang;
  products: ProductOption[];
  labels: LeadDict;
  titles: LeadModalTitles;
  children: ReactNode;
}

/** Provides useLeadModal and renders the modal. The page URL is read from the browser when the modal opens. */
export function LeadModalProvider({ lang, products, labels, titles, children }: LeadModalProviderProps) {
  const pathname = usePathname();
  const [state, setState] = useState<ModalState>({ open: false, product: '', pageUrl: '', session: 0 });

  const open = useCallback(
    (options?: OpenLeadOptions) => {
      const pageUrl = `${window.location.origin}${pathname}`;
      setState((prev) => ({ open: true, product: options?.product ?? '', pageUrl, session: prev.session + 1 }));
    },
    [pathname],
  );
  const close = useCallback(() => setState((prev) => ({ ...prev, open: false })), []);
  const api = useMemo<LeadModalApi>(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext.Provider value={api}>
      <LeadProductsContext.Provider value={products}>{children}</LeadProductsContext.Provider>
      <LeadModal
        key={state.session}
        open={state.open}
        onOpenChange={(next) => (next ? open() : close())}
        lang={lang}
        product={state.product}
        pageUrl={state.pageUrl}
        products={products}
        labels={labels}
        titles={titles}
      />
    </LeadModalContext.Provider>
  );
}
