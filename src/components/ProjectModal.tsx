import { m } from 'framer-motion';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/types';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { EASE } from '../utils/motion';
import { experienceById, skillName } from '../utils/relations';
import { formatRange } from '../utils/dates';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Icon } from './Icon';
import styles from './ProjectModal.module.css';

interface Props {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectModal({ project: p, onClose, onPrev, onNext }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, true, onClose);
  const exp = experienceById.get(p.experienceId);
  const titleId = `project-${p.id}-title`;

  return createPortal(
    <m.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        ref={ref}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <header className={styles.head}>
          <div>
            <p className={styles.org}>
              {p.org} · {p.period}
            </p>
            <h3 id={titleId} className={styles.title}>
              {p.title}
            </h3>
            <p className={styles.tagline}>{p.tagline}</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close project details">
            <Icon name="close" size={20} />
          </button>
        </header>

        <div className={styles.arch}>
          <span className={styles.sideLabel}>Architecture · simplified</span>
          <ArchitectureDiagram flows={p.architecture} compact immediate />
        </div>

        <div className={styles.body}>
          <div className={styles.story}>
            <Block label="Problem" text={p.problem} />
            <Block label="Solution" text={p.solution} />
            <Block label="Result" text={p.result} accent />
            <Block label="My contribution" text={p.contribution} />
          </div>

          <aside className={styles.side}>
            <div>
              <span className={styles.sideLabel}>Technologies</span>
              <ul className={styles.tech}>
                {p.tech.map((t) => (
                  <li key={t} className="chip chip-accent">
                    {skillName(t)}
                  </li>
                ))}
              </ul>
            </div>
            {exp && (
              <div>
                <span className={styles.sideLabel}>Role</span>
                <a href={`#exp-${exp.id}`} className={styles.roleLink} onClick={onClose}>
                  <span>
                    {exp.role} · {exp.company}
                  </span>
                  <span className={styles.roleMeta}>{formatRange(exp.start, exp.end)}</span>
                </a>
              </div>
            )}
          </aside>
        </div>

        <footer className={styles.foot}>
          <button type="button" className="btn btn-ghost" onClick={onPrev}>
            <Icon name="arrow-right" style={{ transform: 'rotate(180deg)' }} />
            Previous
          </button>
          <button type="button" className="btn btn-ghost" onClick={onNext}>
            Next
            <Icon name="arrow-right" />
          </button>
        </footer>
      </m.div>
    </m.div>,
    document.body,
  );
}

function Block({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className={`${styles.block} ${accent ? styles.blockAccent : ''}`}>
      <h4 className={styles.blockLabel}>{label}</h4>
      <p>{text}</p>
    </div>
  );
}
