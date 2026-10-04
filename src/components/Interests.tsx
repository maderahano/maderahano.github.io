import { resume } from '../data/resume';
import { Icon, type IconName } from './Icon';
import { Reveal, RevealItem } from './Reveal';
import { SectionHead } from './SectionHead';
import styles from './Interests.module.css';

const ICONS: IconName[] = ['git-branch', 'cube', 'play'];

export function Interests() {
  if (!resume.interests.length) return null;
  return (
    <section id="interests" className="section" aria-labelledby="interests-title">
      <div className="container">
        <SectionHead id="interests-title" eyebrow="Beyond work" title="What keeps me curious." />
        <Reveal as="ul" className={styles.grid} staggerChildren={0.1}>
          {resume.interests.map((it, i) => (
            <RevealItem as="li" key={it.title} className={`card ${styles.card}`}>
              <span className={styles.icon}>
                <Icon name={ICONS[i % ICONS.length]} size={20} />
              </span>
              <h3 className={styles.title}>{it.title}</h3>
              <p className={styles.text}>{it.text}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
