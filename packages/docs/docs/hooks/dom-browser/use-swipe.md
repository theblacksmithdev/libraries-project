---
sidebar_label: useSwipe
title: useSwipe
description: Detects swipe gestures on touch devices, reporting direction and delta values.
---

# useSwipe

Detects swipe gestures on touch devices, reporting direction and delta values.

## Import

```tsx
import { useSwipe } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function SwipeableCard() {
  const { direction, deltaX, deltaY, isSwiping, handlers } = useSwipe(100);

  return (
    <div
      {...handlers}
      style={{
        transform: isSwiping ? `translateX(${deltaX}px)` : undefined,
        transition: isSwiping ? 'none' : 'transform 300ms',
      }}
    >
      <p>Swipe me!</p>
      {direction && <p>Last swipe: {direction}</p>}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter   | Type     | Default | Description                                                     |
| ----------- | -------- | ------- | --------------------------------------------------------------- |
| `threshold` | `number` | `50`    | Minimum distance in pixels required to register as a swipe.     |

### Return Value

| Property    | Type                                         | Description                                                 |
| ----------- | -------------------------------------------- | ----------------------------------------------------------- |
| `direction` | `'left' \| 'right' \| 'up' \| 'down' \| null` | The detected swipe direction after touch ends. `null` if the swipe did not exceed the threshold. |
| `deltaX`    | `number`                                     | Horizontal distance from the touch start point.             |
| `deltaY`    | `number`                                     | Vertical distance from the touch start point.               |
| `isSwiping` | `boolean`                                    | `true` while a touch interaction is in progress.            |
| `handlers`  | `object`                                     | Touch event handlers to spread onto the target element.     |

#### handlers

| Property       | Type                                           | Description                 |
| -------------- | ---------------------------------------------- | --------------------------- |
| `onTouchStart` | `(e: React.TouchEvent \| TouchEvent) => void`  | Records the touch start position. |
| `onTouchMove`  | `(e: React.TouchEvent \| TouchEvent) => void`  | Updates delta values during the gesture. |
| `onTouchEnd`   | `() => void`                                   | Calculates final direction based on deltas and threshold. |

## Notes

- The swipe direction is determined by comparing horizontal and vertical deltas. The dominant axis is used.
- Direction is only set when the delta on the dominant axis exceeds the `threshold`.
- `deltaX` and `deltaY` update in real time during the swipe, making it possible to build drag-to-dismiss or follow-finger animations.
- The `direction` value persists after the swipe ends until the next touch starts.

## Related Hooks

- [useDrag](./use-drag.md) -- track mouse drag interactions
- [useLongPress](./use-long-press.md) -- detect long press gestures
