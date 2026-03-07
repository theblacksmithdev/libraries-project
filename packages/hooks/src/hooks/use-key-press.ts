import { useEffect, useRef } from 'react';

export function useKeyPress(
  targetKey: string,
  handler: (event: KeyboardEvent) => void,
  options: { event?: 'keydown' | 'keyup'; enabled?: boolean } = {}
) {
  const { event = 'keydown', enabled = true } = options;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    const listener = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        handlerRef.current(e);
      }
    };

    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, [targetKey, event, enabled]);
}
