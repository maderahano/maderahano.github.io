import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { resume } from '../data/resume';
import { onOpenProject } from '../utils/events';
import { projectById } from '../utils/relations';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Reveal } from './Reveal';
import { SectionHead } from './SectionHead';
import styles from './Projects.module.css';

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  // Other sections (timeline, skills) can ask to open a project.
  useEffect(
    () =>
      onOpenProject((id) => {
        if (projectById.has(id)) setOpenId(id);
      }),
    [],
  );

  const index = openId ? resume.projects.findIndex((p) => p.id === openId) : -1;
  const open = index >= 0 ? resume.projects[index] : null;
  const go = (dir: 1 | -1) => {
    const next = (index + dir + resume.projects.length) % resume.projects.length;
    setOpenId(resume.projects[next].id);
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          eyebrow="Projects"
          title="Work, told as problem → solution → result."
          lead="Each card is a piece of real work from the resume. Open one for the full story and a simplified architecture view."
        />

        <Reveal as="ul" className={styles.grid} staggerChildren={0.08}>
          {resume.projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setOpenId(p.id)} />
          ))}
        </Reveal>
      </div>

      <AnimatePresence>
        {open && <ProjectModal key={open.id} project={open} onClose={close} onPrev={() => go(-1)} onNext={() => go(1)} />}
      </AnimatePresence>
    </section>
  );
}
