import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Animates 0 → target once `start` becomes true. Instant when motion is reduced. */
export function useCountUp(target: number, start: boolean, duration = 1100): number {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reduce || target === 0) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration, reduce]);

  return value;
}
