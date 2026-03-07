import { useState } from 'react';

export function useDefault<T>(initialValue: T, defaultValue: T) {
  const [value, setValue] = useState<T | null | undefined>(initialValue);
  return [
    value === null || value === undefined ? defaultValue : value,
    setValue,
  ] as const;
}
