---
sidebar_label: useIsClient
title: useIsClient
description: Returns whether the component has mounted on the client, useful for SSR hydration guards.
---

# useIsClient

Returns whether the component has mounted on the client, useful for SSR hydration guards.

## Import

```tsx
import { useIsClient } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ClientOnlyComponent() {
  const isClient = useIsClient();

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return <div>Window width: {window.innerWidth}px</div>;
}
```

```tsx
function PortalWrapper({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  if (!isClient) return null;

  return createPortal(children, document.body);
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Type      | Description                                                             |
|-----------|-------------------------------------------------------------------------|
| `boolean` | `false` during SSR and the initial server render, `true` after the component mounts on the client. |

## Notes

- The hook starts as `false` and switches to `true` inside a `useEffect`, which only runs in the browser after hydration.
- Use this to guard code that accesses browser-only APIs (`window`, `document`, `navigator`, `localStorage`, etc.) in SSR/SSG frameworks like Next.js.
- Unlike checking `typeof window !== 'undefined'`, this hook triggers a re-render after mount, ensuring the component updates once it is in the browser.
- This is intentionally a simple hook -- it will cause one extra render on the client. For performance-critical paths, consider using `typeof window !== 'undefined'` checks instead if you do not need a re-render.

## Related Hooks

- [`useOnline`](./use-online.md) -- uses a similar SSR guard internally for `navigator.onLine`.
- [`useMediaQuery`](./use-media-query.md) -- uses a similar SSR guard internally for `window.matchMedia`.
