import { useCallback, useEffect, useRef, useState } from 'react';

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
];

export function useIdleTimer(timeout: number) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    setIsIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsIdle(true), timeout);
  }, [timeout]);

  useEffect(() => {
    resetTimer();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, resetTimer, { passive: true });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, resetTimer);
      }
    };
  }, [resetTimer]);

  return { isIdle, reset: resetTimer };
}
