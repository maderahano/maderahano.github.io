import { AnimatePresence, m } from 'framer-motion';
import type { Skill } from '../data/types';
import { resume } from '../data/resume';
import { formatRange } from '../utils/dates';
import { openProject } from '../utils/events';
import { experienceForSkill, projectsForSkill } from '../utils/relations';
import { EASE } from '../utils/motion';
import { Icon } from './Icon';
import { SkillGraph } from './SkillGraph';
import styles from './SkillDetail.module.css';

interface Props {
  skill: Skill;
  onClose?: () => void;
}

export function SkillDetail({ skill, onClose }: Props) {
  const category = resume.skillCategories.find((c) => c.id === skill.category);
  const experience = experienceForSkill(skill.id);
  const projects = projectsForSkill(skill.id);

  return (
    <div className={styles.panel} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={skill.id}
          className={styles.inner}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <header className={styles.head}>
            <div>
              <p className={styles.category}>{category?.label}</p>
              <h3 className={styles.name}>{skill.name}</h3>
            </div>
            {onClose && (
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close skill details">
                <Icon name="close" size={18} />
              </button>
            )}
          </header>

          {skill.children && skill.children.length > 0 && (
            <div className={styles.graph}>
              <SkillGraph root={skill.name} children={skill.children} />
            </div>
          )}

          <div className={styles.block}>
            <h4 className={styles.blockTitle}>
              <Icon name="briefcase" size={14} /> Used at
            </h4>
            {experience.length ? (
              <ul className={styles.list}>
                {experience.map((e) => (
                  <li key={e.id}>
                    <a href={`#exp-${e.id}`} className={styles.expLink}>
                      <span className={styles.expRole}>{e.role}</span>
                      <span className={styles.expMeta}>
                        {e.company} · {formatRange(e.start, e.end)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>Listed in the resume; not tied to a specific role.</p>
            )}
          </div>

          {projects.length > 0 && (
            <div className={styles.block}>
              <h4 className={styles.blockTitle}>
                <Icon name="cube" size={14} /> Related projects
              </h4>
              <ul className={styles.list}>
                {projects.map((p) => (
                  <li key={p.id}>
                    <button type="button" className={styles.projectBtn} onClick={() => openProject(p.id)}>
                      {p.title}
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
