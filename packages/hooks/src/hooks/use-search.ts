import { useMemo, useState } from 'react';
import { useDebounce } from './use-debounce';

export function useSearch<T>(
  items: T[],
  filterFn: (item: T, query: string) => boolean,
  delay = 300
) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, delay);

  const filteredItems = useMemo(
    () =>
      debouncedQuery
        ? items.filter((item) => filterFn(item, debouncedQuery))
        : items,
    [items, debouncedQuery, filterFn]
  );

  return { query, setQuery, debouncedQuery, filteredItems };
}
