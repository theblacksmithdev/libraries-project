---
sidebar_label: useDarkMode
title: useDarkMode
description: Manages dark mode state with localStorage persistence and class-based toggling on the document root.
---

# useDarkMode

Manages dark mode state with localStorage persistence and class-based toggling on the document root.

## Import

```tsx
import { useDarkMode } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ThemeToggle() {
  const { isDark, toggle, enable, disable } = useDarkMode();

  return (
    <div>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <button onClick={toggle}>Toggle theme</button>
      <button onClick={enable}>Force dark</button>
      <button onClick={disable}>Force light</button>
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property  | Type         | Description                                      |
|-----------|--------------|--------------------------------------------------|
| `isDark`  | `boolean`    | `true` when dark mode is active.                 |
| `toggle`  | `() => void` | Toggles between dark and light mode.             |
| `enable`  | `() => void` | Enables dark mode.                               |
| `disable` | `() => void` | Disables dark mode.                              |

## Notes

- State is persisted to `localStorage` under the key `blacksmith-ui-dark-mode`. On mount, the hook reads from storage first; if no stored value is found, it falls back to the system preference via `prefers-color-scheme: dark`.
- The hook adds or removes the `dark` class on `document.documentElement`, which is compatible with Tailwind CSS `darkMode: ['class']` configuration.
- On the server (`typeof window === 'undefined'`), the initial value defaults to `false`.
- The `toggle`, `enable`, and `disable` callbacks are memoized with `useCallback` and are stable across renders.
- If `localStorage` is unavailable (e.g. in an iframe with restricted storage), the hook silently ignores storage errors and still works in-memory.

## Related Hooks

- [`useColorScheme`](./use-color-scheme.md) -- read-only access to the OS-level color scheme preference.
- [`useMediaQuery`](./use-media-query.md) -- subscribe to arbitrary media queries including `prefers-color-scheme`.
