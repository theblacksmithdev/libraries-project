---
sidebar_label: useMediaQuery
title: useMediaQuery
description: Subscribes to a CSS media query and returns whether it currently matches.
---

# useMediaQuery

Subscribes to a CSS media query and returns whether it currently matches.

## Import

```tsx
import { useMediaQuery } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {prefersDark && <p>Dark mode is enabled at the OS level.</p>}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type     | Default | Description                                          |
|-----------|----------|---------|------------------------------------------------------|
| `query`   | `string` | -       | A valid CSS media query string (e.g. `'(max-width: 768px)'`). |

### Return Value

| Type      | Description                                                         |
|-----------|---------------------------------------------------------------------|
| `boolean` | `true` if the media query currently matches, `false` otherwise.     |

## Notes

- The hook initializes synchronously using `window.matchMedia(query).matches` so the first render reflects the current state.
- On the server (`typeof window === 'undefined'`), the hook returns `false` by default.
- The hook listens to the `change` event on the `MediaQueryList` and updates reactively when the match status changes (e.g. on window resize or system preference change).
- If the `query` string changes between renders, the listener is torn down and re-created for the new query.

## Related Hooks

- [`useBreakpoint`](./use-breakpoint.md) -- returns the current named breakpoint based on window width.
- [`useColorScheme`](./use-color-scheme.md) -- specifically tracks `prefers-color-scheme`.
- [`useReducedMotion`](./use-reduced-motion.md) -- specifically tracks `prefers-reduced-motion`.
- [`useWindowSize`](./use-window-size.md) -- returns the raw window dimensions instead of matching a query.
