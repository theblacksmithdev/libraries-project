---
sidebar_label: useKeyCombo
title: useKeyCombo
description: Listens for keyboard shortcuts with modifier keys (Ctrl, Shift, Alt, Meta) and invokes a callback.
---

# useKeyCombo

Listens for keyboard shortcuts with modifier keys (Ctrl, Shift, Alt, Meta) and invokes a callback.

## Import

```tsx
import { useKeyCombo } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function SaveShortcut() {
  useKeyCombo('s', (event) => {
    event.preventDefault();
    saveDocument();
  }, { ctrl: true });

  return <div>Press Ctrl+S to save.</div>;
}

// Multiple modifiers
function DebugShortcut() {
  useKeyCombo('d', () => {
    toggleDebugPanel();
  }, { ctrl: true, shift: true });

  return <div>Press Ctrl+Shift+D to toggle debug panel.</div>;
}
```

## API Reference

### Parameters

| Parameter   | Type                              | Default | Description                                              |
| ----------- | --------------------------------- | ------- | -------------------------------------------------------- |
| `key`       | `string`                          | -       | The `KeyboardEvent.key` value to listen for.             |
| `handler`   | `(event: KeyboardEvent) => void`  | -       | Callback invoked when the key combo is pressed.          |
| `modifiers` | `KeyComboOptions`                 | `{}`    | Object specifying which modifier keys must be held.      |
| `enabled`   | `boolean`                         | `true`  | When `false`, the listener is not attached.              |

#### KeyComboOptions

| Property | Type      | Default     | Description                                    |
| -------- | --------- | ----------- | ---------------------------------------------- |
| `ctrl`   | `boolean` | `undefined` | When `true`, the Ctrl key must be held down.   |
| `shift`  | `boolean` | `undefined` | When `true`, the Shift key must be held down.  |
| `alt`    | `boolean` | `undefined` | When `true`, the Alt key must be held down.    |
| `meta`   | `boolean` | `undefined` | When `true`, the Meta (Cmd/Win) key must be held down. |

### Return Value

This hook does not return a value (`void`).

## Notes

- The modifier matching is **strict**: if a modifier is not specified (or is `undefined`/`false`), that modifier must **not** be pressed. This prevents `Ctrl+S` from also firing on `Ctrl+Shift+S`.
- The handler reference is kept up to date on every render via a ref, so you do not need to memoize the callback.
- The listener is attached to `window` on the `keydown` event.
- Use `event.preventDefault()` in your handler to prevent the browser's default behavior for the key combo (e.g., Ctrl+S opening the save dialog).

## Related Hooks

- [useKeyPress](./use-key-press.md) -- listen for a single key without modifier requirements
- [useEventListener](./use-event-listener.md) -- attach arbitrary event listeners
