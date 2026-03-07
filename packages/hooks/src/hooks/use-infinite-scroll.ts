import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  enabled?: boolean;
}

export function useInfiniteScroll<T extends HTMLElement>(
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 100, enabled = true } = options;
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(onLoadMore);
  callbackRef.current = onLoadMore;

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = node;
      if (scrollHeight - scrollTop - clientHeight <= threshold) {
        callbackRef.current();
      }
    };

    node.addEventListener('scroll', handleScroll, { passive: true });
    return () => node.removeEventListener('scroll', handleScroll);
  }, [threshold, enabled]);

  return ref;
}
