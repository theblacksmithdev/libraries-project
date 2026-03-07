---
sidebar_label: useIsFirstRender
title: useIsFirstRender
description: Returns true on the first render and false on every subsequent render.
---

# useIsFirstRender

Returns `true` on the first render and `false` on every subsequent render.

## Import

```tsx
import { useIsFirstRender } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function AnimatedPanel({ children }: { children: React.ReactNode }) {
  const isFirstRender = useIsFirstRender();

  return (
    <div className={isFirstRender ? 'fade-in' : 'slide-in'}>
      {children}
    </div>
  );
}
```

### Conditional logging

```tsx
function Tracker({ value }: { value: string }) {
  const isFirstRender = useIsFirstRender();

  if (!isFirstRender) {
    console.log('Value changed to:', value);
  }

  return <span>{value}</span>;
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Property | Type      | Description                                                     |
|----------|-----------|-----------------------------------------------------------------|
| (return) | `boolean` | `true` on the first render, `false` on all subsequent renders.  |

## How It Works

The hook uses a `useRef` initialized to `true`. On the first call, it reads the ref value (`true`), immediately sets it to `false`, and returns `true`. On every subsequent render, the ref is already `false`, so it returns `false` without modifying anything.

## Notes

- This is a synchronous check that runs during render (not inside an effect). The value is available immediately when the component function body executes.
- Unlike `useUpdateEffect`, this hook does not run side effects -- it simply provides a boolean flag you can use in your render logic or conditionals.
- The ref persists across renders but resets if the component fully unmounts and remounts.

## Related Hooks

- [`useUpdateEffect`](./use-update-effect.md) -- `useEffect` that skips the first render (uses the same pattern internally)
- [`useIsMounted`](./use-is-mounted.md) -- check whether the component is currently mounted
