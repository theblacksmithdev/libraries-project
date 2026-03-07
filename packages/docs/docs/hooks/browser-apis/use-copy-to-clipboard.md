---
sidebar_label: useCopyToClipboard
title: useCopyToClipboard
description: Copies text to the clipboard using the Clipboard API and tracks the copy status.
---

# useCopyToClipboard

Copies text to the clipboard using the Clipboard API and tracks the copy status.

## Import

```tsx
import { useCopyToClipboard } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function CopyButton({ textToCopy }: { textToCopy: string }) {
  const { status, copy } = useCopyToClipboard();

  return (
    <button onClick={() => copy(textToCopy)}>
      {status === 'copied' ? 'Copied!' : status === 'error' ? 'Failed' : 'Copy'}
    </button>
  );
}
```

```tsx
// With a custom reset delay
function CopyWithLongFeedback({ text }: { text: string }) {
  const { status, copy } = useCopyToClipboard(5000);

  return (
    <button onClick={() => copy(text)}>
      {status === 'copied' ? 'Copied (resets in 5s)' : 'Copy'}
    </button>
  );
}
```

## API Reference

### Parameters

| Parameter    | Type     | Default | Description                                                        |
|--------------|----------|---------|--------------------------------------------------------------------|
| `resetDelay` | `number` | `2000`  | Time in milliseconds before the status resets back to `'idle'`.    |

### Return Value

| Property | Type                                       | Description                                       |
|----------|---------------------------------------------|---------------------------------------------------|
| `status` | `'idle' \| 'copied' \| 'error'`            | The current state of the copy operation.          |
| `copy`   | `(text: string) => Promise<void>`           | Function to copy the given text to the clipboard. |

## Notes

- Uses the async `navigator.clipboard.writeText` API. If the browser does not support it or the user denies clipboard permission, the status is set to `'error'`.
- After a successful or failed copy, the status automatically resets to `'idle'` after `resetDelay` milliseconds.
- The `copy` function is memoized with `useCallback` and only changes if `resetDelay` changes.
- This hook requires a secure context (HTTPS) in most browsers for the Clipboard API to work.

## Related Hooks

- [`useIsClient`](./use-is-client.md) -- check if running in a browser environment before attempting clipboard operations.
