---
sidebar_label: usePolling
title: usePolling
description: Repeatedly executes an async function at a fixed interval with start/stop controls.
---

# usePolling

Repeatedly executes an async function at a fixed interval with start/stop controls.

## Import

```tsx
import { usePolling } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ServerStatus() {
  const { data, error, isPolling, start, stop } = usePolling(
    async () => {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error('Health check failed');
      return res.json() as Promise<{ status: string; uptime: number }>;
    },
    5000, // poll every 5 seconds
    { enabled: true }
  );

  return (
    <div>
      <p>Status: {data?.status ?? 'Unknown'}</p>
      <p>Uptime: {data?.uptime}s</p>
      {error && <p>Error: {error.message}</p>}
      <button onClick={isPolling ? stop : start}>
        {isPolling ? 'Stop Polling' : 'Start Polling'}
      </button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fn` | `() => Promise<T>` | - | The async function to execute on each polling interval. |
| `interval` | `number` | - | The polling interval in milliseconds. |
| `options` | `{ enabled?: boolean }` | `{}` | Configuration options. |

### Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Whether polling starts immediately on mount. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `data` | `T \| null` | The most recent result from the polling function, or `null` if not yet resolved. |
| `error` | `Error \| null` | The error from the most recent failed poll, or `null` on success. Cleared on the next successful poll. |
| `isPolling` | `boolean` | `true` when polling is active. |
| `start` | `() => void` | Starts or resumes polling. |
| `stop` | `() => void` | Stops polling. The interval is cleared immediately. |

## Notes

- The function is executed immediately when polling starts (not after the first interval).
- A ref is used internally for the polling function, so updating the function reference does not restart the interval.
- Errors do not stop the polling cycle. The function will continue to be called at each interval even after a failure.
- Calling `stop` clears the interval immediately. Calling `start` again will re-execute the function and restart the interval.
- The interval timer is cleaned up on component unmount.

## Related Hooks

- [useFetch](./use-fetch.md) - For one-time declarative data fetching.
- [useSSE](./use-sse.md) - For real-time server-to-client streaming as an alternative to polling.
