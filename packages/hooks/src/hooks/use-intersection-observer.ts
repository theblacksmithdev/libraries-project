import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setIsIntersecting(observerEntry.isIntersecting);
        setEntry(observerEntry);
      },
      {
        threshold: options.threshold,
        root: options.root,
        rootMargin: options.rootMargin,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return { ref, isIntersecting, entry };
}
