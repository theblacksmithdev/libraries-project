import { useCallback, useRef, useState } from 'react';

type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;

interface SwipeState {
  direction: SwipeDirection;
  deltaX: number;
  deltaY: number;
  isSwiping: boolean;
}

export function useSwipe(threshold = 50) {
  const [state, setState] = useState<SwipeState>({
    direction: null,
    deltaX: 0,
    deltaY: 0,
    isSwiping: false,
  });
  const startRef = useRef({ x: 0, y: 0 });

  const onTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
    const touch = e.touches[0];
    startRef.current = { x: touch.clientX, y: touch.clientY };
    setState({ direction: null, deltaX: 0, deltaY: 0, isSwiping: true });
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent | TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - startRef.current.x;
    const deltaY = touch.clientY - startRef.current.y;
    setState((s) => ({ ...s, deltaX, deltaY }));
  }, []);

  const onTouchEnd = useCallback(() => {
    setState((s) => {
      let direction: SwipeDirection = null;
      const absDx = Math.abs(s.deltaX);
      const absDy = Math.abs(s.deltaY);

      if (absDx > absDy && absDx >= threshold) {
        direction = s.deltaX > 0 ? 'right' : 'left';
      } else if (absDy > absDx && absDy >= threshold) {
        direction = s.deltaY > 0 ? 'down' : 'up';
      }

      return { ...s, direction, isSwiping: false };
    });
  }, [threshold]);

  return {
    ...state,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
  };
}
