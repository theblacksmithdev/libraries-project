---
sidebar_label: useThrottledCallback
title: useThrottledCallback
description: Returns a throttled version of a callback function that invokes at most once per specified interval.
---

# useThrottledCallback

Returns a throttled version of a callback function that invokes at most once per specified interval.

## Import

```tsx
import { useThrottledCallback } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useThrottledCallback } from '@blacksmith-ui/hooks';

function ResizeObserverComponent() {
  const { throttledFn: handleResize, cancel } = useThrottledCallback(
    (width: number, height: number) => {
      updateLayout(width, height);
    },
    150
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      handleResize(width, height);
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      cancel();
    };
  }, [handleResize, cancel]);

  return <div ref={containerRef}>Resizable content</div>;
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `callback` | `T extends (...args: unknown[]) => void` | - | The callback function to throttle. |
| `interval` | `number` | - | The minimum interval between invocations in milliseconds. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `throttledFn` | `(...args: Parameters<T>) => void` | The throttled version of the callback. Accepts the same arguments as the original callback. |
| `cancel` | `() => void` | Cancels any pending throttled invocation. |

## Notes

- If enough time has elapsed since the last call (>= `interval`), the callback is invoked immediately.
- If called again within the interval window, a trailing invocation is scheduled for the remaining time. This ensures the last call is never dropped.
- The callback ref is kept up to date on every render, so the throttled function always calls the latest version of the callback.
- The `throttledFn` reference is stable across renders as long as `interval` does not change.
- Any pending invocation is automatically cancelled on unmount.
- The `cancel` function is stable across renders and can be safely used in dependency arrays.

## Related Hooks

- [`useThrottle`](./use-throttle.md) - Throttles a value instead of a callback.
- [`useDebouncedCallback`](./use-debounced-callback.md) - Debounces a callback function instead of throttling it.
