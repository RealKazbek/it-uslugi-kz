'use client';

import { AnimatePresence, m, useReducedMotion, type Variants } from 'framer-motion';
import { EASE_OUT } from '@/components/motion/presets';
import type { SpeedDialItem } from '@/lib/site/speedDialItems';
import { SPEED_DIAL_META, type SpeedDialLabels } from './speedDialMeta';

export interface SpeedDialListProps {
  id: string;
  items: SpeedDialItem[];
  labels: SpeedDialLabels;
  open: boolean;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, y: 12, scale: 0.95, transition: { duration: 0.2, ease: EASE_OUT } },
};

function listVariants(reduce: boolean): Variants {
  const stagger = reduce ? 0 : 0.04;
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
    exit: { transition: { staggerChildren: stagger, staggerDirection: -1 } },
  };
}

/** Stacked pills above the dial button. DOM order is top-down, but the column is reversed so the first item sits nearest the button. */
export function SpeedDialList({ id, items, labels, open }: SpeedDialListProps) {
  const reduce = useReducedMotion() ?? false;
  return (
    <AnimatePresence>
      {open && (
        <m.ul
          id={id}
          variants={listVariants(reduce)}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute bottom-full right-0 mb-3 flex flex-col-reverse items-end gap-2"
        >
          {items.map((item) => (
            <m.li key={item.key} variants={itemVariants}>
              <SpeedDialLink item={item} label={SPEED_DIAL_META[item.key].label(labels)} />
            </m.li>
          ))}
        </m.ul>
      )}
    </AnimatePresence>
  );
}

function SpeedDialLink({ item, label }: { item: SpeedDialItem; label: string }) {
  const meta = SPEED_DIAL_META[item.key];
  const isWeb = item.href.startsWith('http');
  return (
    <a
      href={item.href}
      {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex h-11 items-center gap-2 rounded-full border border-line bg-surface-100 pl-3 pr-4 text-label text-ink shadow-pop"
    >
      <span className={`flex size-8 items-center justify-center rounded-full ${meta.circleClass}`}>{meta.icon}</span>
      {label}
    </a>
  );
}
