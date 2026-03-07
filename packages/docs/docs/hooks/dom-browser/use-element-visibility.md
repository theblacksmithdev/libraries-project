---
sidebar_label: useElementVisibility
title: useElementVisibility
description: Tracks whether a DOM element is visible in the viewport using IntersectionObserver.
---

# useElementVisibility

Tracks whether a DOM element is visible in the viewport using IntersectionObserver.

## Import

```tsx
import { useElementVisibility } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function LazySection() {
  const { ref, isVisible } = useElementVisibility<HTMLDivElement>();

  return (
    <div ref={ref}>
      {isVisible ? (
        <ExpensiveComponent />
      ) : (
        <div style={{ height: 400 }}>Loading...</div>
      )}
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters. The generic type parameter `T` must extend `HTMLElement`.

### Return Value

| Property    | Type                   | Description                                                |
| ----------- | ---------------------- | ---------------------------------------------------------- |
| `ref`       | `RefObject<T \| null>` | A ref to attach to the element you want to observe.        |
| `isVisible` | `boolean`              | `true` when any part of the element is visible in the viewport, `false` otherwise. |

## Notes

- Uses `IntersectionObserver` with a threshold of `0`, meaning the element is considered visible as soon as even one pixel enters the viewport.
- This is a simpler alternative to `useIntersectionObserver` when you only need a boolean visibility flag.
- The observer is set up in a `useEffect`, so the element must be mounted before observation begins.
- The observer is disconnected on unmount.

## Related Hooks

- [useIntersectionObserver](./use-intersection-observer.md) -- full IntersectionObserver access with configurable threshold, root, and rootMargin
- [useElementSize](./use-element-size.md) -- track element dimensions
