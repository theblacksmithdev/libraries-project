---
sidebar_label: useTextSelection
title: useTextSelection
description: Tracks the currently selected text in the document.
---

# useTextSelection

Tracks the currently selected text in the document.

## Import

```tsx
import { useTextSelection } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function SelectionPreview() {
  const selection = useTextSelection();

  return (
    <div>
      <p>Select any text on this page to see it appear below.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      {selection && (
        <div style={{ marginTop: 16, padding: 8, background: '#f0f0f0' }}>
          Selected: "{selection}"
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type     | Description                                                      |
| -------- | -------- | ---------------------------------------------------------------- |
| (return) | `string` | The currently selected text. Returns an empty string `''` when nothing is selected. |

## Notes

- Listens to the `selectionchange` event on `document`.
- Returns the string representation of the selection via `window.getSelection()?.toString()`.
- The value updates in real time as the user modifies their text selection.
- Returns an empty string when no text is selected, which is falsy for conditional rendering.

## Related Hooks

- [useEventListener](./use-event-listener.md) -- attach arbitrary event listeners
