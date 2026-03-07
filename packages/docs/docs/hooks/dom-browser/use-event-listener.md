---
sidebar_label: useEventListener
title: useEventListener
description: Attaches an event listener to the window or a specific HTML element with automatic cleanup.
---

# useEventListener

Attaches an event listener to the window or a specific HTML element with automatic cleanup.

## Import

```tsx
import { useEventListener } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
// Listen to window events
function WindowResizeLogger() {
  useEventListener('resize', (event) => {
    console.log('Window resized:', window.innerWidth, window.innerHeight);
  });

  return <div>Resize the window and check the console.</div>;
}

// Listen to element events
function InputTracker() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEventListener('focus', () => {
    console.log('Input focused');
  }, inputRef);

  return <input ref={inputRef} />;
}
```

## API Reference

### Parameters

| Parameter   | Type                                            | Default    | Description                                                                 |
| ----------- | ----------------------------------------------- | ---------- | --------------------------------------------------------------------------- |
| `eventName` | `string`                                        | -          | The name of the event to listen for (e.g., `'resize'`, `'click'`, `'focus'`). |
| `handler`   | `(event: Event) => void`                        | -          | The event handler callback. The event type is inferred from the event name.  |
| `element`   | `React.RefObject<HTMLElement \| null>`           | `undefined` | Optional ref to the target element. Defaults to `window` when omitted.      |
| `options`   | `boolean \| AddEventListenerOptions`            | `undefined` | Optional event listener options (e.g., `{ passive: true, capture: true }`). |

### Return Value

This hook does not return a value (`void`).

### Overloads

The hook provides two typed overloads:

1. **Window events** -- When `element` is omitted, the event type is inferred from `WindowEventMap`.
2. **Element events** -- When a `RefObject<T>` is passed, the event type is inferred from `HTMLElementEventMap`.

## Notes

- The handler reference is kept up to date on every render via a ref, so you do not need to memoize the callback.
- The listener is automatically removed and re-added when `eventName`, `element`, or `options` change.
- When no element ref is provided, events are attached to `window`.

## Related Hooks

- [useKeyPress](./use-key-press.md) -- listen for specific key presses
- [useClickOutside](./use-click-outside.md) -- detect clicks outside an element
