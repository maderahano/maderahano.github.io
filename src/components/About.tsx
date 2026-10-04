import { m } from 'framer-motion';
import { resume } from '../data/resume';
import { EASE, viewport } from '../utils/motion';
import { Icon, type IconName } from './Icon';
import { Reveal, RevealItem } from './Reveal';
import { SectionHead } from './SectionHead';
import styles from './About.module.css';

const { profile } = resume;
const PRINCIPLE_ICONS: IconName[] = ['spark', 'cube', 'shield'];
const FOCUS_ICONS: IconName[] = ['code', 'server', 'cloud', 'git-branch', 'shield'];
const coreSkills = resume.skills.filter((s) => s.core);

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about-title" eyebrow="About" title="Backend by training, infrastructure by focus." />

        <div className={styles.grid}>
          {/* Portrait */}
          <Reveal className={styles.portraitWrap}>
            <div className={styles.portrait}>
              <img src={profile.photo} alt={`Portrait of ${profile.shortName}`} width={480} height={600} loading="lazy" />
              <div className={styles.portraitTag}>
                <Icon name="pin" size={14} />
                {profile.location}
              </div>
            </div>
            <div className={styles.portraitFrame} aria-hidden="true" />
          </Reveal>

          {/* Intro + philosophy */}
          <div className={styles.text}>
            <Reveal staggerChildren={0.1}>
              <RevealItem as="p" className={styles.lead}>
                {profile.summary}
              </RevealItem>
              <RevealItem as="p" className={styles.body}>
                Today I work on the Backend Infrastructure team at {profile.company}, where the job is to make the
                platform underneath every service better: modernising runtimes, moving pipelines closer to the code, and
                tightening how services reach their data. Before that I shipped back-office products across industries
                and built my first production system as an intern.
              </RevealItem>
            </Reveal>

            <Reveal as="ul" className={styles.principles} staggerChildren={0.1} aria-label="Engineering principles">
              {profile.principles.map((p, i) => (
                <RevealItem as="li" key={p.title} className={styles.principle}>
                  <span className={styles.principleIcon}>
                    <Icon name={PRINCIPLE_ICONS[i]} size={18} />
                  </span>
                  <div>
                    <h3 className={styles.principleTitle}>{p.title}</h3>
                    <p className={styles.principleText}>{p.text}</p>
                  </div>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Expertise chain */}
        <Reveal className={styles.chainHead}>
          <h3 className={styles.subTitle}>Areas of expertise</h3>
          <p className={styles.subLead}>One connected path — from the code to the platform it runs on.</p>
        </Reveal>
        <m.ol
          className={styles.chain}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16 } } }}
          aria-label="Areas of expertise"
        >
          {profile.focus.map((f, i) => (
            <m.li
              key={f.label}
              className={styles.chainItem}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              {i > 0 && (
                <m.span
                  className={styles.chainLink}
                  aria-hidden="true"
                  variants={{
                    hidden: { scaleX: 0, scaleY: 0 },
                    show: { scaleX: 1, scaleY: 1, transition: { duration: 0.4, ease: EASE } },
                  }}
                />
              )}
              <div className={styles.chainNode}>
                <span className={styles.chainIcon}>
                  <Icon name={FOCUS_ICONS[i]} size={20} />
                </span>
                <span className={styles.chainLabel}>{f.label}</span>
                <span className={styles.chainSub}>{f.sub}</span>
              </div>
            </m.li>
          ))}
        </m.ol>

        {/* Core technologies */}
        <Reveal className={styles.tokens} staggerChildren={0.05}>
          <RevealItem as="span" className={styles.tokensLabel}>
            Core stack
          </RevealItem>
          {coreSkills.map((s) => (
            <RevealItem as="span" key={s.id} className="chip chip-accent">
              {s.name}
            </RevealItem>
          ))}
          <RevealItem as="span">
            <a href="#skills" className={styles.tokensMore}>
              All skills <Icon name="arrow-right" size={14} />
            </a>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
