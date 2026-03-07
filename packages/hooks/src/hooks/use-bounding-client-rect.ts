import { useCallback, useRef, useState } from 'react';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const EMPTY_RECT: Rect = { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };

export function useBoundingClientRect<T extends HTMLElement>() {
  const [rect, setRect] = useState<Rect>(EMPTY_RECT);
  const observerRef = useRef<ResizeObserver | null>(null);

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const update = () => {
        const r = node.getBoundingClientRect();
        setRect({
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height,
          top: r.top,
          right: r.right,
          bottom: r.bottom,
          left: r.left,
        });
      };

      update();

      const observer = new ResizeObserver(update);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, []);

  return { ref, rect };
}
