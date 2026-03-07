import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (delay === null) return;

    timerRef.current = setTimeout(() => callbackRef.current(), delay);
    return clear;
  }, [delay, clear]);

  return { clear };
}
