'use client';

import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, staggerParent, VIEWPORT } from './presets';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Render as a list element when the children are <li>. */
  as?: 'div' | 'ul' | 'ol' | 'li' | 'section';
}

/** Fades and slides its content in once when it scrolls into view. */
export function Reveal({ children, className, as = 'div' }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag className={className} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeUp}>
      {children}
    </Tag>
  );
}

/** Parent that reveals its <StaggerItem> children one after another (cards, steps). */
export function Stagger({ children, className, as = 'div' }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag className={className} initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={staggerParent}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = 'div' }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
