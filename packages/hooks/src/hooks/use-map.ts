import { useCallback, useState } from 'react';

export function useMap<K, V>(initialValue?: Iterable<[K, V]>) {
  const [map, setMap] = useState(() => new Map<K, V>(initialValue));

  const set = useCallback((key: K, value: V) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prev) => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const clear = useCallback(() => setMap(new Map()), []);

  const reset = useCallback(
    () => setMap(new Map(initialValue)),
    [initialValue]
  );

  return { map, set, remove, clear, reset, size: map.size };
}
