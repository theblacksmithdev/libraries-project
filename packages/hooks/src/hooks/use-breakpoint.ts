import { useEffect, useState } from 'react';

const DEFAULT_BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type DefaultBreakpoint = keyof typeof DEFAULT_BREAKPOINTS;

export function useBreakpoint<T extends Record<string, number> = typeof DEFAULT_BREAKPOINTS>(
  breakpoints?: T
): keyof T {
  const bp = (breakpoints ?? DEFAULT_BREAKPOINTS) as Record<string, number>;

  const getBreakpoint = () => {
    if (typeof window === 'undefined') return Object.keys(bp)[0] as keyof T;
    const width = window.innerWidth;
    const entries = Object.entries(bp).sort(([, a], [, b]) => b - a);
    for (const [name, minWidth] of entries) {
      if (width >= minWidth) return name as keyof T;
    }
    return Object.keys(bp)[0] as keyof T;
  };

  const [breakpoint, setBreakpoint] = useState<keyof T>(getBreakpoint);

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
