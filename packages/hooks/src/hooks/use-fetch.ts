import { useCallback, useEffect, useRef, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

interface UseFetchOptions extends RequestInit {
  enabled?: boolean;
}

export function useFetch<T = unknown>(url: string, options: UseFetchOptions = {}) {
  const { enabled = true, ...fetchOptions } = options;
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    isLoading: enabled,
  });
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as T;
      setState({ data, error: null, isLoading: false });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setState({ data: null, error: err as Error, isLoading: false });
      }
    }
  }, [url]);

  useEffect(() => {
    if (!enabled) return;
    fetchData();

    return () => {
      abortRef.current?.abort();
    };
  }, [enabled, fetchData]);

  return { ...state, refetch: fetchData };
}
