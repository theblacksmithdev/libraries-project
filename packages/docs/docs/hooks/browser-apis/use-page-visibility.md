---
sidebar_label: usePageVisibility
title: usePageVisibility
description: Tracks whether the current page/tab is visible to the user.
---

# usePageVisibility

Tracks whether the current page/tab is visible to the user.

## Import

```tsx
import { usePageVisibility } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function VideoPlayer({ src }: { src: string }) {
  const isVisible = usePageVisibility();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  return <video ref={videoRef} src={src} />;
}
```

```tsx
function PollingDashboard() {
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return <Dashboard />;
}
```

## API Reference

### Parameters

This hook takes no parameters.

### Return Value

| Type      | Description                                                        |
|-----------|--------------------------------------------------------------------|
| `boolean` | `true` if the page is visible, `false` if it is hidden (e.g. tab is in the background). |

## Notes

- Uses the `document.hidden` property and the `visibilitychange` event from the Page Visibility API.
- On the server (`typeof document === 'undefined'`), defaults to `true`.
- Common use cases include pausing videos, stopping polling, or reducing animation work when the user switches away from the tab.

## Related Hooks

- [`usePageLeave`](./use-page-leave.md) -- detect when the user's cursor leaves the page viewport.
- [`useOnline`](./use-online.md) -- track the browser's network connectivity status.
