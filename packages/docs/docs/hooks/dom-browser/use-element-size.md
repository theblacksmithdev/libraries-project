---
sidebar_label: useElementSize
title: useElementSize
description: Tracks the width and height of a DOM element using ResizeObserver.
---

# useElementSize

Tracks the width and height of a DOM element using ResizeObserver.

## Import

```tsx
import { useElementSize } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ResponsivePanel() {
  const { ref, width, height } = useElementSize<HTMLDivElement>();

  return (
    <div ref={ref} style={{ resize: 'both', overflow: 'auto', border: '1px solid #ccc' }}>
      <p>Width: {Math.round(width)}px</p>
      <p>Height: {Math.round(height)}px</p>
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters. The generic type parameter `T` must extend `HTMLElement`.

### Return Value

| Property | Type                          | Description                                             |
| -------- | ----------------------------- | ------------------------------------------------------- |
| `ref`    | `(node: T \| null) => void`  | A callback ref to attach to the element you want to measure. |
| `width`  | `number`                      | The current content width of the element in pixels.     |
| `height` | `number`                      | The current content height of the element in pixels.    |

## Notes

- Uses a **callback ref** pattern, not a `useRef` ref. Pass it directly as the `ref` prop.
- Internally uses `ResizeObserver`, so the size updates automatically when the element resizes.
- Initial size is `{ width: 0, height: 0 }` until the element is mounted and observed.
- The previous observer is disconnected if the ref is reassigned to a different element.

## Related Hooks

- [useBoundingClientRect](./use-bounding-client-rect.md) -- track the full bounding rect including position
- [useElementVisibility](./use-element-visibility.md) -- check if an element is visible in the viewport
