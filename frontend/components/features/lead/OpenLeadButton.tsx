'use client';

import type { ReactNode } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { useLeadModal } from './LeadModalProvider';

interface OpenLeadButtonProps extends Pick<ButtonProps, 'className' | 'size' | 'variant'> {
  /** Product slug preselected in the modal's service select. */
  product?: string;
  children: ReactNode;
}

/** Button that opens the lead modal, optionally with a product preselected. Needs LeadModalProvider above it. */
export function OpenLeadButton({ product, className, size, variant, children }: OpenLeadButtonProps) {
  const { open } = useLeadModal();
  return (
    <Button type="button" className={className} size={size} variant={variant} onClick={() => open({ product })}>
      {children}
    </Button>
  );
}

/** Same button under the name the header and mobile menu use. */
export const RequestButton = OpenLeadButton;
