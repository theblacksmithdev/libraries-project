---
sidebar_label: useUpdateEffect
title: useUpdateEffect
description: A useEffect variant that skips execution on the initial mount render.
---

# useUpdateEffect

A `useEffect` variant that skips execution on the initial mount render.

## Import

```tsx
import { useUpdateEffect } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);

  // Only fetch when query *changes*, not on initial mount
  useUpdateEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(setResults);
  }, [query]);

  return (
    <ul>
      {results.map((r) => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}
```

### Tracking prop changes without initial fire

```tsx
function Notification({ theme }: { theme: string }) {
  useUpdateEffect(() => {
    toast(`Theme changed to ${theme}`);
  }, [theme]);

  return <App />;
}
```

## API Reference

### Parameters

| Parameter | Type              | Default     | Description                                                            |
|-----------|-------------------|-------------|------------------------------------------------------------------------|
| `effect`  | `EffectCallback`  | -           | The effect function to run on updates. May return a cleanup function.  |
| `deps`    | `DependencyList?` | `undefined` | Optional dependency array, same semantics as `useEffect`.              |

### Return Value

`void` -- this hook does not return anything.

## Notes

- On the very first render, the effect is skipped. It runs on all subsequent renders where the dependencies change (or on every re-render if `deps` is omitted).
- The effect callback can return a cleanup function, just like `useEffect`.
- This is useful for avoiding side effects that should not run with initial/default state (e.g., showing "value changed" toasts, sending analytics on change, etc.).

## Related Hooks

- [`useIsFirstRender`](./use-is-first-render.md) -- check whether the current render is the first
- [`useIsomorphicLayoutEffect`](./use-isomorphic-layout-effect.md) -- SSR-safe `useLayoutEffect`
- [`useIsMounted`](./use-is-mounted.md) -- check whether the component is still mounted
