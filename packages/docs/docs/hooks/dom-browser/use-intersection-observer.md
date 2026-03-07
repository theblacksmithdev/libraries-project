---
sidebar_label: useIntersectionObserver
title: useIntersectionObserver
description: Observes an element's intersection with the viewport or a root element using IntersectionObserver, providing full entry details.
---

# useIntersectionObserver

Observes an element's intersection with the viewport or a root element using IntersectionObserver, providing full entry details.

## Import

```tsx
import { useIntersectionObserver } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function FadeInSection() {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transition: 'opacity 600ms',
      }}
    >
      I fade in when 50% visible.
    </div>
  );
}

// Using the full entry for more control
function ProgressTracker() {
  const { ref, entry } = useIntersectionObserver<HTMLDivElement>({
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  const ratio = entry?.intersectionRatio ?? 0;

  return (
    <div ref={ref}>
      <p>Visibility: {Math.round(ratio * 100)}%</p>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type                              | Default | Description                         |
| --------- | --------------------------------- | ------- | ----------------------------------- |
| `options`  | `UseIntersectionObserverOptions` | `{}`    | Configuration for the observer.     |

#### UseIntersectionObserverOptions

| Property     | Type                   | Default     | Description                                                       |
| ------------ | ---------------------- | ----------- | ----------------------------------------------------------------- |
| `threshold`  | `number \| number[]`   | `undefined` | A single number or array of thresholds at which the callback fires. Values range from `0` to `1`. |
| `root`       | `Element \| null`      | `undefined` | The element used as the viewport for checking visibility. Defaults to the browser viewport. |
| `rootMargin` | `string`               | `undefined` | Margin around the root, using CSS margin syntax (e.g., `'10px 20px'`). |

### Return Value

| Property         | Type                                   | Description                                                        |
| ---------------- | -------------------------------------- | ------------------------------------------------------------------ |
| `ref`            | `RefObject<T \| null>`                 | A ref to attach to the element you want to observe.                |
| `isIntersecting` | `boolean`                              | `true` when the element is intersecting the root/viewport.         |
| `entry`          | `IntersectionObserverEntry \| null`    | The full `IntersectionObserverEntry` object, or `null` before the first observation. |

## Notes

- The observer is re-created when `threshold`, `root`, or `rootMargin` change.
- The `entry` object provides access to `intersectionRatio`, `boundingClientRect`, `intersectionRect`, `rootBounds`, and `time` for advanced use cases.
- For a simpler boolean-only API, consider using `useElementVisibility` instead.
- The observer is disconnected on unmount.
- The generic type parameter `T` must extend `HTMLElement`.

## Related Hooks

- [useElementVisibility](./use-element-visibility.md) -- simpler boolean visibility check (no configuration)
- [useMutationObserver](./use-mutation-observer.md) -- observe DOM mutations
- [useScrollPosition](./use-scroll-position.md) -- track window scroll position
