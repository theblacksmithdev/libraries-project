import { useCallback, useState, useEffect } from 'react';

function getStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') return initialValue;
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    getStoredValue(key, initialValue)
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Storage full or unavailable
        }
        return nextValue;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Storage unavailable
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(
          e.newValue !== null
            ? (JSON.parse(e.newValue) as T)
            : initialValue
        );
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}
