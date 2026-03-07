import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'blacksmith-ui-dark-mode';

function getInitialValue(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return JSON.parse(stored) as boolean;
  } catch {
    // ignore
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialValue);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
    } catch {
      // Storage unavailable
    }
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((v) => !v), []);
  const enable = useCallback(() => setIsDark(true), []);
  const disable = useCallback(() => setIsDark(false), []);

  return { isDark, toggle, enable, disable };
}
