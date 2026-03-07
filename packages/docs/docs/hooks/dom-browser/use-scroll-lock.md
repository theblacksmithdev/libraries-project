---
sidebar_label: useScrollLock
title: useScrollLock
description: Locks body scroll when active, preventing background scrolling behind modals or overlays.
---

# useScrollLock

Locks body scroll when active, preventing background scrolling behind modals or overlays.

## Import

```tsx
import { useScrollLock } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Body scroll is locked while this modal is open.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type      | Default | Description                                    |
| --------- | --------- | ------- | ---------------------------------------------- |
| `locked`  | `boolean` | -       | When `true`, body scroll is locked. When `false`, scroll is restored. |

### Return Value

This hook does not return a value (`void`).

## Notes

- Sets `document.body.style.overflow` to `'hidden'` when locked.
- Compensates for scrollbar width by adding equivalent `paddingRight` to `document.body`, preventing layout shift when the scrollbar disappears.
- Restores the original `overflow` and `paddingRight` values on cleanup, preserving any pre-existing styles.
- Toggling `locked` between `true` and `false` dynamically locks and unlocks scrolling.

## Related Hooks

- [useScrollPosition](./use-scroll-position.md) -- track the current scroll position
- [useFocusTrap](./use-focus-trap.md) -- trap focus within a modal or dialog
