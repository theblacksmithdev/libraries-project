---
sidebar_label: useCounter
title: useCounter
description: Manages a numeric counter state with increment, decrement, and optional min/max clamping.
---

# useCounter

Manages a numeric counter state with increment, decrement, and optional min/max clamping.

## Import

```tsx
import { useCounter } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function QuantitySelector() {
  const { count, increment, decrement, set, reset } = useCounter(1, {
    min: 0,
    max: 99,
  });

  return (
    <div>
      <button onClick={() => decrement()}>-</button>
      <span>{count}</span>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => increment(5)}>+5</button>
      <button onClick={() => set(50)}>Set to 50</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `number` | `0` | The initial counter value. Will be clamped to `min`/`max` if provided. |
| `options` | `UseCounterOptions` | `{}` | Optional configuration object. |

### UseCounterOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `min` | `number` | `undefined` | Minimum allowed value. The counter will not go below this. |
| `max` | `number` | `undefined` | Maximum allowed value. The counter will not exceed this. |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `count` | `number` | The current counter value. |
| `increment` | `(step?: number) => void` | Increases the counter by `step` (default `1`). Result is clamped to `max`. |
| `decrement` | `(step?: number) => void` | Decreases the counter by `step` (default `1`). Result is clamped to `min`. |
| `set` | `(value: number) => void` | Sets the counter to an exact value. Result is clamped to `min`/`max`. |
| `reset` | `() => void` | Resets the counter to the initial value (clamped). |

## Notes

- The initial value is clamped on mount. If you pass `initialValue: -5` with `min: 0`, the counter starts at `0`.
- All actions are memoized with `useCallback`.
- The `increment` and `decrement` functions accept an optional `step` parameter (defaults to `1`).

## Related Hooks

- [useToggle](./use-toggle.md) - For simple boolean state toggling.
