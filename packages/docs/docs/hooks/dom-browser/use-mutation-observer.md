---
sidebar_label: useMutationObserver
title: useMutationObserver
description: Observes DOM mutations on a referenced element using MutationObserver.
---

# useMutationObserver

Observes DOM mutations on a referenced element using MutationObserver.

## Import

```tsx
import { useMutationObserver } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function DomChangeLogger() {
  const ref = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        console.log('Mutation type:', mutation.type);
        console.log('Added nodes:', mutation.addedNodes.length);
        console.log('Removed nodes:', mutation.removedNodes.length);
      });
    },
    { childList: true, subtree: true, attributes: true }
  );

  return (
    <div ref={ref}>
      <p>Changes to this container's DOM will be logged.</p>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter  | Type                    | Default                                  | Description                                  |
| ---------- | ----------------------- | ---------------------------------------- | -------------------------------------------- |
| `callback` | `MutationCallback`      | -                                        | The callback invoked when mutations are observed. Receives an array of `MutationRecord` and the `MutationObserver` instance. |
| `options`  | `MutationObserverInit`  | `{ childList: true, subtree: true }`     | Configuration for which mutations to observe. |

#### Common MutationObserverInit options

| Property        | Type      | Default | Description                                      |
| --------------- | --------- | ------- | ------------------------------------------------ |
| `childList`     | `boolean` | `true`  | Observe additions and removals of child nodes.   |
| `subtree`       | `boolean` | `true`  | Observe mutations in the entire subtree.         |
| `attributes`    | `boolean` | -       | Observe changes to element attributes.           |
| `characterData` | `boolean` | -       | Observe changes to text content.                 |

### Return Value

| Property | Type                   | Description                                    |
| -------- | ---------------------- | ---------------------------------------------- |
| `ref`    | `RefObject<T \| null>` | A ref to attach to the element you want to observe. |

## Notes

- The callback reference is kept up to date on every render via a ref, so you do not need to memoize it.
- The observer is re-created when `childList`, `subtree`, `attributes`, or `characterData` options change.
- The observer is disconnected on unmount.
- The generic type parameter `T` must extend `HTMLElement`.

## Related Hooks

- [useIntersectionObserver](./use-intersection-observer.md) -- observe element visibility in the viewport
- [useElementSize](./use-element-size.md) -- track element size changes via ResizeObserver
