---
sidebar_label: useIdleTimer
title: useIdleTimer
description: Detects user inactivity by monitoring mouse, keyboard, touch, and scroll events.
---

# useIdleTimer

Detects user inactivity by monitoring mouse, keyboard, touch, and scroll events.

## Import

```tsx
import { useIdleTimer } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function SessionGuard({ children }: { children: React.ReactNode }) {
  const { isIdle, reset } = useIdleTimer(5 * 60 * 1000); // 5 minutes

  if (isIdle) {
    return (
      <div>
        <p>You have been idle. Click to continue.</p>
        <button onClick={reset}>I'm still here</button>
      </div>
    );
  }

  return <>{children}</>;
}
```

### Auto-logout on idle

```tsx
function AutoLogout() {
  const { isIdle } = useIdleTimer(10 * 60 * 1000); // 10 minutes

  useEffect(() => {
    if (isIdle) {
      logout();
    }
  }, [isIdle]);

  return <App />;
}
```

## API Reference

### Parameters

| Parameter | Type     | Default | Description                                       |
|-----------|----------|---------|---------------------------------------------------|
| `timeout` | `number` | -       | Idle timeout in milliseconds.                     |

### Return Value

| Property | Type         | Description                                                   |
|----------|--------------|---------------------------------------------------------------|
| `isIdle` | `boolean`    | `true` when the user has been inactive for longer than `timeout`. |
| `reset`  | `() => void` | Manually resets the idle timer and sets `isIdle` to `false`.  |

## Monitored Events

The hook listens for the following `window` events (all registered with `{ passive: true }`):

- `mousemove`
- `mousedown`
- `keydown`
- `touchstart`
- `scroll`

Any of these events will reset the idle timer.

## Notes

- The timer starts immediately on mount. If no user activity occurs within the `timeout`, `isIdle` becomes `true`.
- All event listeners are registered with `{ passive: true }` for performance.
- Event listeners and the internal timeout are cleaned up on unmount.
- This hook only works in browser environments since it relies on `window` event listeners.

## Related Hooks

- [`useTimeout`](./use-timeout.md) -- generic one-shot timeout primitive
- [`useInterval`](./use-interval.md) -- recurring interval for polling patterns
