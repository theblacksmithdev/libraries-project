---
sidebar_label: useLatest
title: useLatest
description: Returns a ref object that always points to the latest value, updated synchronously on every render.
---

# useLatest

Returns a ref object that always points to the latest value, updated synchronously on every render.

## Import

```tsx
import { useLatest } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useEffect } from 'react';
import { useLatest } from '@blacksmith-ui/hooks';

function IntervalLogger({ message }: { message: string }) {
  const latestMessage = useLatest(message);

  useEffect(() => {
    const id = setInterval(() => {
      // Always logs the current message, even though the effect
      // only runs once (no dependency on `message`).
      console.log(latestMessage.current);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>{message}</div>;
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `T` | - | The value to keep a ref to. Can be any type. |

### Return Value

| Type | Description |
|------|-------------|
| `React.MutableRefObject<T>` | A mutable ref object whose `.current` property is always the latest `value`. |

## Notes

- The ref is updated synchronously during render (not inside `useEffect`), so `.current` reflects the latest value immediately.
- This is particularly useful inside callbacks, event handlers, or effects that close over stale values. Instead of adding the value to the dependency array, read it from the ref.
- The returned ref object is stable across renders (same reference identity), only `.current` is updated.
- This hook is functionally identical to `useSyncedRef`. Both exist for naming preference and discoverability.

## Related Hooks

- [`useSyncedRef`](./use-synced-ref.md) - Identical behavior; keeps a ref synchronized with the latest value.
- [`usePrevious`](./use-previous.md) - Returns the value from the previous render instead of the current one.
