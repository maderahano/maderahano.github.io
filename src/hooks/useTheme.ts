import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
const KEY = 'theme';

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const current = document.documentElement.dataset.theme;
  return current === 'light' ? 'light' : 'dark';
}

/** Dark by default; the pre-paint script in index.html applies the stored value before React mounts. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* storage unavailable (private mode) — fine */
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle } as const;
}
