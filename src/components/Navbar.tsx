import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { resume } from '../data/resume';
import { useActiveSection } from '../hooks/useActiveSection';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useTheme } from '../hooks/useTheme';
import { EASE } from '../utils/motion';
import { Icon } from './Icon';
import styles from './Navbar.module.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const ids = useMemo(() => ['home', ...LINKS.map((l) => l.id)], []);
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel when the viewport grows past the breakpoint.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useFocusTrap(panelRef, open, close);

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <m.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />
      <nav className={`container ${styles.nav}`} aria-label="Primary">
        <a href="#home" className={styles.brand} onClick={close}>
          <span className={styles.brandDot} aria-hidden="true" />
          {resume.profile.shortName}
        </a>

        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`${styles.link} ${active === l.id ? styles.active : ''}`}
                aria-current={active === l.id ? 'true' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} onClick={toggle} aria-label={themeLabel} title={themeLabel}>
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={theme}
                className={styles.iconWrap}
                initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 40, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.22, ease: EASE }}
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
              </m.span>
            </AnimatePresence>
          </button>
          <a href={resume.profile.resumePdf} className={`btn btn-primary ${styles.resumeBtn}`} download>
            <Icon name="download" />
            Resume
          </a>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            id="mobile-menu"
            ref={panelRef}
            className={styles.panel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <ul className={styles.panelLinks}>
              {LINKS.map((l, i) => (
                <m.li
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25, ease: EASE }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={close}
                    className={`${styles.panelLink} ${active === l.id ? styles.active : ''}`}
                    aria-current={active === l.id ? 'true' : undefined}
                  >
                    {l.label}
                    <Icon name="chevron-right" size={16} />
                  </a>
                </m.li>
              ))}
            </ul>
            <a href={resume.profile.resumePdf} className="btn btn-primary" download onClick={close}>
              <Icon name="download" />
              Download Resume
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
