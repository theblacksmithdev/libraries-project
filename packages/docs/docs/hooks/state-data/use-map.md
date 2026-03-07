---
sidebar_label: useMap
title: useMap
description: Manages a Map state with methods to set, remove, clear, and reset key-value pairs.
---

# useMap

Manages a Map state with methods to set, remove, clear, and reset key-value pairs.

## Import

```tsx
import { useMap } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function UserSettings() {
  const { map, set, remove, clear, size } = useMap<string, string>([
    ['theme', 'dark'],
    ['language', 'en'],
  ]);

  return (
    <div>
      <p>Settings ({size}):</p>
      <ul>
        {Array.from(map.entries()).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
            <button onClick={() => remove(key)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => set('fontSize', '16px')}>Add Font Size</button>
      <button onClick={clear}>Clear All</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `Iterable<[K, V]>` | `undefined` | An iterable of key-value pairs to initialize the Map (e.g., an array of tuples). |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `map` | `Map<K, V>` | The current Map instance. |
| `set` | `(key: K, value: V) => void` | Adds or updates a key-value pair. |
| `remove` | `(key: K) => void` | Deletes a key-value pair by key. |
| `clear` | `() => void` | Removes all entries from the Map. |
| `reset` | `() => void` | Resets the Map to its initial value. |
| `size` | `number` | The current number of entries in the Map. |

## Notes

- Each mutation creates a new `Map` instance to trigger a React re-render, since React relies on reference equality for state updates.
- All action functions are memoized with `useCallback` and have stable references across re-renders.
- The generic types `K` and `V` are inferred from the initial value or can be specified explicitly: `useMap<string, number>()`.

## Related Hooks

- [useSet](./use-set.md) - Manages a Set of unique values.
- [useList](./use-list.md) - Manages an ordered array of items.
