---
sidebar_label: useDrag
title: useDrag
description: Tracks mouse drag interactions, providing current position and delta values.
---

# useDrag

Tracks mouse drag interactions, providing current position and delta values.

## Import

```tsx
import { useDrag } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function DraggableBox() {
  const { isDragging, deltaX, deltaY, onMouseDown } = useDrag();

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        width: 100,
        height: 100,
        background: isDragging ? '#3b82f6' : '#93c5fd',
        transform: `translate(${deltaX}px, ${deltaY}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      Drag me
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property      | Type                                            | Description                                              |
| ------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `isDragging`  | `boolean`                                       | `true` while the mouse button is held and dragging.      |
| `x`           | `number`                                        | Current mouse `clientX` position during drag.            |
| `y`           | `number`                                        | Current mouse `clientY` position during drag.            |
| `deltaX`      | `number`                                        | Horizontal distance from the drag start point.           |
| `deltaY`      | `number`                                        | Vertical distance from the drag start point.             |
| `onMouseDown` | `(e: React.MouseEvent \| MouseEvent) => void`   | Event handler to attach to the draggable element.        |

## Notes

- Attach `onMouseDown` to the element you want to make draggable.
- Once a drag begins, `mousemove` and `mouseup` listeners are attached to `document`, so the drag continues even if the cursor leaves the element.
- Listeners are cleaned up on `mouseup` automatically.
- `deltaX` and `deltaY` represent the offset from the initial mouse-down position, making them ideal for `transform: translate()`.
- This hook only handles mouse events. For touch-based dragging, see `useSwipe`.

## Related Hooks

- [useSwipe](./use-swipe.md) -- detect swipe gestures on touch devices
- [useLongPress](./use-long-press.md) -- detect long press gestures
- [useHover](./use-hover.md) -- track mouse hover state
