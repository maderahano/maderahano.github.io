import { resume } from '../data/resume';
import { Icon, type IconName } from './Icon';
import styles from './Footer.module.css';

const ICONS: Record<string, IconName> = { email: 'mail', linkedin: 'linkedin', github: 'github' };

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {resume.profile.name}
        </p>
        <p className={styles.built}>Built with React, TypeScript, Vite &amp; Framer Motion</p>
        <ul className={styles.social} aria-label="Social links">
          {resume.contacts.map((c) => (
            <li key={c.id}>
              <a
                href={c.href}
                aria-label={c.label}
                target={c.id === 'email' ? undefined : '_blank'}
                rel={c.id === 'email' ? undefined : 'noopener noreferrer'}
              >
                <Icon name={ICONS[c.id]} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
