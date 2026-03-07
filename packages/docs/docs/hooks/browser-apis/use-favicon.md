---
sidebar_label: useFavicon
title: useFavicon
description: Dynamically sets the page favicon to a given URL.
---

# useFavicon

Dynamically sets the page favicon to a given URL.

## Import

```tsx
import { useFavicon } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function App() {
  const isOnline = useOnline();

  useFavicon(isOnline ? '/favicon-online.ico' : '/favicon-offline.ico');

  return <MainContent />;
}
```

```tsx
function NotificationBadge({ hasNotifications }: { hasNotifications: boolean }) {
  useFavicon(hasNotifications ? '/favicon-alert.ico' : '/favicon.ico');

  return <NotificationList />;
}
```

## API Reference

### Parameters

| Parameter | Type     | Default | Description                                         |
|-----------|----------|---------|-----------------------------------------------------|
| `href`    | `string` | -       | The URL of the favicon image to set.                |

### Return Value

This hook does not return a value (`void`).

## Notes

- The hook looks for an existing `<link rel*="icon">` element in the document head. If one exists, it updates its `href`. If none exists, it creates a new `<link>` element and appends it to `<head>`.
- The link element's `type` is set to `image/x-icon` and `rel` is set to `shortcut icon`.
- The favicon updates whenever the `href` parameter changes.
- This hook only runs in the browser -- ensure you are not calling it during server-side rendering without a guard.

## Related Hooks

- [`useOnline`](./use-online.md) -- combine with `useFavicon` to show different favicons based on network status.
- [`usePageVisibility`](./use-page-visibility.md) -- combine to change the favicon when the tab is backgrounded.
