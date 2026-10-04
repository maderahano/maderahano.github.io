/* Shared Framer Motion vocabulary. Every reveal on the site uses one of these,
   so the motion language stays consistent (fade + short slide, soft ease-out). */
import type { Transition, Variants } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = { type: 'spring', stiffness: 260, damping: 28, mass: 0.9 };
export const tween = (duration = 0.55, delay = 0): Transition => ({ duration, delay, ease: EASE });

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: tween() },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tween(0.6) },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: tween(0.5) },
};

/** Parent that staggers its children's `hidden → show`. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Reveal once, when ~20% of the element is visible, starting a bit before it fully enters. */
export const viewport = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' } as const;
