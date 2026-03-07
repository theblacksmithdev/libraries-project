---
sidebar_label: usePrevious
title: usePrevious
description: Returns the value from the previous render cycle.
---

# usePrevious

Returns the value from the previous render cycle.

## Import

```tsx
import { usePrevious } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
import { useState } from 'react';
import { usePrevious } from '@blacksmith-ui/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount ?? 'N/A'}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `T` | - | The value to track. Can be any type. |

### Return Value

| Type | Description |
|------|-------------|
| `T \| undefined` | The value from the previous render. Returns `undefined` on the first render since there is no previous value. |

## Notes

- On the initial render, the hook returns `undefined` because no previous value exists yet.
- The previous value is updated inside a `useEffect`, which runs after render. This means during the current render you always see the value from the prior render.
- The value is tracked by reference, so for objects and arrays it stores the reference, not a deep copy.
- Useful for comparing the current value against the previous one to detect changes (e.g., triggering animations or logging transitions).

## Related Hooks

- [`useLatest`](./use-latest.md) - Always returns a ref pointing to the latest value (current, not previous).
- [`useSyncedRef`](./use-synced-ref.md) - Keeps a ref synchronized with the latest value.
