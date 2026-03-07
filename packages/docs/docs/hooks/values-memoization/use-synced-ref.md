---
sidebar_label: useSyncedRef
title: useSyncedRef
description: Returns a ref object that stays synchronized with the provided value on every render.
---

# useSyncedRef

Returns a ref object that stays synchronized with the provided value on every render.

## Import

```tsx
import { useSyncedRef } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useCallback } from 'react';
import { useSyncedRef } from '@blacksmith-ui/hooks';

function useStableCallback<T extends (...args: unknown[]) => unknown>(
  callback: T
): T {
  const callbackRef = useSyncedRef(callback);

  // The returned function never changes identity, but always
  // calls the latest version of `callback`.
  return useCallback(
    ((...args: unknown[]) => callbackRef.current(...args)) as T,
    []
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `T` | - | The value to synchronize the ref with. Can be any type. |

### Return Value

| Type | Description |
|------|-------------|
| `React.MutableRefObject<T>` | A mutable ref object whose `.current` property is always the latest `value`. |

## Notes

- The ref is updated synchronously during render (not inside `useEffect`), so `.current` reflects the latest value immediately.
- The returned ref object is stable across renders (same reference identity), only `.current` is updated.
- This is particularly useful for avoiding stale closures in callbacks passed to `useEffect`, `setTimeout`, `setInterval`, or event listeners.
- This hook is functionally identical to `useLatest`. Both exist for naming preference and discoverability.
- Does not cause re-renders when the value changes, since it uses a ref internally.

## Related Hooks

- [`useLatest`](./use-latest.md) - Identical behavior; always points to the latest value.
- [`usePrevious`](./use-previous.md) - Returns the value from the previous render instead of the current one.
- [`useConst`](./use-const.md) - Returns a value that is computed once and never changes.
