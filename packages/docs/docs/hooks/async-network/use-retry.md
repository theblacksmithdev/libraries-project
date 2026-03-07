---
sidebar_label: useRetry
title: useRetry
description: Retries a failed async function with configurable attempt limits and exponential backoff.
---

# useRetry

Retries a failed async function with configurable attempt limits and exponential backoff.

## Import

```tsx
import { useRetry } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function UploadFile() {
  const { execute, data, error, attempts, isRetrying, reset } = useRetry(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      return res.json() as Promise<{ url: string }>;
    },
    { maxAttempts: 5, delay: 1000, backoff: true }
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) execute(file);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {isRetrying && <p>Retrying... (attempt {attempts})</p>}
      {error && (
        <div>
          <p>Failed after {attempts} attempts: {error.message}</p>
          <button onClick={reset}>Reset</button>
        </div>
      )}
      {data && <p>Uploaded: {data.url}</p>}
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `fn` | `(...args: Args) => Promise<T>` | - | The async function to execute with retry logic. |
| `options` | `UseRetryOptions` | `{}` | Configuration for retry behavior. |

### UseRetryOptions

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `maxAttempts` | `number` | `3` | Maximum number of attempts before giving up. |
| `delay` | `number` | `1000` | Base delay in milliseconds between retry attempts. |
| `backoff` | `boolean` | `true` | When `true`, uses exponential backoff (`delay * 2^attempt`). When `false`, uses a fixed delay. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `execute` | `(...args: Args) => Promise<T \| undefined>` | Invokes the function with retry logic. Returns the result on success, or `undefined` if all attempts fail. |
| `data` | `T \| null` | The resolved data from a successful attempt, or `null`. |
| `error` | `Error \| null` | The error from the final failed attempt, or `null` if not yet failed or on success. |
| `attempts` | `number` | The current attempt number (starts at 0, incremented before each try). |
| `isRetrying` | `boolean` | `true` while the retry loop is active. |
| `reset` | `() => void` | Resets all state (`attempts`, `data`, `error`, `isRetrying`) back to initial values. |

## Notes

- With the default settings (`maxAttempts: 3`, `delay: 1000`, `backoff: true`), the delays between retries are 1s, 2s (total wait: ~3s before final failure).
- The exponential backoff formula is `delay * 2^attempt`, where `attempt` is zero-indexed. So for `delay: 1000`: attempt 0 = 1000ms, attempt 1 = 2000ms, attempt 2 = 4000ms.
- The error state is only set after the final attempt fails. Intermediate failures do not update the `error` state.
- A ref is used internally for the async function, so updating the function reference does not affect in-progress retry loops.
- `execute` does not throw on failure -- it returns `undefined` when all attempts are exhausted. Check the `error` state for failure details.

## Related Hooks

- [useAsync](./use-async.md) - For simple async operations without retry logic.
- [useFetch](./use-fetch.md) - For declarative data fetching (does not include retry).
- [usePolling](./use-polling.md) - For periodic re-execution at a fixed interval.
