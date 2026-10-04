import { AnimatePresence, m } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { resume } from '../data/resume';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { EASE } from '../utils/motion';
import { experienceForSkill, projectsForSkill, skillById, skillsInCategory } from '../utils/relations';
import { Reveal, RevealItem } from './Reveal';
import { SectionHead } from './SectionHead';
import { SkillDetail } from './SkillDetail';
import styles from './Skills.module.css';

const DEFAULT = 'aws';

export function Skills() {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const canHover = useMediaQuery('(hover: hover)');
  const [pinned, setPinned] = useState<string>(DEFAULT);
  const [hovered, setHovered] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  useFocusTrap(sheetRef, !isDesktop && sheetOpen, closeSheet);

  const selectedId = (isDesktop && hovered) || pinned;
  const selected = skillById.get(selectedId) ?? skillById.get(DEFAULT)!;

  const select = (id: string) => {
    setPinned(id);
    if (!isDesktop) setSheetOpen(true);
  };

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          id="skills-title"
          eyebrow="Skills"
          title="The toolkit, grouped the way I use it."
          lead="Hover or select a skill to see where it was used and which projects it shaped."
        />

        <div className={styles.layout}>
          <div className={styles.groups}>
            {resume.skillCategories.map((cat, ci) => {
              const list = skillsInCategory(cat.id);
              if (!list.length) return null;
              return (
                <Reveal key={cat.id} as="div" className={styles.group} staggerChildren={0.04} delay={ci * 0.03}>
                  <RevealItem as="div" className={styles.groupHead}>
                    <h3 className={styles.groupTitle}>{cat.label}</h3>
                    <p className={styles.groupDesc}>{cat.description}</p>
                  </RevealItem>
                  <ul className={styles.skillList} aria-label={cat.label}>
                    {list.map((s) => {
                      const active = s.id === selectedId;
                      const used = experienceForSkill(s.id).length + projectsForSkill(s.id).length;
                      return (
                        <RevealItem as="li" key={s.id}>
                          <button
                            type="button"
                            className={`${styles.skill} ${active ? styles.active : ''} ${s.core ? styles.core : ''}`}
                            aria-pressed={active}
                            onClick={() => select(s.id)}
                            onMouseEnter={canHover ? () => setHovered(s.id) : undefined}
                            onMouseLeave={canHover ? () => setHovered(null) : undefined}
                            onFocus={() => isDesktop && setHovered(s.id)}
                            onBlur={() => setHovered(null)}
                          >
                            <span className={styles.skillName}>{s.name}</span>
                            {used > 0 && <span className={styles.skillCount}>{used}</span>}
                          </button>
                        </RevealItem>
                      );
                    })}
                  </ul>
                </Reveal>
              );
            })}
          </div>

          {/* Desktop: sticky side panel */}
          {isDesktop && (
            <Reveal as="div" className={`card ${styles.aside}`}>
              <SkillDetail skill={selected} />
            </Reveal>
          )}
        </div>
      </div>

      {/* Mobile: bottom sheet */}
      <AnimatePresence>
        {!isDesktop && sheetOpen && (
          <>
            <m.div
              key="backdrop"
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeSheet}
              aria-hidden="true"
            />
            <m.div
              key="sheet"
              ref={sheetRef}
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.name} details`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <span className={styles.handle} aria-hidden="true" />
              <SkillDetail skill={selected} onClose={closeSheet} />
            </m.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
