---
sidebar_label: useSet
title: useSet
description: Manages a Set state with methods to add, remove, toggle, and check membership of unique values.
---

# useSet

Manages a Set state with methods to add, remove, toggle, and check membership of unique values.

## Import

```tsx
import { useSet } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function TagSelector() {
  const { set, add, remove, toggle, has, clear, size } = useSet<string>([
    'react',
    'typescript',
  ]);

  const allTags = ['react', 'typescript', 'tailwind', 'vitest', 'storybook'];

  return (
    <div>
      <p>Selected tags ({size}):</p>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          style={{ fontWeight: has(tag) ? 'bold' : 'normal' }}
        >
          {tag}
        </button>
      ))}
      <button onClick={clear}>Clear All</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `Iterable<T>` | `undefined` | An iterable of values to initialize the Set. |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `set` | `Set<T>` | The current Set instance. |
| `add` | `(value: T) => void` | Adds a value to the Set. |
| `remove` | `(value: T) => void` | Removes a value from the Set. |
| `toggle` | `(value: T) => void` | Adds the value if absent, removes it if present. |
| `has` | `(value: T) => boolean` | Returns whether the value exists in the Set. |
| `clear` | `() => void` | Removes all values from the Set. |
| `reset` | `() => void` | Resets the Set to its initial value. |
| `size` | `number` | The current number of values in the Set. |

## Notes

- Each mutation creates a new `Set` instance to trigger a React re-render.
- The `has` function depends on the current `set` state and will update when the Set changes.
- All other action functions are memoized with `useCallback` and have stable references across re-renders.
- The `toggle` method is useful for checkbox-like selection patterns.

## Related Hooks

- [useMap](./use-map.md) - Manages key-value pairs using a Map.
- [useList](./use-list.md) - Manages an ordered array (allows duplicates).
