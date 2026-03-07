---
sidebar_label: useHover
title: useHover
description: Tracks whether a DOM element is currently being hovered by the mouse.
---

# useHover

Tracks whether a DOM element is currently being hovered by the mouse.

## Import

```tsx
import { useHover } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function HoverCard() {
  const { ref, isHovered } = useHover<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        padding: 24,
        background: isHovered ? '#e0f0ff' : '#f5f5f5',
        transition: 'background 200ms',
      }}
    >
      {isHovered ? 'You are hovering!' : 'Hover over me'}
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters. The generic type parameter `T` must extend `HTMLElement`.

### Return Value

| Property    | Type                         | Description                                             |
| ----------- | ---------------------------- | ------------------------------------------------------- |
| `ref`       | `(node: T \| null) => void` | A callback ref to attach to the element you want to track hover state for. |
| `isHovered` | `boolean`                    | `true` while the mouse is over the element, `false` otherwise. |

## Notes

- Uses a **callback ref** pattern. The ref manages `mouseenter` and `mouseleave` event listeners internally.
- When the ref is reassigned to a different element, listeners are cleaned up on the previous element automatically.
- This hook only responds to mouse events, not touch events. For touch interactions, consider using `useLongPress` or `useSwipe`.

## Related Hooks

- [useFocusWithin](./use-focus-within.md) -- track whether focus is inside a container
- [useLongPress](./use-long-press.md) -- detect long press gestures
- [useSwipe](./use-swipe.md) -- detect swipe gestures on touch devices
