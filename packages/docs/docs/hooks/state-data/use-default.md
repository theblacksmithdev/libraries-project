---
sidebar_label: useDefault
title: useDefault
description: Manages state that falls back to a default value when set to null or undefined.
---

# useDefault

Manages state that falls back to a default value when set to null or undefined.

## Import

```tsx
import { useDefault } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function UserGreeting() {
  const [name, setName] = useDefault('Guest', 'Anonymous');

  return (
    <div>
      <p>Hello, {name}!</p>
      <button onClick={() => setName('Alice')}>Set Alice</button>
      <button onClick={() => setName(null)}>Clear (uses default)</button>
      <button onClick={() => setName(undefined)}>
        Clear undefined (uses default)
      </button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `T` | (required) | The initial state value. |
| `defaultValue` | `T` | (required) | The fallback value returned when the state is `null` or `undefined`. |

### Return Value

Returns a tuple `[value, setValue]`:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `T` | The current state value if it is not `null` or `undefined`, otherwise the `defaultValue`. |
| `setValue` | `React.Dispatch<React.SetStateAction<T \| null \| undefined>>` | State setter that accepts `T`, `null`, or `undefined`. |

## Notes

- The internal state type is `T | null | undefined`, but the returned `value` is always of type `T` because `null` and `undefined` are replaced by the `defaultValue`.
- Setting the state to `null` or `undefined` does not clear the state -- it causes the hook to return the `defaultValue` instead.
- This is useful for form fields or configuration values where you always need a valid fallback.

## Related Hooks

- [useUncontrolled](./use-uncontrolled.md) - For managing controlled/uncontrolled component patterns.
- [useHistoryState](./use-history-state.md) - For state with undo/redo capabilities.
