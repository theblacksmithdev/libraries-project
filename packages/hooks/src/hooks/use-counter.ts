import { useCallback, useState } from 'react';

interface UseCounterOptions {
  min?: number;
  max?: number;
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min, max } = options;

  const clamp = useCallback(
    (v: number) => {
      let result = v;
      if (min !== undefined) result = Math.max(result, min);
      if (max !== undefined) result = Math.min(result, max);
      return result;
    },
    [min, max]
  );

  const [count, setCount] = useState(() => clamp(initialValue));

  const increment = useCallback(
    (step = 1) => setCount((c) => clamp(c + step)),
    [clamp]
  );

  const decrement = useCallback(
    (step = 1) => setCount((c) => clamp(c - step)),
    [clamp]
  );

  const set = useCallback(
    (value: number) => setCount(clamp(value)),
    [clamp]
  );

  const reset = useCallback(
    () => setCount(clamp(initialValue)),
    [initialValue, clamp]
  );

  return { count, increment, decrement, set, reset };
}
