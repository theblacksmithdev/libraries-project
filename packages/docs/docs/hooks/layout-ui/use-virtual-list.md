---
sidebar_label: useVirtualList
title: useVirtualList
description: Virtualizes a large list by only rendering the visible items plus an overscan buffer.
---

# useVirtualList

Virtualizes a large list by only rendering the visible items plus an overscan buffer.

## Import

```tsx
import { useVirtualList } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function VirtualizedList({ items }: { items: string[] }) {
  const { containerRef, onScroll, totalHeight, virtualItems } = useVirtualList(
    items,
    { itemHeight: 40, overscan: 5 }
  );

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      style={{ height: 400, overflow: 'auto' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {virtualItems.map(({ index, item, offsetTop }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: offsetTop,
              height: 40,
              width: '100%',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type                     | Default | Description                               |
| --------- | ------------------------ | ------- | ----------------------------------------- |
| `items`   | `T[]`                    | --      | The full array of items to virtualize.     |
| `options`  | `UseVirtualListOptions` | --      | Configuration object (see below).          |

#### `UseVirtualListOptions`

| Property     | Type     | Default | Description                                                                 |
| ------------ | -------- | ------- | --------------------------------------------------------------------------- |
| `itemHeight` | `number` | --      | Fixed height (in pixels) of each list item. **Required.**                   |
| `overscan`   | `number` | `5`     | Number of extra items to render above and below the visible window.          |

### Return Value

| Property       | Type                                                            | Description                                                         |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| `containerRef` | `(node: HTMLElement \| null) => void`                           | Callback ref to attach to the scrollable container element.          |
| `onScroll`     | `(e: React.UIEvent<HTMLElement>) => void`                       | Scroll event handler to attach to the scrollable container.          |
| `totalHeight`  | `number`                                                        | Total height of all items (`items.length * itemHeight`). Use this to size the inner wrapper so the scrollbar reflects the full list. |
| `virtualItems` | `Array<{ index: number; item: T; offsetTop: number }>`          | The slice of items currently visible (plus overscan), each with its absolute `offsetTop` for positioning. |
| `startIndex`   | `number`                                                        | Index of the first rendered item in the source array.                |
| `endIndex`     | `number`                                                        | Index of the last rendered item in the source array.                 |

## Notes

- This hook assumes **fixed-height rows**. Variable-height rows are not supported.
- The `containerRef` is a callback ref (not a `React.RefObject`). Pass it directly to the scrollable container's `ref` prop.
- You must also attach `onScroll` to the same container for scroll tracking to work.
- The inner wrapper element should use `position: relative` and set its `height` to `totalHeight`. Each virtual item should be `position: absolute` with `top` set to `offsetTop`.

## Related Hooks

- [useInfiniteScroll](./use-infinite-scroll.md) -- for loading more data as the user scrolls, often combined with virtualization.
