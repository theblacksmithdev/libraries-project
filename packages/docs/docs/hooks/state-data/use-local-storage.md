---
sidebar_label: useLocalStorage
title: useLocalStorage
description: Persists state to localStorage with automatic JSON serialization, cross-tab sync, and SSR safety.
---

# useLocalStorage

Persists state to localStorage with automatic JSON serialization, cross-tab sync, and SSR safety.

## Import

```tsx
import { useLocalStorage } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ThemePreference() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}>
        Toggle
      </button>
      <button onClick={removeTheme}>Remove Preference</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `key` | `string` | (required) | The localStorage key to read from and write to. |
| `initialValue` | `T` | (required) | The fallback value used when no stored value exists or parsing fails. |

### Return Value

Returns a tuple `[storedValue, setValue, removeValue]`:

| Property | Type | Description |
|----------|------|-------------|
| `storedValue` | `T` | The current value (from localStorage or the initial value). |
| `setValue` | `(value: T \| ((prev: T) => T)) => void` | Updates the value in both React state and localStorage. Accepts a direct value or an updater function. |
| `removeValue` | `() => void` | Removes the key from localStorage and resets the state to `initialValue`. |

## Notes

- **SSR-safe**: On the server (`typeof window === 'undefined'`), the hook returns `initialValue` without accessing `localStorage`.
- **Cross-tab sync**: Listens to the `storage` event, so changes made in other tabs/windows are automatically reflected.
- **JSON serialization**: Values are serialized with `JSON.stringify` and deserialized with `JSON.parse`. Ensure your values are JSON-serializable.
- **Error handling**: Silently falls back to `initialValue` if `localStorage` is unavailable, full, or the stored JSON is corrupted.
- The `setValue` function supports updater functions just like `useState`: `setValue(prev => prev + 1)`.

## Related Hooks

- [useSessionStorage](./use-session-storage.md) - Same API but uses `sessionStorage` (data is cleared when the tab closes).
