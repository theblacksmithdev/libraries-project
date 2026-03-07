import { useCallback, useState } from 'react';

export function useSet<T>(initialValue?: Iterable<T>) {
  const [set, setSet] = useState(() => new Set<T>(initialValue));

  const add = useCallback((value: T) => {
    setSet((prev) => new Set(prev).add(value));
  }, []);

  const remove = useCallback((value: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const toggle = useCallback((value: T) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  }, []);

  const has = useCallback((value: T) => set.has(value), [set]);

  const clear = useCallback(() => setSet(new Set()), []);

  const reset = useCallback(
    () => setSet(new Set(initialValue)),
    [initialValue]
  );

  return { set, add, remove, toggle, has, clear, reset, size: set.size };
}
