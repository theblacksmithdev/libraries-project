import { useMemo, useState, useCallback, useRef } from 'react';

interface UseVirtualListOptions {
  itemHeight: number;
  overscan?: number;
}

export function useVirtualList<T>(items: T[], options: UseVirtualListOptions) {
  const { itemHeight, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const containerRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      setContainerHeight(node.clientHeight);
    }
  }, []);

  const onScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;

  const { startIndex, endIndex, virtualItems } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(items.length - 1, start + visibleCount + overscan * 2);

    const virtual = [];
    for (let i = start; i <= end; i++) {
      virtual.push({
        index: i,
        item: items[i],
        offsetTop: i * itemHeight,
      });
    }

    return { startIndex: start, endIndex: end, virtualItems: virtual };
  }, [items, scrollTop, containerHeight, itemHeight, overscan]);

  return {
    containerRef,
    onScroll,
    totalHeight,
    virtualItems,
    startIndex,
    endIndex,
  };
}
