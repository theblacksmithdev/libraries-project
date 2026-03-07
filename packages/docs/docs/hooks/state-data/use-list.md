---
sidebar_label: useList
title: useList
description: Manages an array state with convenient methods for pushing, removing, updating, inserting, filtering, and clearing items.
---

# useList

Manages an array state with convenient methods for pushing, removing, updating, inserting, filtering, and clearing items.

## Import

```tsx
import { useList } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function TodoList() {
  const [todos, { push, removeAt, updateAt, clear, reset }] = useList<string>([
    'Buy groceries',
    'Walk the dog',
  ]);

  return (
    <div>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => removeAt(i)}>Remove</button>
            <button onClick={() => updateAt(i, todo + ' (done)')}>Done</button>
          </li>
        ))}
      </ul>
      <button onClick={() => push('New task')}>Add Task</button>
      <button onClick={clear}>Clear All</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `T[]` | `[]` | The initial array of items. |

### Return Value

Returns a tuple `[list, actions]`:

| Property | Type | Description |
|----------|------|-------------|
| `list` | `T[]` | The current array. |
| `actions.push` | `(...items: T[]) => void` | Appends one or more items to the end of the list. |
| `actions.removeAt` | `(index: number) => void` | Removes the item at the given index. |
| `actions.updateAt` | `(index: number, item: T) => void` | Replaces the item at the given index. |
| `actions.insertAt` | `(index: number, item: T) => void` | Inserts an item at the given index, shifting subsequent items. |
| `actions.clear` | `() => void` | Removes all items from the list. |
| `actions.filter` | `(fn: (item: T, index: number) => boolean) => void` | Filters the list in place using the provided predicate. |
| `actions.reset` | `() => void` | Resets the list to the initial value. |
| `actions.set` | `React.Dispatch<React.SetStateAction<T[]>>` | The raw state setter for full control. |

## Notes

- All action functions are memoized with `useCallback` and have stable references across re-renders.
- The `push` method accepts variadic arguments, so you can add multiple items at once: `push('a', 'b', 'c')`.
- The `set` action is the raw `useState` setter, which also accepts an updater function: `set(prev => [...prev, item])`.
- The generic type `T` is inferred from the initial value or can be specified explicitly: `useList<string>()`.

## Related Hooks

- [useQueue](./use-queue.md) - FIFO queue data structure.
- [useStack](./use-stack.md) - LIFO stack data structure.
- [useMap](./use-map.md) - Key-value pair state management.
- [useSet](./use-set.md) - Unique value collection state management.
