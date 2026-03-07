---
sidebar_label: useOnline
title: useOnline
description: Tracks the browser's online/offline network status.
---

# useOnline

Tracks the browser's online/offline network status.

## Import

```tsx
import { useOnline } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function NetworkStatus() {
  const isOnline = useOnline();

  return (
    <div>
      <span
        style={{
          display: 'inline-block',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: isOnline ? 'green' : 'red',
        }}
      />
      {isOnline ? ' Online' : ' Offline'}
    </div>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Type      | Description                                                  |
|-----------|--------------------------------------------------------------|
| `boolean` | `true` if the browser reports being online, `false` otherwise. |

## Notes

- Initializes from `navigator.onLine` on mount. On the server (`typeof navigator === 'undefined'`), defaults to `true`.
- Listens to the `online` and `offline` events on the `window` object and updates reactively.
- Note that `navigator.onLine` only indicates whether the browser can reach the network -- it does not guarantee internet connectivity. A `true` value means the device is connected to a network, but requests may still fail.

## Related Hooks

- [`useIsClient`](./use-is-client.md) -- check if running in a browser environment.
- [`usePageVisibility`](./use-page-visibility.md) -- track whether the page is currently visible.
