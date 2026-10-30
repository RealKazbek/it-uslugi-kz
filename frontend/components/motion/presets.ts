import type { Transition, Variants } from 'framer-motion';

/** Motion tokens shared by every animated block (durations match the CSS tokens). */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const REVEAL_TRANSITION: Transition = { duration: 0.5, ease: EASE_OUT };
export const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: REVEAL_TRANSITION },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
