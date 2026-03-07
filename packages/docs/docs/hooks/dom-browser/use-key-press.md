---
sidebar_label: useKeyPress
title: useKeyPress
description: Listens for a specific keyboard key press and invokes a callback.
---

# useKeyPress

Listens for a specific keyboard key press and invokes a callback.

## Import

```tsx
import { useKeyPress } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function EscapeHandler() {
  useKeyPress('Escape', (event) => {
    console.log('Escape key pressed');
    closeModal();
  });

  return <div>Press Escape to close the modal.</div>;
}

// With options
function EnterHandler() {
  useKeyPress('Enter', (event) => {
    submitForm();
  }, { event: 'keyup', enabled: isFormValid });

  return <form>...</form>;
}
```

## API Reference

### Parameters

| Parameter   | Type                              | Default     | Description                                           |
| ----------- | --------------------------------- | ----------- | ----------------------------------------------------- |
| `targetKey` | `string`                          | -           | The `KeyboardEvent.key` value to listen for (e.g., `'Escape'`, `'Enter'`, `'a'`). |
| `handler`   | `(event: KeyboardEvent) => void`  | -           | Callback invoked when the target key is pressed.      |
| `options`   | `object`                          | `{}`        | Optional configuration object (see below).            |

#### Options

| Property  | Type                      | Default     | Description                                       |
| --------- | ------------------------- | ----------- | ------------------------------------------------- |
| `event`   | `'keydown' \| 'keyup'`   | `'keydown'` | Which keyboard event to listen on.                |
| `enabled` | `boolean`                 | `true`      | When `false`, the listener is not attached.       |

### Return Value

This hook does not return a value (`void`).

## Notes

- The handler reference is kept up to date on every render via a ref, so you do not need to memoize the callback.
- The listener is attached to `window`, so it captures key events globally.
- Use the `enabled` option to conditionally enable/disable the listener without unmounting the component.
- Key matching uses strict equality with `KeyboardEvent.key`. Use standard key values like `'Enter'`, `'Escape'`, `'ArrowUp'`, etc.

## Related Hooks

- [useKeyCombo](./use-key-combo.md) -- listen for key combinations with modifier keys (Ctrl, Shift, Alt, Meta)
- [useEventListener](./use-event-listener.md) -- attach arbitrary event listeners
