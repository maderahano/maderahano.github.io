import { m, useReducedMotion } from 'framer-motion';
import { EASE } from '../utils/motion';
import { Icon, type IconName } from './Icon';
import styles from './PipelinePanel.module.css';

interface Step {
  icon: IconName;
  label: string;
  detail: string;
}

/* An illustrative deployment path built from technologies in the resume:
   GitHub Actions → AWS (ECS) → Spring Boot service → RDS via IAM auth → Datadog. */
const STEPS: Step[] = [
  { icon: 'git-branch', label: 'push', detail: 'git · main' },
  { icon: 'play', label: 'build & test', detail: 'GitHub Actions' },
  { icon: 'cube', label: 'package', detail: 'Docker image' },
  { icon: 'cloud', label: 'deploy', detail: 'AWS ECS · Terraform' },
  { icon: 'server', label: 'run', detail: 'Java 21 · Spring Boot 3' },
  { icon: 'shield', label: 'connect', detail: 'RDS · IAM auth' },
  { icon: 'spark', label: 'observe', detail: 'Datadog' },
];

export function PipelinePanel({ startDelay = 0 }: { startDelay?: number }) {
  const reduce = useReducedMotion();
  const gap = 0.32;

  return (
    <div className={`card ${styles.panel}`} role="img" aria-label="Illustrative deployment pipeline: push, build and test on GitHub Actions, package a Docker image, deploy to AWS ECS with Terraform, run on Java 21 and Spring Boot 3, connect to RDS with IAM authentication, observe with Datadog.">
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.barTitle}>deploy · production</span>
        <span className={styles.barStatus}>
          <span className={styles.statusDot} />
          live
        </span>
      </div>

      <ol className={styles.steps} aria-hidden="true">
        {STEPS.map((s, i) => {
          const delay = startDelay + i * gap;
          return (
            <m.li
              key={s.label}
              className={styles.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay, ease: EASE }}
            >
              <span className={styles.rail}>
                <m.span
                  className={styles.node}
                  initial={{ scale: 0.6, backgroundColor: 'var(--surface-3)' }}
                  animate={{ scale: 1, backgroundColor: 'var(--accent)' }}
                  transition={{ duration: 0.35, delay: delay + 0.15, ease: EASE }}
                >
                  <Icon name={s.icon} size={13} />
                </m.span>
                {i < STEPS.length - 1 && (
                  <m.span
                    className={styles.railLine}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: gap, delay: delay + 0.25, ease: 'linear' }}
                  />
                )}
              </span>
              <span className={styles.stepText}>
                <span className={styles.stepLabel}>{s.label}</span>
                <span className={styles.stepDetail}>{s.detail}</span>
              </span>
              <m.span
                className={styles.check}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: delay + gap * 0.9, ease: EASE }}
              >
                ✓
              </m.span>
            </m.li>
          );
        })}
      </ol>

      <m.div
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: startDelay + STEPS.length * gap + 0.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className={styles.prompt}>$</span>
        <span className={styles.cmd}>
          status
          {!reduce && <span className={styles.cursor} />}
        </span>
        <span className={styles.ok}>all services healthy</span>
      </m.div>
    </div>
  );
}
