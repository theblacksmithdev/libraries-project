---
sidebar_label: useWindowSize
title: useWindowSize
description: Returns the current window inner width and height, updated on resize.
---

# useWindowSize

Returns the current window inner width and height, updated on resize.

## Import

```tsx
import { useWindowSize } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ViewportInfo() {
  const { width, height } = useWindowSize();

  return (
    <p>
      Window size: {width} x {height}
    </p>
  );
}
```

```tsx
function ResponsiveSidebar() {
  const { width } = useWindowSize();

  if (width < 768) {
    return <MobileDrawer />;
  }

  return <DesktopSidebar />;
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type     | Description                            |
|----------|----------|----------------------------------------|
| `width`  | `number` | The current `window.innerWidth` value. |
| `height` | `number` | The current `window.innerHeight` value.|

The return type is the `WindowSize` interface:

```ts
interface WindowSize {
  width: number;
  height: number;
}
```

## Notes

- On the server (`typeof window === 'undefined'`), both `width` and `height` default to `0`.
- Listens to the `resize` event on the `window` object. The handler is not debounced, so it fires on every resize event. Consider wrapping with your own debounce logic if performance is a concern.
- For breakpoint-based logic (e.g. mobile vs desktop), prefer `useBreakpoint` which provides named breakpoints instead of raw pixel values.

## Related Hooks

- [`useBreakpoint`](./use-breakpoint.md) -- returns a named breakpoint string based on the current width.
- [`useMediaQuery`](./use-media-query.md) -- match against a specific CSS media query.
