---
sidebar_label: useSSE
title: useSSE
description: Subscribes to a server-sent events (SSE) stream and tracks connection state.
---

# useSSE

Subscribes to a server-sent events (SSE) stream and tracks connection state.

## Import

```tsx
import { useSSE } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function LiveFeed() {
  const { lastEvent, isConnected, close } = useSSE(
    '/api/events/feed',
    {
      onMessage: (event) => {
        console.log('Event received:', event.data);
      },
    }
  );

  return (
    <div>
      <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
      {lastEvent && <p>Latest: {lastEvent.data}</p>}
      <button onClick={close}>Stop listening</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `string \| null` | - | The SSE endpoint URL. Pass `null` to prevent connecting. |
| `options` | `UseSSEOptions` | `{}` | Configuration options for the EventSource connection. |

### UseSSEOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `onMessage` | `(event: MessageEvent) => void` | - | Callback fired when a message event is received. |
| `onError` | `(event: Event) => void` | - | Callback fired when the connection encounters an error. |
| `withCredentials` | `boolean` | `false` | Whether to include credentials (cookies) with the request. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `lastEvent` | `MessageEvent \| null` | The most recently received message event, or `null` if none received yet. |
| `isConnected` | `boolean` | `true` when the EventSource connection is open. |
| `close` | `() => void` | Closes the EventSource connection. |

## Notes

- The connection is established automatically when the component mounts (unless `url` is `null`).
- Passing `null` as the URL prevents any connection from being made.
- The EventSource is automatically closed on component unmount.
- When an error occurs, `isConnected` is set to `false`. Note that the browser's native `EventSource` may automatically attempt to reconnect after an error.
- Set `withCredentials` to `true` when the SSE endpoint requires cookie-based authentication.
- Callback refs are used internally so that updating `onMessage` or `onError` does not cause the EventSource to reconnect.

## Related Hooks

- [useWebSocket](./use-web-socket.md) - For bidirectional real-time communication.
- [usePolling](./use-polling.md) - For periodic data fetching as an alternative to streaming.
