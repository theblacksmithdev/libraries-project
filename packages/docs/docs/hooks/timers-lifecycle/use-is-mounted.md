---
sidebar_label: useIsMounted
title: useIsMounted
description: Returns a stable callback that reports whether the component is currently mounted.
---

# useIsMounted

Returns a stable callback that reports whether the component is currently mounted.

## Import

```tsx
import { useIsMounted } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function AsyncLoader({ url }: { url: string }) {
  const isMounted = useIsMounted();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (isMounted()) {
          setData(json);
        }
      });
  }, [url, isMounted]);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

### Guarding async callbacks

```tsx
function SubmitForm() {
  const isMounted = useIsMounted();
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = async (values: FormData) => {
    await submitToApi(values);
    if (isMounted()) {
      setStatus('success');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type           | Description                                                                          |
|----------|----------------|--------------------------------------------------------------------------------------|
| (return) | `() => boolean` | A stable callback (memoized via `useCallback`) that returns `true` if the component is mounted, `false` otherwise. |

## Notes

- The returned function reference is stable across renders (wrapped in `useCallback` with no dependencies), so it is safe to include in other hooks' dependency arrays.
- The mounted state is tracked via a ref that is set to `true` on mount and `false` on the cleanup of the effect (unmount).
- This is primarily useful for guarding state updates in async operations (fetches, timers) that may resolve after the component has unmounted, avoiding the React "state update on unmounted component" warning.

## Related Hooks

- [`useIsFirstRender`](./use-is-first-render.md) -- check if the current render is the first render
- [`useUpdateEffect`](./use-update-effect.md) -- skip effects on the initial render
