'use client';

import { m } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { EASE_OUT } from '@/components/motion/presets';

/** Round WhatsApp button on desktop. Fades in once after a short delay; reduced motion skips the motion. */
export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  return (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: EASE_OUT }}
      whileHover={{ scale: 1.08, transition: { duration: 0.15, delay: 0 } }}
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-pop md:flex"
    >
      <SiWhatsapp size={28} aria-hidden="true" />
    </m.a>
  );
}
