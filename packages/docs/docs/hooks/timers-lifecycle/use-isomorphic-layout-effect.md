---
sidebar_label: useIsomorphicLayoutEffect
title: useIsomorphicLayoutEffect
description: An SSR-safe drop-in replacement that uses useLayoutEffect in the browser and useEffect on the server.
---

# useIsomorphicLayoutEffect

An SSR-safe drop-in replacement that uses `useLayoutEffect` in the browser and `useEffect` on the server.

## Import

```tsx
import { useIsomorphicLayoutEffect } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function MeasureElement() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div>
      <div ref={ref}>Content to measure</div>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Synchronous DOM mutation

```tsx
function ScrollToTop({ pathname }: { pathname: string }) {
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

## API Reference

### Parameters

Same signature as `React.useEffect` / `React.useLayoutEffect`:

| Parameter | Type              | Default     | Description                                                           |
|-----------|-------------------|-------------|-----------------------------------------------------------------------|
| `effect`  | `EffectCallback`  | -           | The effect function to run. May return a cleanup function.            |
| `deps`    | `DependencyList?` | `undefined` | Optional dependency array, same semantics as `useEffect`.             |

### Return Value

`void` -- this hook does not return anything.

## How It Works

```tsx
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
```

- **Browser** (`window` is defined): uses `useLayoutEffect`, which fires synchronously after DOM mutations but before the browser paints.
- **Server** (`window` is `undefined`): falls back to `useEffect`, avoiding the React SSR warning: _"useLayoutEffect does nothing on the server"_.

## Notes

- Use this hook anywhere you would normally reach for `useLayoutEffect` but need SSR compatibility (Next.js, Remix, etc.).
- The API is identical to `useEffect` and `useLayoutEffect` -- it is a direct assignment, not a wrapper.
- If you do not need synchronous DOM measurement/mutation and do not use SSR, plain `useEffect` is sufficient.

## Related Hooks

- [`useUpdateEffect`](./use-update-effect.md) -- `useEffect` that skips the initial render
- [`useIsMounted`](./use-is-mounted.md) -- check whether the component is mounted
