---
sidebar_label: useStickyHeader
title: useStickyHeader
description: Tracks whether the page has scrolled past a threshold to trigger a sticky header state.
---

# useStickyHeader

Tracks whether the page has scrolled past a threshold to trigger a sticky header state.

## Import

```tsx
import { useStickyHeader } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Header() {
  const isSticky = useStickyHeader(64);

  return (
    <header
      className={`transition-shadow ${isSticky ? 'fixed top-0 shadow-lg' : 'relative'}`}
    >
      <nav>My App</nav>
    </header>
  );
}
```

## API Reference

### Parameters

| Parameter   | Type     | Default | Description                                                       |
| ----------- | -------- | ------- | ----------------------------------------------------------------- |
| `threshold` | `number` | `0`     | The vertical scroll offset (in pixels) at which the header becomes sticky. |

### Return Value

| Type      | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `boolean` | `true` when `window.scrollY` exceeds the `threshold`, `false` otherwise. |

## Notes

- The scroll listener is registered with `{ passive: true }` for optimal scroll performance.
- The handler runs once on mount so the initial scroll position is evaluated immediately.
- Not SSR-safe out of the box -- `window` is accessed inside a `useEffect`, so it will not throw on the server, but will always initialize as `false`.
- If the `threshold` value changes, the listener is torn down and re-attached.

## Related Hooks

- [useInfiniteScroll](./use-infinite-scroll.md) -- also reacts to scroll position, but for loading more content.
