'use client';

import { useLeadModal } from '@/components/features/lead/LeadModalProvider';
import { Button } from '@/components/ui/Button';

/** "Not found? Send a request": opens the shared lead modal. `onBeforeOpen` lets the palette close first. */
export function RequestLine({ label, onBeforeOpen }: { label: string; onBeforeOpen?: () => void }) {
  const { open } = useLeadModal();
  return (
    <div className="px-3 py-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          onBeforeOpen?.();
          open();
        }}
      >
        {label}
      </Button>
    </div>
  );
}
