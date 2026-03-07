---
sidebar_label: useStack
title: useStack
description: Manages a LIFO (last-in, first-out) stack state with push, pop, and peek operations.
---

# useStack

Manages a LIFO (last-in, first-out) stack state with push, pop, and peek operations.

## Import

```tsx
import { useStack } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function BrowserHistory() {
  const { stack, push, pop, peek, clear, size } = useStack<string>();

  return (
    <div>
      <p>History depth: {size}</p>
      <p>Current page: {peek ?? 'none'}</p>
      <button onClick={() => push(`/page-${Date.now()}`)}>Visit Page</button>
      <button onClick={() => pop()} disabled={size === 0}>
        Go Back
      </button>
      <button onClick={clear}>Clear History</button>
      <ul>
        {[...stack].reverse().map((url, i) => (
          <li key={i}>{url}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `T[]` | `[]` | The initial array of items in the stack. |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `stack` | `T[]` | The current stack as an array (top of stack is the last element). |
| `push` | `(item: T) => void` | Pushes an item onto the top of the stack. |
| `pop` | `() => T \| undefined` | Removes and returns the item from the top of the stack. Returns `undefined` if the stack is empty. |
| `peek` | `T \| undefined` | The item at the top of the stack without removing it. `undefined` if empty. |
| `clear` | `() => void` | Removes all items from the stack. |
| `reset` | `() => void` | Resets the stack to its initial value. |
| `size` | `number` | The current number of items in the stack. |

## Notes

- The top of the stack is the last element in the array (`stack[stack.length - 1]`).
- `pop` returns the removed item, but because the state update is asynchronous, the returned value comes from the updater function closure. It will be `undefined` if the stack was empty.
- `peek` is a derived value (not a function), computed on each render.
- All action functions are memoized with `useCallback`.

## Related Hooks

- [useQueue](./use-queue.md) - FIFO queue data structure (first-in, first-out).
- [useList](./use-list.md) - General-purpose array state with more operations.
- [useHistoryState](./use-history-state.md) - State with undo/redo that internally uses a similar stack-like pattern.
