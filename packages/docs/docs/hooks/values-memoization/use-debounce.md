---
sidebar_label: useDebounce
title: useDebounce
description: Debounces a value, only updating after a specified delay has passed since the last change.
---

# useDebounce

Debounces a value, only updating after a specified delay has passed since the last change.

## Import

```tsx
import { useDebounce } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useState } from 'react';
import { useDebounce } from '@blacksmith-ui/hooks';

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      fetchSearchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `T` | - | The value to debounce. Can be any type. |
| `delay` | `number` | - | The debounce delay in milliseconds. |

### Return Value

| Type | Description |
|------|-------------|
| `T` | The debounced value. Only updates after `delay` ms of inactivity. |

## Notes

- The returned value will initially equal the provided `value` and will update only after the specified `delay` has elapsed without `value` changing.
- Each time `value` or `delay` changes, the internal timer resets.
- The timeout is cleaned up on unmount, preventing state updates on unmounted components.
- Useful for reducing the frequency of expensive operations like API calls triggered by user input.

## Related Hooks

- [`useDebouncedCallback`](./use-debounced-callback.md) - Debounces a callback function instead of a value.
- [`useThrottle`](./use-throttle.md) - Throttles a value to update at most once per interval.
