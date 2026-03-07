---
sidebar_label: useConst
title: useConst
description: Initializes and returns a constant value that is computed once and never changes across re-renders.
---

# useConst

Initializes and returns a constant value that is computed once and never changes across re-renders.

## Import

```tsx
import { useConst } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useConst } from '@blacksmith-ui/hooks';

function ExpensiveComponent() {
  // The parser is created once and reused on every render.
  const parser = useConst(() => new DOMParser());

  // Useful for creating stable object references.
  const defaultOptions = useConst(() => ({
    retries: 3,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
  }));

  return <div>Ready</div>;
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initializer` | `() => T` | - | A factory function that computes the constant value. Called exactly once on the first render. |

### Return Value

| Type | Description |
|------|-------------|
| `T` | The value returned by the `initializer` function. The same value is returned on every subsequent render. |

## Notes

- The `initializer` function is called exactly once, during the first render. It is never called again, even if the component re-renders.
- Unlike `useMemo`, this hook guarantees the value is never recomputed. React may discard and recompute `useMemo` values when it needs to free memory.
- The value is stored inside a ref wrapper (`{ value: T }`), so it persists across renders without triggering re-renders.
- Do not pass a value directly (e.g., `useConst(new Map())`). Always pass a factory function (e.g., `useConst(() => new Map())`), otherwise the expression is evaluated on every render even though the result is discarded.
- Useful for class instances, configuration objects, or any expensive computation that should only happen once.

## Related Hooks

- [`useLatest`](./use-latest.md) - Keeps a ref to a value that updates every render (opposite of constant).
- [`useSyncedRef`](./use-synced-ref.md) - Keeps a ref synchronized with the latest value.
