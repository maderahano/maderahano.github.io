import { useState } from 'react';
import { resume } from '../data/resume';
import { Icon, type IconName } from './Icon';
import { Reveal, RevealItem } from './Reveal';
import styles from './Contact.module.css';

const ICONS: Record<string, IconName> = { email: 'mail', linkedin: 'linkedin', github: 'github' };
const email = resume.contacts.find((c) => c.id === 'email')!;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = email.href;
    }
  };

  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <Reveal className={`card ${styles.card}`} staggerChildren={0.1}>
          <div className={styles.glow} aria-hidden="true" />
          <RevealItem as="p" className="eyebrow">
            Contact
          </RevealItem>
          <RevealItem as="h2" id="contact-title" className={styles.title}>
            Let's talk infrastructure.
          </RevealItem>
          <RevealItem as="p" className={styles.lead}>
            Open to conversations about backend platforms, cloud infrastructure and developer tooling. The quickest way
            to reach me is email.
          </RevealItem>

          <RevealItem className={styles.primary}>
            <a href={email.href} className="btn btn-primary">
              <Icon name="mail" />
              {email.value}
            </a>
            <button type="button" className="btn" onClick={copy} aria-live="polite">
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <a href={resume.profile.resumePdf} className="btn" download>
              <Icon name="download" />
              Download Resume
            </a>
          </RevealItem>

          <RevealItem as="ul" className={styles.links} aria-label="Profiles">
            {resume.contacts.map((c) => (
              <li key={c.id}>
                <a
                  href={c.href}
                  className={styles.link}
                  target={c.id === 'email' ? undefined : '_blank'}
                  rel={c.id === 'email' ? undefined : 'noopener noreferrer'}
                >
                  <span className={styles.linkIcon}>
                    <Icon name={ICONS[c.id]} size={18} />
                  </span>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>{c.label}</span>
                    <span className={styles.linkValue}>{c.value}</span>
                  </span>
                  <Icon name={c.id === 'email' ? 'arrow-right' : 'external'} size={16} className={styles.linkArrow} />
                </a>
              </li>
            ))}
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
