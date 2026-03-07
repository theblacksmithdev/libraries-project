---
sidebar_label: useInfiniteScroll
title: useInfiniteScroll
description: Triggers a callback when a scrollable element is near its bottom, enabling infinite scroll pagination.
---

# useInfiniteScroll

Triggers a callback when a scrollable element is near its bottom, enabling infinite scroll pagination.

## Import

```tsx
import { useInfiniteScroll } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Feed() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const next = await fetchMoreItems();
    setItems((prev) => [...prev, ...next]);
    setLoading(false);
  }, [loading]);

  const scrollRef = useInfiniteScroll<HTMLDivElement>(loadMore, {
    threshold: 200,
    enabled: !loading,
  });

  return (
    <div ref={scrollRef} style={{ height: 500, overflow: 'auto' }}>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter    | Type                           | Default | Description                                                  |
| ------------ | ------------------------------ | ------- | ------------------------------------------------------------ |
| `onLoadMore` | `() => void`                   | --      | Callback invoked when the user scrolls near the bottom. **Required.** |
| `options`    | `UseInfiniteScrollOptions`     | `{}`    | Configuration object (see below).                             |

#### `UseInfiniteScrollOptions`

| Property    | Type      | Default | Description                                                                                   |
| ----------- | --------- | ------- | --------------------------------------------------------------------------------------------- |
| `threshold` | `number`  | `100`   | Distance from the bottom (in pixels) at which `onLoadMore` fires.                              |
| `enabled`   | `boolean` | `true`  | Set to `false` to temporarily disable the scroll listener (e.g., while a request is in flight). |

### Return Value

| Type                            | Description                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `React.MutableRefObject<T \| null>` | A ref to attach to the scrollable container element. The generic `T` extends `HTMLElement`. |

## Notes

- The `onLoadMore` callback is stored in a mutable ref internally, so changes to it do not cause the scroll listener to be re-attached. This means you do not need to memoize `onLoadMore` for stability, though it is still good practice.
- The scroll listener uses `{ passive: true }` for performance.
- The listener is attached to the **element** you assign the ref to, not to `window`. Make sure the element has a fixed height and `overflow: auto` (or `scroll`).
- Set `enabled` to `false` while fetching to avoid duplicate `onLoadMore` calls.

## Related Hooks

- [useVirtualList](./use-virtual-list.md) -- often combined with infinite scroll to efficiently render large lists.
- [useStickyHeader](./use-sticky-header.md) -- also scroll-aware, but for header visibility.
