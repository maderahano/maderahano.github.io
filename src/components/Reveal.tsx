import { m, type HTMLMotionProps } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, stagger, viewport } from '../utils/motion';

type Tag = 'div' | 'section' | 'ul' | 'li' | 'article' | 'header' | 'p' | 'span' | 'h2' | 'h3';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  as?: Tag;
  children?: ReactNode;
  /** Stagger children that themselves use `variants={fadeUp}`. */
  staggerChildren?: number;
  delay?: number;
}

/**
 * Scroll-triggered reveal. Children animate `hidden → show` once when entering the viewport.
 * Pass `staggerChildren` to turn it into a stagger container for nested <Reveal.Item>s.
 */
export function Reveal({ as = 'div', children, staggerChildren, delay = 0, ...rest }: RevealProps) {
  const Comp = (m as unknown as Record<Tag, ElementType>)[as];
  const variants = staggerChildren !== undefined ? stagger(staggerChildren, delay) : fadeUp;
  return (
    <Comp initial="hidden" whileInView="show" viewport={viewport} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}

interface ItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  as?: Tag;
  children?: ReactNode;
}

/** A child of a staggering <Reveal>. Inherits the parent's animation state. */
export function RevealItem({ as = 'div', children, ...rest }: ItemProps) {
  const Comp = (m as unknown as Record<Tag, ElementType>)[as];
  return (
    <Comp variants={fadeUp} {...rest}>
      {children}
    </Comp>
  );
}
