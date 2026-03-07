---
sidebar_label: useClickOutside
title: useClickOutside
description: Detects clicks outside a referenced element and invokes a callback.
---

# useClickOutside

Detects clicks outside a referenced element and invokes a callback.

## Import

```tsx
import { useClickOutside } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Dropdown() {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div ref={ref}>
      <p>Click outside this dropdown to close it.</p>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type       | Default | Description                                      |
| --------- | ---------- | ------- | ------------------------------------------------ |
| `handler`  | `() => void` | -       | Callback function invoked when a click outside the referenced element is detected. |

### Return Value

| Property | Type                  | Description                                    |
| -------- | --------------------- | ---------------------------------------------- |
| `ref`    | `RefObject<T \| null>` | A React ref to attach to the element you want to monitor for outside clicks. |

## Notes

- Listens to both `mousedown` and `touchstart` events on `document`, so it works on both desktop and mobile.
- The handler reference is kept up to date on every render via a ref, so you do not need to memoize the callback.
- Clicks on the element itself or its descendants are ignored.
- The generic type parameter `T` must extend `HTMLElement` (e.g., `useClickOutside<HTMLDivElement>`).

## Related Hooks

- [useFocusWithin](./use-focus-within.md) -- track whether focus is inside a container
- [useEventListener](./use-event-listener.md) -- attach arbitrary event listeners
