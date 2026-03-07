---
sidebar_label: useSessionStorage
title: useSessionStorage
description: Persists state to sessionStorage with automatic JSON serialization and SSR safety.
---

# useSessionStorage

Persists state to sessionStorage with automatic JSON serialization and SSR safety.

## Import

```tsx
import { useSessionStorage } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function WizardProgress() {
  const [step, setStep, removeStep] = useSessionStorage('wizard-step', 0);

  return (
    <div>
      <p>Current step: {step}</p>
      <button onClick={() => setStep((prev) => prev + 1)}>Next Step</button>
      <button onClick={() => setStep((prev) => Math.max(0, prev - 1))}>
        Previous Step
      </button>
      <button onClick={removeStep}>Restart Wizard</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `key` | `string` | (required) | The sessionStorage key to read from and write to. |
| `initialValue` | `T` | (required) | The fallback value used when no stored value exists or parsing fails. |

### Return Value

Returns a tuple `[storedValue, setValue, removeValue]`:

| Property | Type | Description |
|----------|------|-------------|
| `storedValue` | `T` | The current value (from sessionStorage or the initial value). |
| `setValue` | `(value: T \| ((prev: T) => T)) => void` | Updates the value in both React state and sessionStorage. Accepts a direct value or an updater function. |
| `removeValue` | `() => void` | Removes the key from sessionStorage and resets the state to `initialValue`. |

## Notes

- **SSR-safe**: On the server (`typeof window === 'undefined'`), the hook returns `initialValue` without accessing `sessionStorage`.
- **Session-scoped**: Unlike `localStorage`, `sessionStorage` data is cleared when the browser tab is closed.
- **No cross-tab sync**: Unlike `useLocalStorage`, this hook does not listen to the `storage` event because `sessionStorage` is scoped to a single tab.
- **JSON serialization**: Values are serialized with `JSON.stringify` and deserialized with `JSON.parse`. Ensure your values are JSON-serializable.
- **Error handling**: Silently falls back to `initialValue` if `sessionStorage` is unavailable, full, or the stored JSON is corrupted.
- The `setValue` function supports updater functions just like `useState`: `setValue(prev => prev + 1)`.

## Related Hooks

- [useLocalStorage](./use-local-storage.md) - Same API but uses `localStorage` (data persists across sessions and supports cross-tab sync).
