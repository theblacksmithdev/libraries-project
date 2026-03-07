import { useCallback, useState } from 'react';

export function useQueue<T>(initialValue: T[] = []) {
  const [queue, setQueue] = useState(initialValue);

  const enqueue = useCallback((item: T) => {
    setQueue((q) => [...q, item]);
  }, []);

  const dequeue = useCallback(() => {
    let removed: T | undefined;
    setQueue((q) => {
      if (q.length === 0) return q;
      [removed] = q;
      return q.slice(1);
    });
    return removed;
  }, []);

  const peek = queue[0];

  const clear = useCallback(() => setQueue([]), []);

  const reset = useCallback(() => setQueue(initialValue), [initialValue]);

  return { queue, enqueue, dequeue, peek, clear, reset, size: queue.length };
}
