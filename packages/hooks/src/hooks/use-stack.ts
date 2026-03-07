import { useCallback, useState } from 'react';

export function useStack<T>(initialValue: T[] = []) {
  const [stack, setStack] = useState(initialValue);

  const push = useCallback((item: T) => {
    setStack((s) => [...s, item]);
  }, []);

  const pop = useCallback(() => {
    let removed: T | undefined;
    setStack((s) => {
      if (s.length === 0) return s;
      removed = s[s.length - 1];
      return s.slice(0, -1);
    });
    return removed;
  }, []);

  const peek = stack[stack.length - 1];

  const clear = useCallback(() => setStack([]), []);

  const reset = useCallback(() => setStack(initialValue), [initialValue]);

  return { stack, push, pop, peek, clear, reset, size: stack.length };
}
