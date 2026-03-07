---
sidebar_label: useColorScheme
title: useColorScheme
description: Returns the user's OS-level color scheme preference (light or dark).
---

# useColorScheme

Returns the user's OS-level color scheme preference (`'light'` or `'dark'`).

## Import

```tsx
import { useColorScheme } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ThemeAwareComponent() {
  const colorScheme = useColorScheme();

  return (
    <div>
      <p>Your system prefers: {colorScheme} mode</p>
      {colorScheme === 'dark' ? <DarkLogo /> : <LightLogo />}
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Type                  | Description                                                     |
|-----------------------|-----------------------------------------------------------------|
| `'light' \| 'dark'`  | The current OS-level color scheme preference.                   |

## Notes

- This hook is read-only -- it reflects the operating system preference and does not toggle or persist any theme state. Use `useDarkMode` if you need a controllable dark mode toggle.
- On the server (`typeof window === 'undefined'`), the hook defaults to `'light'`.
- Updates reactively when the user changes their OS appearance settings.

## Related Hooks

- [`useDarkMode`](./use-dark-mode.md) -- controllable dark mode with persistence and class toggling.
- [`useMediaQuery`](./use-media-query.md) -- subscribe to arbitrary media queries.
