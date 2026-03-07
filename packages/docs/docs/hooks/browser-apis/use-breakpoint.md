---
sidebar_label: useBreakpoint
title: useBreakpoint
description: Returns the current named responsive breakpoint based on window width, with support for custom breakpoints.
---

# useBreakpoint

Returns the current named responsive breakpoint based on window width, with support for custom breakpoints.

## Import

```tsx
import { useBreakpoint } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
// Using default Tailwind-style breakpoints
function ResponsiveLayout() {
  const breakpoint = useBreakpoint();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      {breakpoint === 'xs' || breakpoint === 'sm' ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

```tsx
// Using custom breakpoints
const appBreakpoints = {
  mobile: 0,
  tablet: 600,
  desktop: 1200,
} as const;

function CustomBreakpointExample() {
  const breakpoint = useBreakpoint(appBreakpoints);
  // breakpoint is typed as 'mobile' | 'tablet' | 'desktop'

  return <p>Layout: {breakpoint}</p>;
}
```

## API Reference

### Parameters

| Parameter     | Type                        | Default              | Description                                                |
|---------------|-----------------------------|----------------------|------------------------------------------------------------|
| `breakpoints` | `T extends Record<string, number>` | See default table below | An object mapping breakpoint names to minimum pixel widths. |

**Default breakpoints** (matching Tailwind CSS):

| Name   | Min Width (px) |
|--------|----------------|
| `xs`   | `0`            |
| `sm`   | `640`          |
| `md`   | `768`          |
| `lg`   | `1024`         |
| `xl`   | `1280`         |
| `2xl`  | `1536`         |

### Return Value

| Type      | Description                                                                           |
|-----------|---------------------------------------------------------------------------------------|
| `keyof T` | The name of the largest breakpoint whose min-width is less than or equal to the current window width. When using default breakpoints, the type is `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`. |

## Notes

- Breakpoints are sorted in descending order by min-width. The hook returns the first (largest) breakpoint whose value is `<=` the current `window.innerWidth`.
- On the server (`typeof window === 'undefined'`), returns the first key of the breakpoints object (the smallest breakpoint).
- Listens to the `resize` event on the `window` object. The handler is not debounced.
- The hook is generic -- when you pass a custom breakpoints object, the return type is automatically narrowed to the keys of that object.

## Related Hooks

- [`useWindowSize`](./use-window-size.md) -- returns raw pixel dimensions instead of a named breakpoint.
- [`useMediaQuery`](./use-media-query.md) -- match against a specific CSS media query string.
