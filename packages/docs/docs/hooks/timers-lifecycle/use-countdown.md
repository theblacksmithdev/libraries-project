---
sidebar_label: useCountdown
title: useCountdown
description: A countdown timer hook with start, pause, and reset controls.
---

# useCountdown

A countdown timer hook with start, pause, and reset controls.

## Import

```tsx
import { useCountdown } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function OtpResend() {
  const { seconds, isRunning, isComplete, start, pause, reset } = useCountdown(60);

  return (
    <div>
      {isComplete ? (
        <button onClick={reset}>Resend OTP</button>
      ) : (
        <>
          <p>Resend available in {seconds}s</p>
          {isRunning ? (
            <button onClick={pause}>Pause</button>
          ) : (
            <button onClick={start}>Start</button>
          )}
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter        | Type     | Default | Description                                  |
|------------------|----------|---------|----------------------------------------------|
| `initialSeconds` | `number` | -       | The number of seconds to count down from.    |

### Return Value

| Property     | Type         | Description                                                        |
|--------------|--------------|--------------------------------------------------------------------|
| `seconds`    | `number`     | The current remaining seconds.                                     |
| `isRunning`  | `boolean`    | Whether the countdown is currently ticking.                        |
| `isComplete` | `boolean`    | `true` when `seconds` reaches `0`.                                 |
| `start`      | `() => void` | Starts (or resumes) the countdown.                                 |
| `pause`      | `() => void` | Pauses the countdown, preserving the current remaining seconds.    |
| `reset`      | `() => void` | Stops the countdown and resets seconds back to `initialSeconds`.   |

## Notes

- The countdown decrements once per second (1000 ms interval).
- When `seconds` reaches `0`, the countdown automatically stops and `isComplete` becomes `true`.
- Calling `reset` restores the timer to `initialSeconds` and stops ticking. You must call `start` again to resume.
- The interval is cleaned up on unmount.

## Related Hooks

- [`useInterval`](./use-interval.md) -- lower-level recurring interval primitive
- [`useStopwatch`](./use-stopwatch.md) -- counts up instead of down
- [`useTimeout`](./use-timeout.md) -- one-shot delay without countdown state
