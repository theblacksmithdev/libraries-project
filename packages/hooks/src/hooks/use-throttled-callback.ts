import { useCallback, useEffect, useRef } from 'react';

export function useThrottledCallback<T extends (...args: unknown[]) => void>(
  callback: T,
  interval: number
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const lastCalledRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const elapsed = now - lastCalledRef.current;

      if (elapsed >= interval) {
        lastCalledRef.current = now;
        callbackRef.current(...args);
      } else {
        cancel();
        timerRef.current = setTimeout(() => {
          lastCalledRef.current = Date.now();
          callbackRef.current(...args);
        }, interval - elapsed);
      }
    },
    [interval, cancel]
  ) as (...args: Parameters<T>) => void;

  useEffect(() => cancel, [cancel]);

  return { throttledFn, cancel };
}
