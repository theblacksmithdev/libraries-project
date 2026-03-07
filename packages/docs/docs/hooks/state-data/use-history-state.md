---
sidebar_label: useHistoryState
title: useHistoryState
description: Manages state with undo/redo history, allowing navigation through previous values.
---

# useHistoryState

Manages state with undo/redo history, allowing navigation through previous values.

## Import

```tsx
import { useHistoryState } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function TextEditor() {
  const { state, set, undo, redo, clear, canUndo, canRedo } =
    useHistoryState('');

  return (
    <div>
      <input
        value={state}
        onChange={(e) => set(e.target.value)}
        placeholder="Type something..."
      />
      <div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear History</button>
      </div>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `T` | (required) | The initial state value. This also becomes the first entry in the history. |

### Return Value

Returns an object:

| Property | Type | Description |
|----------|------|-------------|
| `state` | `T` | The current state value. |
| `set` | `(value: T) => void` | Sets a new value, pushing it onto the history. Any forward (redo) history is discarded. |
| `undo` | `() => void` | Moves back one step in history. No-op if already at the beginning. |
| `redo` | `() => void` | Moves forward one step in history. No-op if already at the end. |
| `clear` | `() => void` | Resets history to only the initial value and restores state to it. |
| `canUndo` | `boolean` | Whether there is a previous state to undo to. |
| `canRedo` | `boolean` | Whether there is a next state to redo to. |

## Notes

- History is stored in a `useRef`, so changes to the history array do not cause additional re-renders.
- When `set` is called after an undo, the forward history (redo stack) is discarded, similar to how text editors behave.
- The `canUndo` and `canRedo` booleans are derived on each render and are useful for disabling undo/redo buttons.
- Be mindful of memory usage if storing large objects in state, as the entire history is kept in memory.

## Related Hooks

- [useToggle](./use-toggle.md) - For simple boolean state without history.
- [useDefault](./use-default.md) - For state with a fallback default value.
