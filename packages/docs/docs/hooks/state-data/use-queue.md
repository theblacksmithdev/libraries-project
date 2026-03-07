---
sidebar_label: useQueue
title: useQueue
description: Manages a FIFO (first-in, first-out) queue state with enqueue, dequeue, and peek operations.
---

# useQueue

Manages a FIFO (first-in, first-out) queue state with enqueue, dequeue, and peek operations.

## Import

```tsx
import { useQueue } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function NotificationQueue() {
  const { queue, enqueue, dequeue, peek, clear, size } = useQueue<string>();

  return (
    <div>
      <p>Queue size: {size}</p>
      <p>Next item: {peek ?? 'empty'}</p>
      <button onClick={() => enqueue(`Notification ${Date.now()}`)}>
        Add Notification
      </button>
      <button onClick={() => dequeue()}>Dismiss Next</button>
      <button onClick={clear}>Clear All</button>
      <ul>
        {queue.map((item, i) => (
          <li key={i}>{item}</li>
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
| `initialValue` | `T[]` | `[]` | The initial array of items in the queue. |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `queue` | `T[]` | The current queue as an array (front of queue is index 0). |
| `enqueue` | `(item: T) => void` | Adds an item to the back of the queue. |
| `dequeue` | `() => T \| undefined` | Removes and returns the item at the front of the queue. Returns `undefined` if the queue is empty. |
| `peek` | `T \| undefined` | The item at the front of the queue without removing it. `undefined` if empty. |
| `clear` | `() => void` | Removes all items from the queue. |
| `reset` | `() => void` | Resets the queue to its initial value. |
| `size` | `number` | The current number of items in the queue. |

## Notes

- `dequeue` returns the removed item, but because the state update is asynchronous, the returned value comes from the updater function closure. It will be `undefined` if the queue was empty.
- `peek` is a derived value (not a function), computed on each render as `queue[0]`.
- All action functions are memoized with `useCallback`.

## Related Hooks

- [useStack](./use-stack.md) - LIFO stack data structure (last-in, first-out).
- [useList](./use-list.md) - General-purpose array state with more operations.
