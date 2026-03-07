---
sidebar_label: useDebouncedCallback
title: useDebouncedCallback
description: Returns a debounced version of a callback function that delays invocation until after a specified delay.
---

# useDebouncedCallback

Returns a debounced version of a callback function that delays invocation until after a specified delay.

## Import

```tsx
import { useDebouncedCallback } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useDebouncedCallback } from '@blacksmith-ui/hooks';

function SearchInput() {
  const { debouncedFn: handleSearch, cancel } = useDebouncedCallback(
    (query: string) => {
      fetchSearchResults(query);
    },
    300
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={cancel}>Cancel pending search</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | `T extends (...args: unknown[]) => void` | - | The callback function to debounce. |
| `delay` | `number` | - | The debounce delay in milliseconds. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `debouncedFn` | `(...args: Parameters<T>) => void` | The debounced version of the callback. Accepts the same arguments as the original callback. |
| `cancel` | `() => void` | Cancels any pending debounced invocation. |

## Notes

- The callback ref is kept up to date on every render, so the debounced function always calls the latest version of the callback without needing to restart the timer.
- The `debouncedFn` reference is stable across renders as long as `delay` does not change.
- Any pending invocation is automatically cancelled on unmount to prevent calling the callback after the component is removed from the DOM.
- The `cancel` function is stable across renders and can be safely used in dependency arrays.

## Related Hooks

- [`useDebounce`](./use-debounce.md) - Debounces a value instead of a callback.
- [`useThrottledCallback`](./use-throttled-callback.md) - Throttles a callback function instead of debouncing it.
