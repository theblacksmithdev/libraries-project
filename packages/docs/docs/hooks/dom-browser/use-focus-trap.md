---
sidebar_label: useFocusTrap
title: useFocusTrap
description: Traps keyboard focus within a container element, cycling through focusable children on Tab/Shift+Tab.
---

# useFocusTrap

Traps keyboard focus within a container element, cycling through focusable children on Tab/Shift+Tab.

## Import

```tsx
import { useFocusTrap } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const ref = useFocusTrap<HTMLDivElement>(isOpen);

  if (!isOpen) return null;

  return (
    <div ref={ref} role="dialog" aria-modal="true">
      <h2>Confirm Action</h2>
      <p>Are you sure you want to proceed?</p>
      <button onClick={onClose}>Cancel</button>
      <button onClick={onClose}>Confirm</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type      | Default | Description                                    |
| --------- | --------- | ------- | ---------------------------------------------- |
| `active`  | `boolean` | `true`  | When `true`, the focus trap is active. Set to `false` to disable. |

### Return Value

| Property | Type                   | Description                                    |
| -------- | ---------------------- | ---------------------------------------------- |
| `ref`    | `RefObject<T \| null>` | A ref to attach to the container element.      |

### Focusable Elements

The focus trap targets elements matching this selector:

```
a[href], button:not([disabled]), input:not([disabled]),
textarea:not([disabled]), select:not([disabled]),
[tabindex]:not([tabindex="-1"])
```

## Notes

- When activated, the first focusable element inside the container receives focus automatically.
- On `Tab`, focus cycles from the last focusable element back to the first. On `Shift+Tab`, focus cycles from the first to the last.
- When the trap is deactivated (on cleanup), focus is restored to the element that was focused before the trap was activated.
- The list of focusable elements is recalculated on each Tab press, so dynamically added or removed elements are handled correctly.
- The generic type parameter `T` must extend `HTMLElement`.

## Related Hooks

- [useFocusWithin](./use-focus-within.md) -- track whether focus is inside a container
- [useKeyPress](./use-key-press.md) -- listen for specific key presses
