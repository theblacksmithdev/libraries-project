---
sidebar_label: useFullscreen
title: useFullscreen
description: Manages the Fullscreen API for a referenced element, providing enter, exit, and toggle controls.
---

# useFullscreen

Manages the Fullscreen API for a referenced element, providing enter, exit, and toggle controls.

## Import

```tsx
import { useFullscreen } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function VideoPlayer() {
  const { ref, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();

  return (
    <div ref={ref}>
      <video src="/video.mp4" controls />
      <button onClick={toggle}>
        {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </button>
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters. The generic type parameter `T` must extend `HTMLElement`.

### Return Value

| Property       | Type                      | Description                                            |
| -------------- | ------------------------- | ------------------------------------------------------ |
| `ref`          | `RefObject<T \| null>`    | A ref to attach to the element you want to fullscreen. |
| `isFullscreen` | `boolean`                 | `true` when the document has an active fullscreen element. |
| `enter`        | `() => Promise<void>`     | Requests fullscreen on the referenced element.         |
| `exit`         | `() => Promise<void>`     | Exits fullscreen mode if currently active.             |
| `toggle`       | `() => Promise<void>`     | Toggles between fullscreen and normal mode.            |

## Notes

- The hook listens to the `fullscreenchange` event on `document` to keep `isFullscreen` in sync, including when the user exits fullscreen via the Escape key.
- The `enter`, `exit`, and `toggle` functions are async because the Fullscreen API returns promises.
- Uses optional chaining (`requestFullscreen?.()`) for safety in environments where the Fullscreen API is not available.
- The `isFullscreen` state reflects whether **any** element is in fullscreen mode (via `document.fullscreenElement`), not just the referenced element.

## Related Hooks

- [useElementSize](./use-element-size.md) -- track element dimensions
- [useEventListener](./use-event-listener.md) -- attach arbitrary event listeners
