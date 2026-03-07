---
sidebar_label: useBoundingClientRect
title: useBoundingClientRect
description: Tracks the full bounding client rect of a DOM element, updating on resize.
---

# useBoundingClientRect

Tracks the full bounding client rect of a DOM element, updating on resize.

## Import

```tsx
import { useBoundingClientRect } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function TooltipPositioner() {
  const { ref, rect } = useBoundingClientRect<HTMLButtonElement>();

  return (
    <>
      <button ref={ref}>Hover me</button>
      <div
        style={{
          position: 'fixed',
          top: rect.bottom + 8,
          left: rect.left,
        }}
      >
        Tooltip content positioned below the button
      </div>
    </>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters. The generic type parameter `T` must extend `HTMLElement`.

### Return Value

| Property | Type                         | Description                                               |
| -------- | ---------------------------- | --------------------------------------------------------- |
| `ref`    | `(node: T \| null) => void` | A callback ref to attach to the element you want to measure. |
| `rect`   | `Rect`                       | The current bounding client rect of the element.          |

#### Rect

| Property | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `x`      | `number` | The x-coordinate of the element.         |
| `y`      | `number` | The y-coordinate of the element.         |
| `width`  | `number` | The width of the element.                |
| `height` | `number` | The height of the element.               |
| `top`    | `number` | Distance from the top of the viewport.   |
| `right`  | `number` | Distance from the left + width.          |
| `bottom` | `number` | Distance from the top + height.          |
| `left`   | `number` | Distance from the left of the viewport.  |

## Notes

- Uses a **callback ref** pattern with `ResizeObserver` to automatically update the rect when the element resizes.
- The initial rect values are all `0` until the element is mounted and measured.
- The rect is read from `getBoundingClientRect()`, which returns values relative to the viewport. Scrolling the page will not trigger an update unless the element also resizes.
- The previous observer is disconnected when the ref is reassigned to a different element.

## Related Hooks

- [useElementSize](./use-element-size.md) -- track only width and height (simpler alternative)
- [useScrollPosition](./use-scroll-position.md) -- track window scroll position
