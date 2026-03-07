import { useCallback, useRef, useState } from 'react';

interface UseRetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
}

export function useRetry<T, Args extends unknown[] = unknown[]>(
  fn: (...args: Args) => Promise<T>,
  options: UseRetryOptions = {}
) {
  const { maxAttempts = 3, delay = 1000, backoff = true } = options;
  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const execute = useCallback(
    async (...args: Args) => {
      setIsRetrying(true);
      setError(null);

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        setAttempts(attempt + 1);
        try {
          const result = await fnRef.current(...args);
          setData(result);
          setIsRetrying(false);
          return result;
        } catch (err) {
          if (attempt === maxAttempts - 1) {
            setError(err as Error);
            setIsRetrying(false);
            return undefined as unknown as T;
          }
          const waitTime = backoff ? delay * Math.pow(2, attempt) : delay;
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    },
    [maxAttempts, delay, backoff]
  );

  const reset = useCallback(() => {
    setAttempts(0);
    setIsRetrying(false);
    setError(null);
    setData(null);
  }, []);

  return { execute, data, error, attempts, isRetrying, reset };
}
