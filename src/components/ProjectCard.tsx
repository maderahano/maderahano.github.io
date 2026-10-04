import type { Project } from '../data/types';
import { skillName } from '../utils/relations';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { Icon } from './Icon';
import { RevealItem } from './Reveal';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
  index: number;
  onOpen: () => void;
}

export function ProjectCard({ project: p, index, onOpen }: Props) {
  // Show the "after" state (or the only flow) as the card preview.
  const preview = p.architecture[p.architecture.length - 1];

  return (
    <RevealItem as="li" className={`card ${styles.card}`}>
      <div className={styles.top}>
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.org}>
          {p.org} · {p.period}
        </span>
      </div>

      <h3 className={styles.title}>
        <button type="button" className={styles.titleBtn} onClick={onOpen} aria-haspopup="dialog">
          {p.title}
        </button>
      </h3>
      <p className={styles.tagline}>{p.tagline}</p>

      <div className={styles.preview} aria-hidden="true">
        <ArchitectureDiagram flows={[{ nodes: preview.nodes }]} mini />
      </div>

      <ul className={styles.tech} aria-label="Technologies">
        {p.tech.slice(0, 4).map((t) => (
          <li key={t} className="chip">
            {skillName(t)}
          </li>
        ))}
        {p.tech.length > 4 && <li className="chip">+{p.tech.length - 4}</li>}
      </ul>

      <button type="button" className={styles.cta} onClick={onOpen} aria-haspopup="dialog" aria-label={`Read the story: ${p.title}`}>
        Read the story
        <Icon name="arrow-right" size={16} />
      </button>
    </RevealItem>
  );
}
