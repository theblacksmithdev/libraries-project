import { useRef } from 'react';

export function useConst<T>(initializer: () => T): T {
  const ref = useRef<{ value: T } | null>(null);

  if (ref.current === null) {
    ref.current = { value: initializer() };
  }

  return ref.current.value;
}
