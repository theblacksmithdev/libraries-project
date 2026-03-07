---
sidebar_label: useAbortController
title: useAbortController
description: Provides a managed AbortController that automatically aborts on unmount and supports request cancellation.
---

# useAbortController

Provides a managed AbortController that automatically aborts on unmount and supports request cancellation.

## Import

```tsx
import { useAbortController } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function SearchResults() {
  const { getSignal, abort } = useAbortController();
  const [results, setResults] = useState<string[]>([]);

  const search = async (query: string) => {
    const signal = getSignal(); // aborts any previous in-flight request
    try {
      const res = await fetch(`/api/search?q=${query}`, { signal });
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Search failed:', err);
      }
    }
  };

  return (
    <div>
      <input onChange={(e) => search(e.target.value)} placeholder="Search..." />
      <button onClick={abort}>Cancel</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `getSignal` | `() => AbortSignal` | Creates a new `AbortController`, aborts any previous one, and returns the new controller's `signal`. |
| `abort` | `() => void` | Aborts the current `AbortController` and sets the internal reference to `null`. |

## Notes

- Calling `getSignal()` automatically aborts the previous controller before creating a new one. This makes it ideal for search-as-you-type patterns where only the latest request matters.
- The controller is automatically aborted when the component unmounts, preventing state updates on unmounted components.
- This hook is lower-level than `useFetch`, which has built-in abort handling. Use `useAbortController` when you need manual control over cancellation in custom fetch logic.
- The `abort()` function is safe to call even if no controller exists (it is a no-op in that case).

## Related Hooks

- [useFetch](./use-fetch.md) - Higher-level hook with built-in abort handling for simple fetch use cases.
- [useAsync](./use-async.md) - For wrapping async functions; combine with `useAbortController` for cancellable async operations.
