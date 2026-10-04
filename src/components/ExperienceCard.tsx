import type { Experience } from '../data/types';
import { formatDuration, formatRange } from '../utils/dates';
import { openProject } from '../utils/events';
import { projectsForExperience, skillName } from '../utils/relations';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Icon } from './Icon';
import { Reveal, RevealItem } from './Reveal';
import styles from './ExperienceCard.module.css';

interface Props {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience: e, index }: Props) {
  const projects = projectsForExperience(e.id);
  const isCurrent = e.end === null;

  return (
    <Reveal as="article" className={`card ${styles.card} ${isCurrent ? styles.current : ''}`} staggerChildren={0.08} aria-labelledby={`exp-${e.id}-title`}>
      <RevealItem as="header" className={styles.head}>
        <div className={styles.headMain}>
          <p className={styles.index}>
            {String(index + 1).padStart(2, '0')} · {e.type}
            {isCurrent && <span className={styles.now}>Now</span>}
          </p>
          <h3 id={`exp-${e.id}-title`} className={styles.role}>
            {e.role}
          </h3>
          <p className={styles.company}>{e.company}</p>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt className="sr-only">Period</dt>
            <dd>
              <Icon name="calendar" size={14} />
              {formatRange(e.start, e.end)}
              <span className={styles.duration}>· {formatDuration(e.start, e.end)}</span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Location</dt>
            <dd>
              <Icon name="pin" size={14} />
              {e.location}
            </dd>
          </div>
        </dl>
      </RevealItem>

      <RevealItem as="p" className={styles.summary}>
        {e.summary}
      </RevealItem>

      <RevealItem as="ul" className={styles.highlights}>
        {e.highlights.map((h) => (
          <li key={h}>
            <Icon name="chevron-right" size={14} />
            <span>{h}</span>
          </li>
        ))}
      </RevealItem>

      {e.impact && (
        <RevealItem className={styles.impact}>
          <span className={styles.impactLabel}>Impact</span>
          <ArchitectureDiagram flows={e.impact} compact />
        </RevealItem>
      )}

      <RevealItem className={styles.foot}>
        <ul className={styles.tech} aria-label="Technologies">
          {e.tech.map((t) => (
            <li key={t} className="chip">
              {skillName(t)}
            </li>
          ))}
        </ul>
        {projects.length > 0 && (
          <div className={styles.projects}>
            {projects.map((p) => (
              <button key={p.id} type="button" className={styles.projectLink} onClick={() => openProject(p.id)}>
                {p.title}
                <Icon name="arrow-right" size={14} />
              </button>
            ))}
          </div>
        )}
      </RevealItem>
    </Reveal>
  );
}
