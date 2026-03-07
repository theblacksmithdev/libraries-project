---
sidebar_label: useTimeout
title: useTimeout
description: A declarative hook for scheduling a one-shot timeout with a clear handle.
---

# useTimeout

A declarative hook for scheduling a one-shot timeout with a clear handle.

## Import

```tsx
import { useTimeout } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Notification({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useTimeout(() => {
    setVisible(false);
  }, 3000);

  if (!visible) return null;
  return <div className="notification">{message}</div>;
}
```

### Clearing the timeout manually

```tsx
function DelayedAction() {
  const [status, setStatus] = useState('Waiting...');
  const { clear } = useTimeout(() => setStatus('Done!'), 5000);

  return (
    <div>
      <p>{status}</p>
      <button onClick={clear}>Cancel</button>
    </div>
  );
}
```

### Disabling the timeout

Pass `null` as the delay to prevent the timeout from being scheduled:

```tsx
function ConditionalTimeout({ enabled }: { enabled: boolean }) {
  useTimeout(() => {
    console.log('Fired!');
  }, enabled ? 2000 : null);

  return <div>{enabled ? 'Will fire in 2s' : 'Disabled'}</div>;
}
```

## API Reference

### Parameters

| Parameter  | Type               | Default | Description                                                                |
|------------|--------------------|---------|----------------------------------------------------------------------------|
| `callback` | `() => void`       | -       | The function to call when the timeout fires.                               |
| `delay`    | `number \| null`   | -       | Timeout delay in milliseconds. Pass `null` to disable the timeout.         |

### Return Value

| Property | Type         | Description                          |
|----------|--------------|--------------------------------------|
| `clear`  | `() => void` | Cancels the pending timeout early.   |

## Notes

- The callback is stored in a ref, so updates to the callback do not reset the timer.
- Passing `null` as the delay prevents the timeout from being set. This is useful for conditional or deferred scheduling.
- The timeout is automatically cleared on unmount.
- The timeout is reset whenever the `delay` value changes.

## Related Hooks

- [`useInterval`](./use-interval.md) -- recurring interval instead of one-shot
- [`useCountdown`](./use-countdown.md) -- countdown timer with start/pause/reset controls
