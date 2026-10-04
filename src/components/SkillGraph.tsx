import { m } from 'framer-motion';
import { EASE } from '../utils/motion';
import styles from './SkillGraph.module.css';

interface Props {
  root: string;
  children: string[];
}

/**
 * Small tree: root on the left, children fanned out on the right,
 * connectors drawn with an animated SVG path length.
 */
export function SkillGraph({ root, children }: Props) {
  const rowH = 34;
  const h = Math.max(rowH * children.length, 80);
  const w = 260;
  const rootX = 70;
  const rootY = h / 2;
  const childX = 140;

  return (
    <div className={styles.wrap} role="img" aria-label={`${root} services used: ${children.join(', ')}`}>
      <svg className={styles.svg} viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
        {children.map((c, i) => {
          const y = rowH * i + rowH / 2;
          const d = `M ${rootX} ${rootY} C ${rootX + 40} ${rootY}, ${childX - 40} ${y}, ${childX} ${y}`;
          return (
            <m.path
              key={c}
              d={d}
              className={styles.edge}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: EASE }}
            />
          );
        })}
      </svg>

      <m.span
        className={styles.root}
        style={{ top: rootY, left: rootX }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {root}
      </m.span>

      {children.map((c, i) => (
        <m.span
          key={c}
          className={styles.child}
          style={{ top: rowH * i + rowH / 2, left: childX }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.35 + i * 0.07, ease: EASE }}
        >
          {c}
        </m.span>
      ))}
    </div>
  );
}
