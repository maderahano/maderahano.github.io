import { resume } from '../data/resume';
import { formatRange } from '../utils/dates';
import { Icon } from './Icon';
import { Reveal, RevealItem } from './Reveal';
import { SectionHead } from './SectionHead';
import styles from './Education.module.css';

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHead id="education-title" eyebrow="Education" title="Where it started." />
        <Reveal as="ul" className={styles.list} staggerChildren={0.1}>
          {resume.education.map((ed) => (
            <RevealItem as="li" key={ed.institution} className={`card ${styles.card}`}>
              <span className={styles.icon}>
                <Icon name="school" size={22} />
              </span>
              <div className={styles.text}>
                <h3 className={styles.degree}>{ed.degree}</h3>
                <p className={styles.school}>{ed.institution}</p>
                <p className={styles.meta}>
                  <span>
                    <Icon name="calendar" size={14} /> {formatRange(ed.start, ed.end)}
                  </span>
                  <span>
                    <Icon name="pin" size={14} /> {ed.location}
                  </span>
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
