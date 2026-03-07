import { useCallback, useState } from 'react';

type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

interface UseAsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export function useAsync<T, Args extends unknown[] = unknown[]>(
  asyncFn: (...args: Args) => Promise<T>
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({
        status: 'pending',
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const data = await asyncFn(...args);
        setState({
          status: 'success',
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
        return data;
      } catch (err) {
        setState({
          status: 'error',
          data: null,
          error: err as Error,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
        throw err;
      }
    },
    [asyncFn]
  );

  const reset = useCallback(() => {
    setState({
      status: 'idle',
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return { ...state, execute, reset };
}
