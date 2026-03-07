---
sidebar_label: useAsync
title: useAsync
description: Wraps an async function with reactive state tracking for loading, success, and error states.
---

# useAsync

Wraps an async function with reactive state tracking for loading, success, and error states.

## Import

```tsx
import { useAsync } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function CreatePostForm() {
  const { execute, isLoading, isSuccess, isError, error, reset } = useAsync(
    async (title: string, body: string) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      return res.json();
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await execute(
        formData.get('title') as string,
        formData.get('body') as string
      );
    } catch {
      // error is captured in state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      <textarea name="body" />
      <button disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
      {isError && <p>Error: {error?.message}</p>}
      {isSuccess && <p>Post created!</p>}
    </form>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `asyncFn` | `(...args: Args) => Promise<T>` | - | The async function to wrap. Accepts any number of arguments and returns a Promise. |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `status` | `'idle' \| 'pending' \| 'success' \| 'error'` | The current status of the async operation. |
| `data` | `T \| null` | The resolved data from the async function, or `null` if not yet resolved or on error. |
| `error` | `Error \| null` | The error thrown by the async function, or `null` on success. |
| `isLoading` | `boolean` | `true` when `status` is `'pending'`. |
| `isSuccess` | `boolean` | `true` when `status` is `'success'`. |
| `isError` | `boolean` | `true` when `status` is `'error'`. |
| `execute` | `(...args: Args) => Promise<T>` | Invokes the wrapped async function with the given arguments. |
| `reset` | `() => void` | Resets all state back to `idle` with `null` data and error. |

## Notes

- Unlike `useFetch`, this hook does not automatically execute. You must call `execute()` to trigger the async function.
- The `execute` function re-throws the caught error after updating state, so you can use `try/catch` at the call site if needed.
- Each call to `execute` resets the state to `pending` before running. There is no built-in deduplication or cancellation.
- The generic type parameters `T` (return type) and `Args` (argument types) are inferred from the provided `asyncFn`.

## Related Hooks

- [useFetch](./use-fetch.md) - For declarative GET requests that auto-execute on mount.
- [useRetry](./use-retry.md) - For retrying failed async operations with configurable backoff.
