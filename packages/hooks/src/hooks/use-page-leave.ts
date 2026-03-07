import { useEffect, useRef } from 'react';

export function usePageLeave(handler: () => void) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        handlerRef.current();
      }
    };

    document.addEventListener('mouseleave', listener);
    return () => document.removeEventListener('mouseleave', listener);
  }, []);
}
