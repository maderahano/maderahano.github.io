import { m, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import type { Flow } from '../data/types';
import { EASE, viewport } from '../utils/motion';
import styles from './ArchitectureDiagram.module.css';

interface Props {
  flows: Flow[];
  /** Smaller type and padding for use inside cards. */
  compact?: boolean;
  /** Wrapping pill chain without sub-labels — for narrow card previews. */
  mini?: boolean;
  /** Animate immediately instead of when scrolled into view (for modals). */
  immediate?: boolean;
  className?: string;
}

/**
 * Simplified linear architecture / impact diagram.
 * Nodes light up left → right (top → bottom on small screens), connectors draw in between,
 * and a single pulse travels along the connectors once the diagram is active.
 * Two flows titled "Before"/"After" render as a stacked comparison.
 */
export function ArchitectureDiagram({ flows, compact, mini, immediate, className }: Props) {
  const reduce = useReducedMotion();
  const cls = [styles.wrap, compact ? styles.compact : '', mini ? styles.mini : '', className ?? ''].join(' ');

  return (
    <m.div
      className={cls}
      initial="hidden"
      {...(immediate ? { animate: 'show' } : { whileInView: 'show', viewport })}
    >
      {flows.map((flow, fi) => (
        <m.div
          key={fi}
          className={styles.flow}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: fi * 0.35 } } }}
          role="list"
          aria-label={flow.title ? `${flow.title} flow` : 'Architecture flow'}
        >
          {flow.title && <span className={styles.flowTitle}>{flow.title}</span>}
          <div className={styles.nodes}>
            {flow.nodes.map((node, ni) => (
              <Fragment key={ni}>
                {ni > 0 && (
                  <m.span
                    className={styles.connector}
                    aria-hidden="true"
                    variants={{
                      hidden: { opacity: 0, scale: 0.4 },
                      show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
                    }}
                  >
                    <span className={styles.line} />
                    {!reduce && <span className={styles.pulse} style={{ animationDelay: `${0.9 + ni * 0.25}s` }} />}
                    <span className={styles.arrow} />
                  </m.span>
                )}
                <m.span
                  role="listitem"
                  className={`${styles.node} ${node.accent ? styles.accent : ''}`}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
                  }}
                >
                  <span className={styles.label}>{node.label}</span>
                  {node.sub && !mini && <span className={styles.sub}>{node.sub}</span>}
                </m.span>
              </Fragment>
            ))}
          </div>
        </m.div>
      ))}
    </m.div>
  );
}
