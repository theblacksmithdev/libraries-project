---
sidebar_label: useInterval
title: useInterval
description: A declarative hook for setting up recurring intervals that auto-cleans on unmount.
---

# useInterval

A declarative hook for setting up recurring intervals that auto-cleans on unmount.

## Import

```tsx
import { useInterval } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function PollingStatus() {
  const [data, setData] = useState(null);

  useInterval(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then(setData);
  }, 5000);

  return <div>Status: {data?.status ?? 'Loading...'}</div>;
}
```

### Pausing the interval

Pass `null` as the delay to pause the interval without unmounting:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => setCount((c) => c + 1),
    isRunning ? 1000 : null
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning((r) => !r)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter  | Type               | Default | Description                                                                 |
|------------|--------------------|---------|-----------------------------------------------------------------------------|
| `callback` | `() => void`       | -       | The function to call on each interval tick.                                 |
| `delay`    | `number \| null`   | -       | Interval delay in milliseconds. Pass `null` to pause/disable the interval.  |

### Return Value

`void` -- this hook does not return anything.

## Notes

- The callback is stored in a ref, so you always get the latest closure without needing to list it as a dependency. This prevents the interval from being reset when the callback changes.
- Passing `null` as the delay clears the interval and prevents it from firing. This is the idiomatic way to pause or conditionally disable the interval.
- The interval is automatically cleared when the component unmounts.
- The interval is restarted whenever the `delay` value changes (but not when the callback changes).

## Related Hooks

- [`useTimeout`](./use-timeout.md) -- one-shot delay instead of recurring
- [`useCountdown`](./use-countdown.md) -- countdown timer built on intervals
- [`useStopwatch`](./use-stopwatch.md) -- elapsed-time stopwatch built on intervals
