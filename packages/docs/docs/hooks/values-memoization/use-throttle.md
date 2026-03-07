---
sidebar_label: useThrottle
title: useThrottle
description: Throttles a value, ensuring it updates at most once per specified interval.
---

# useThrottle

Throttles a value, ensuring it updates at most once per specified interval.

## Import

```tsx
import { useThrottle } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useState } from 'react';
import { useThrottle } from '@blacksmith-ui/hooks';

function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 200);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div>Scroll position: {throttledScrollY}px</div>;
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `T` | - | The value to throttle. Can be any type. |
| `interval` | `number` | - | The minimum interval between updates in milliseconds. |

### Return Value

| Type | Description |
|------|-------------|
| `T` | The throttled value. Updates at most once per `interval` ms. |

## Notes

- If enough time has elapsed since the last update (>= `interval`), the value updates immediately.
- If the value changes within the interval window, a trailing update is scheduled for the remaining time. This ensures the final value is never lost.
- The timeout is cleaned up on unmount, preventing state updates on unmounted components.
- Unlike `useDebounce`, this hook guarantees periodic updates during rapid changes rather than waiting for changes to stop.

## Related Hooks

- [`useThrottledCallback`](./use-throttled-callback.md) - Throttles a callback function instead of a value.
- [`useDebounce`](./use-debounce.md) - Debounces a value, waiting for changes to stop before updating.
