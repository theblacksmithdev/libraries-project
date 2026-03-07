---
sidebar_label: useStopwatch
title: useStopwatch
description: An elapsed-time stopwatch hook with lap recording, start, pause, and reset controls.
---

# useStopwatch

An elapsed-time stopwatch hook with lap recording, start, pause, and reset controls.

## Import

```tsx
import { useStopwatch } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Timer() {
  const { elapsed, isRunning, laps, start, pause, reset, lap } = useStopwatch();

  const formatTime = (ms: number) => {
    const secs = Math.floor(ms / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${secs}.${String(centis).padStart(2, '0')}`;
  };

  return (
    <div>
      <p>{formatTime(elapsed)}</p>
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={start}>Start</button>
      )}
      <button onClick={lap} disabled={!isRunning}>Lap</button>
      <button onClick={reset}>Reset</button>

      {laps.length > 0 && (
        <ol>
          {laps.map((l, i) => (
            <li key={i}>{formatTime(l)}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property    | Type         | Description                                                      |
|-------------|--------------|------------------------------------------------------------------|
| `elapsed`   | `number`     | Elapsed time in milliseconds since the stopwatch started.        |
| `isRunning` | `boolean`    | Whether the stopwatch is currently ticking.                      |
| `laps`      | `number[]`   | Array of recorded lap times (each value is `elapsed` at that moment). |
| `start`     | `() => void` | Starts or resumes the stopwatch.                                 |
| `pause`     | `() => void` | Pauses the stopwatch, preserving elapsed time.                   |
| `reset`     | `() => void` | Stops the stopwatch and resets elapsed time and laps to zero.    |
| `lap`       | `() => void` | Records the current `elapsed` value into the `laps` array.      |

## Notes

- The stopwatch ticks every 10 milliseconds for high-precision timing.
- `elapsed` is tracked in milliseconds. Divide by 1000 for seconds.
- `lap` captures the current `elapsed` value at the moment it is called.
- Calling `reset` clears both the elapsed time and all recorded laps.
- The interval is cleaned up on unmount.

## Related Hooks

- [`useCountdown`](./use-countdown.md) -- counts down instead of up
- [`useInterval`](./use-interval.md) -- lower-level recurring interval primitive
