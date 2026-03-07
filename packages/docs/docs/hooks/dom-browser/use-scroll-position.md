---
sidebar_label: useScrollPosition
title: useScrollPosition
description: Tracks the current window scroll position (x and y coordinates).
---

# useScrollPosition

Tracks the current window scroll position (x and y coordinates).

## Import

```tsx
import { useScrollPosition } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ScrollIndicator() {
  const { x, y } = useScrollPosition();

  return (
    <div style={{ position: 'fixed', top: 8, right: 8, background: '#fff', padding: 8 }}>
      Scroll: {Math.round(x)}, {Math.round(y)}
    </div>
  );
}

// Show/hide header based on scroll
function StickyHeader() {
  const { y } = useScrollPosition();
  const showHeader = y < 100;

  return (
    <header style={{ opacity: showHeader ? 1 : 0, transition: 'opacity 200ms' }}>
      My App
    </header>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| `x`      | `number` | The current horizontal scroll position (`window.scrollX`). |
| `y`      | `number` | The current vertical scroll position (`window.scrollY`).   |

## Notes

- The scroll listener uses `{ passive: true }` for optimal scroll performance.
- SSR-safe: the initial state falls back to `{ x: 0, y: 0 }` when `window` is undefined.
- Updates on every scroll event. If you need throttled or debounced updates, wrap the hook's consumer in a throttle/debounce utility.

## Related Hooks

- [useScrollLock](./use-scroll-lock.md) -- lock body scroll (e.g., when a modal is open)
- [useElementVisibility](./use-element-visibility.md) -- check if an element is visible in the viewport
- [useBoundingClientRect](./use-bounding-client-rect.md) -- track element position relative to the viewport
