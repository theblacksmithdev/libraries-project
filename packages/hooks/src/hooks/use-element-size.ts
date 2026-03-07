import { useCallback, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement>() {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });
      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

  return { ref, ...size };
}
