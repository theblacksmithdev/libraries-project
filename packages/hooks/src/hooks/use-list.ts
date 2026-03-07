import { useCallback, useState } from 'react';

export function useList<T>(initialValue: T[] = []) {
  const [list, setList] = useState(initialValue);

  const push = useCallback((...items: T[]) => {
    setList((l) => [...l, ...items]);
  }, []);

  const removeAt = useCallback((index: number) => {
    setList((l) => l.filter((_, i) => i !== index));
  }, []);

  const updateAt = useCallback((index: number, item: T) => {
    setList((l) => l.map((v, i) => (i === index ? item : v)));
  }, []);

  const insertAt = useCallback((index: number, item: T) => {
    setList((l) => [...l.slice(0, index), item, ...l.slice(index)]);
  }, []);

  const clear = useCallback(() => setList([]), []);

  const filter = useCallback((fn: (item: T, index: number) => boolean) => {
    setList((l) => l.filter(fn));
  }, []);

  const reset = useCallback(() => setList(initialValue), [initialValue]);

  return [list, { push, removeAt, updateAt, insertAt, clear, filter, reset, set: setList }] as const;
}
