---
sidebar_label: useLongPress
title: useLongPress
description: Detects long press gestures on both mouse and touch devices and invokes a callback after a configurable delay.
---

# useLongPress

Detects long press gestures on both mouse and touch devices and invokes a callback after a configurable delay.

## Import

```tsx
import { useLongPress } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function LongPressButton() {
  const longPressHandlers = useLongPress(() => {
    alert('Long press detected!');
  }, 800);

  return <button {...longPressHandlers}>Press and hold me</button>;
}
```

## API Reference

### Parameters

| Parameter  | Type         | Default | Description                                          |
| ---------- | ------------ | ------- | ---------------------------------------------------- |
| `callback` | `() => void` | -       | Function invoked when the long press duration is met. |
| `delay`    | `number`     | `500`   | Time in milliseconds before the callback fires.      |

### Return Value

Returns an object of event handlers to spread onto the target element.

| Property       | Type                    | Description                          |
| -------------- | ----------------------- | ------------------------------------ |
| `onMouseDown`  | `() => void`            | Starts the long press timer.         |
| `onMouseUp`    | `() => void`            | Cancels the timer if released early. |
| `onMouseLeave` | `() => void`            | Cancels the timer if the cursor leaves the element. |
| `onTouchStart` | `() => void`            | Starts the long press timer (touch). |
| `onTouchEnd`   | `() => void`            | Cancels the timer if released early (touch). |

## Notes

- Works on both mouse and touch interactions -- spread the returned handlers onto your element.
- The callback reference is kept up to date on every render via a ref, so you do not need to memoize it.
- If the user releases or moves the cursor away before the `delay`, the callback is not fired.
- The timer resets on each new press.

## Related Hooks

- [useHover](./use-hover.md) -- track mouse hover state
- [useSwipe](./use-swipe.md) -- detect swipe gestures on touch devices
- [useDrag](./use-drag.md) -- track mouse drag interactions
