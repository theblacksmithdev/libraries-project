---
sidebar_label: usePageLeave
title: usePageLeave
description: Fires a callback when the user's cursor leaves the page viewport (moves above the top of the document).
---

# usePageLeave

Fires a callback when the user's cursor leaves the page viewport (moves above the top of the document).

## Import

```tsx
import { usePageLeave } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);

  usePageLeave(() => {
    setShowPopup(true);
  });

  return (
    <>
      {showPopup && (
        <div className="popup">
          <p>Wait! Don't leave yet -- here's a special offer.</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </>
  );
}
```

## API Reference

### Parameters

| Parameter | Type         | Default | Description                                             |
|-----------|--------------|---------|---------------------------------------------------------|
| `handler` | `() => void` | -       | Callback invoked when the cursor leaves the page.       |

### Return Value

This hook does not return a value (`void`).

## Notes

- The hook listens for the `mouseleave` event on the `document` and only fires the callback when `event.clientY <= 0` (i.e. the cursor exits from the top of the viewport). This is a common pattern for "exit intent" detection.
- The handler is stored in a ref, so you do not need to memoize it -- the hook always calls the latest version without re-subscribing the event listener.
- This hook only detects mouse-based exits. It will not fire on touch devices or when the user switches tabs via keyboard.

## Related Hooks

- [`usePageVisibility`](./use-page-visibility.md) -- detect when the user switches away from the tab entirely.
