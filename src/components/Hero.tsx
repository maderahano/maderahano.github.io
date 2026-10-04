import { m } from 'framer-motion';
import { useState } from 'react';
import { resume } from '../data/resume';
import { stats } from '../utils/relations';
import { EASE } from '../utils/motion';
import { useCountUp } from '../hooks/useCountUp';
import { Icon } from './Icon';
import { NetworkBackground } from './NetworkBackground';
import { PipelinePanel } from './PipelinePanel';
import styles from './Hero.module.css';

const { profile } = resume;

/* Load sequence: background → location → name → title → intro → keywords → CTAs → panel */
const T = {
  eyebrow: 0.25,
  name: 0.4,
  title: 0.65,
  intro: 0.85,
  keywords: 1.05,
  ctas: 1.6,
  panel: 1.2,
  stats: 1.9,
};

const up = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

function Stat({ value, label, suffix = '', start }: { value: number; label: string; suffix?: string; start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>
        {n}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export function Hero() {
  const [statsStart, setStatsStart] = useState(false);

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <m.div
        className={styles.bg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <NetworkBackground />
        <div className={styles.glow} />
        <div className={styles.grid} />
      </m.div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <m.p className={styles.eyebrow} {...up(T.eyebrow)}>
            <span className={styles.liveDot} aria-hidden="true" />
            {profile.company} · {profile.location}
          </m.p>

          <m.h1 id="hero-title" className={styles.name} {...up(T.name)}>
            {profile.name.split(' ').slice(0, 2).join(' ')}
            <span className={styles.nameRest}> {profile.name.split(' ').slice(2).join(' ')}</span>
          </m.h1>

          <m.p className={styles.title} {...up(T.title)}>
            {profile.title}
          </m.p>

          <m.p className={styles.intro} {...up(T.intro)}>
            {profile.intro}
          </m.p>

          <ul className={styles.keywords} aria-label="Core technologies">
            {profile.keywords.map((k, i) => (
              <m.li
                key={k}
                className="chip"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: T.keywords + i * 0.07, ease: EASE }}
              >
                {k}
              </m.li>
            ))}
          </ul>

          <m.div className={styles.ctas} {...up(T.ctas)}>
            <a href="#projects" className="btn btn-primary">
              View Projects
              <Icon name="arrow-right" />
            </a>
            <a href={profile.resumePdf} className="btn" download>
              <Icon name="download" />
              Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact
            </a>
          </m.div>

          <m.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: T.stats }}
            onAnimationStart={() => setStatsStart(true)}
          >
            <Stat value={stats.yearsExperience} suffix="+" label="years of experience" start={statsStart} />
            <Stat value={stats.roles} label="engineering roles" start={statsStart} />
            <Stat value={stats.companies} label="companies" start={statsStart} />
          </m.div>
        </div>

        <m.div
          className={styles.panel}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: T.panel, ease: EASE }}
        >
          <PipelinePanel startDelay={T.panel + 0.5} />
        </m.div>
      </div>

      <m.a
        href="#about"
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        aria-label="Scroll to About"
      >
        <span className={styles.scrollTrack}>
          <span className={styles.scrollThumb} />
        </span>
        <span className={styles.scrollLabel}>scroll</span>
      </m.a>
    </section>
  );
}
