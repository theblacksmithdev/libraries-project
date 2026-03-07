---
sidebar_label: useWebSocket
title: useWebSocket
description: Manages a WebSocket connection with automatic reconnection support.
---

# useWebSocket

Manages a WebSocket connection with automatic reconnection support.

## Import

```tsx
import { useWebSocket } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ChatRoom({ roomId }: { roomId: string }) {
  const { readyState, lastMessage, send, disconnect } = useWebSocket(
    `wss://chat.example.com/rooms/${roomId}`,
    {
      reconnect: true,
      reconnectAttempts: 10,
      reconnectInterval: 2000,
      onMessage: (event) => {
        console.log('New message:', event.data);
      },
    }
  );

  const handleSend = () => {
    send(JSON.stringify({ type: 'message', text: 'Hello!' }));
  };

  return (
    <div>
      <p>Status: {readyState}</p>
      <p>Last message: {lastMessage?.data}</p>
      <button onClick={handleSend} disabled={readyState !== 'open'}>
        Send
      </button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `string \| null` | - | The WebSocket server URL. Pass `null` to prevent connecting. |
| `options` | `UseWebSocketOptions` | `{}` | Configuration options for the WebSocket connection. |

### UseWebSocketOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `onOpen` | `(event: Event) => void` | - | Callback fired when the connection is established. |
| `onMessage` | `(event: MessageEvent) => void` | - | Callback fired when a message is received. |
| `onClose` | `(event: CloseEvent) => void` | - | Callback fired when the connection is closed. |
| `onError` | `(event: Event) => void` | - | Callback fired when a connection error occurs. |
| `reconnect` | `boolean` | `false` | Whether to automatically reconnect on close. |
| `reconnectInterval` | `number` | `3000` | Delay in milliseconds between reconnection attempts. |
| `reconnectAttempts` | `number` | `5` | Maximum number of reconnection attempts. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `readyState` | `'connecting' \| 'open' \| 'closing' \| 'closed'` | The current connection state. |
| `lastMessage` | `MessageEvent \| null` | The most recently received message event. |
| `send` | `(data: string \| ArrayBufferLike \| Blob) => void` | Sends data through the WebSocket connection. |
| `disconnect` | `() => void` | Closes the WebSocket connection. |

## Notes

- The connection is established automatically when the component mounts (unless `url` is `null`).
- Passing `null` as the URL prevents any connection from being made, which is useful for conditional connections.
- The WebSocket is automatically closed on component unmount.
- Reconnection attempts are reset to zero after a successful connection.
- The `reconnectInterval` is a fixed delay (not exponential backoff). For exponential backoff, use `useRetry` with a custom WebSocket wrapper.
- Callback refs are used internally so that updating `onMessage`, `onOpen`, etc. does not cause the WebSocket to reconnect.

## Related Hooks

- [useSSE](./use-sse.md) - For server-sent events (one-way server-to-client streaming).
- [useRetry](./use-retry.md) - For retrying failed async operations with exponential backoff.
