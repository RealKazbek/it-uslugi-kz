'use client';

import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/ui/cn';

interface ProductGalleryProps {
  images: string[];
  /** One alt text per image, built on the server from product.photoAlt. */
  alts: string[];
  label: string;
}

/** Main photo with a short crossfade and a row of thumbnail buttons. */
export function ProductGallery({ images, alts, label }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  return (
    <div role="group" aria-label={label} className="space-y-3">
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
        <AnimatePresence initial={false}>
          <m.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={images[active] ?? images[0] ?? ''}
              alt={alts[active] ?? ''}
              fill
              priority={active === 0}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </m.div>
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={alts[i]}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-[3/2] overflow-hidden rounded-lg border-2 transition-opacity duration-fast',
              i === active ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100',
            )}
          >
            <Image src={src} alt="" fill loading="lazy" sizes="(min-width: 1024px) 19vw, 33vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
