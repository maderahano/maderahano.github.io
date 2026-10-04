import { m, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { resume } from '../data/resume';
import { formatMonth } from '../utils/dates';
import { ExperienceCard } from './ExperienceCard';
import { SectionHead } from './SectionHead';
import styles from './Timeline.module.css';

const items = resume.experience;

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  // Scroll-linked fill for the rail: 0 at the first card, 1 when the last card is reached.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.6', 'end 0.85'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });
  const fillX = useTransform(fill, (v) => v);

  // Active card = the one whose top has most recently crossed the reading line.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      const cards = listRef.current?.querySelectorAll<HTMLElement>('[data-exp-index]');
      if (!cards) return;
      let current = 0;
      cards.forEach((el) => {
        if (el.getBoundingClientRect().top <= line) current = Number(el.dataset.expIndex);
      });
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          eyebrow="Career timeline"
          title="Four roles, one direction."
          lead="From a first web platform as an intern to infrastructure work across Traveloka's services — each step moved closer to the platform layer."
        />
      </div>

      {/* Sticky horizontal rail (desktop) */}
      <div className={styles.railWrap}>
        <div className={`container ${styles.rail}`}>
          <div className={styles.track} aria-hidden="true">
            <m.div className={styles.trackFill} style={{ scaleX: fillX }} />
          </div>
          <ol className={styles.nodes} aria-label="Jump to a role">
            {items.map((e, i) => (
              <li key={e.id} className={`${styles.nodeItem} ${i <= active ? styles.reached : ''} ${i === active ? styles.current : ''}`}>
                <a href={`#exp-${e.id}`} className={styles.node} aria-current={i === active ? 'true' : undefined}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.nodeYear}>{formatMonth(e.start).slice(-4)}</span>
                  <span className={styles.nodeCompany}>{e.company}</span>
                  <span className={styles.nodeRole}>{e.role}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Cards (vertical rail on mobile via CSS) */}
      <div className="container">
        <ol ref={listRef} className={styles.list}>
          {items.map((e, i) => (
            <li
              key={e.id}
              id={`exp-${e.id}`}
              data-exp-index={i}
              className={`${styles.item} ${i <= active ? styles.itemReached : ''}`}
            >
              <span className={styles.itemDot} aria-hidden="true" />
              <ExperienceCard experience={e} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
