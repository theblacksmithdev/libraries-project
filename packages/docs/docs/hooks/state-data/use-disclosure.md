---
sidebar_label: useDisclosure
title: useDisclosure
description: Manages open/close boolean state for UI elements like modals, drawers, and popovers.
---

# useDisclosure

Manages open/close boolean state for UI elements like modals, drawers, and popovers.

## Import

```tsx
import { useDisclosure } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ModalExample() {
  const { isOpen, open, close, toggle } = useDisclosure();

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Modal content</p>
            <button onClick={close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `boolean` | `false` | The initial open state. |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | `boolean` | Whether the element is currently open. |
| `open` | `() => void` | Sets `isOpen` to `true`. |
| `close` | `() => void` | Sets `isOpen` to `false`. |
| `toggle` | `() => void` | Toggles `isOpen` to its opposite value. |

## Notes

- All action functions (`open`, `close`, `toggle`) are memoized with `useCallback` and have stable references across re-renders.
- Unlike `useToggle`, this hook returns a named object rather than a tuple, making it more semantic for disclosure patterns.

## Related Hooks

- [useToggle](./use-toggle.md) - A more general-purpose boolean toggle that returns a tuple instead of a named object.
