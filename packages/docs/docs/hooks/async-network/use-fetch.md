---
sidebar_label: useFetch
title: useFetch
description: Declarative hook for fetching data from a URL with automatic abort handling.
---

# useFetch

Declarative hook for fetching data from a URL with automatic abort handling.

## Import

```tsx
import { useFetch } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading, refetch } = useFetch<User>(
    `/api/users/${userId}`,
    { enabled: !!userId }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | `string` | - | The URL to fetch data from. |
| `options` | `UseFetchOptions` | `{}` | Fetch options extending the native `RequestInit` interface. |

### UseFetchOptions

Extends the native [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options) interface with the following additional property:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | `true` | When `false`, the fetch request is not executed. Useful for conditional fetching. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `data` | `T \| null` | The parsed JSON response data, or `null` if not yet loaded or on error. |
| `error` | `Error \| null` | The error object if the request failed, or `null` on success. |
| `isLoading` | `boolean` | `true` while the request is in flight. |
| `refetch` | `() => Promise<void>` | Function to manually re-trigger the fetch request. |

## Notes

- The hook automatically aborts in-flight requests when the `url` changes or the component unmounts, preventing state updates on unmounted components.
- Calling `refetch` also aborts any currently in-flight request before starting a new one.
- Non-OK HTTP responses (status outside 2xx) throw an error with the format `"HTTP {status}: {statusText}"`.
- The response body is always parsed as JSON via `response.json()`. For non-JSON responses, use `useAsync` with a custom fetch function instead.
- `AbortError` exceptions are silently ignored and will not update the error state.
- The generic type parameter `T` controls the type of `data` (defaults to `unknown`).

## Related Hooks

- [useAsync](./use-async.md) - For wrapping arbitrary async functions with loading/error state.
- [useAbortController](./use-abort-controller.md) - For manual abort control over fetch requests.
- [useRetry](./use-retry.md) - For retrying failed async operations with backoff.
