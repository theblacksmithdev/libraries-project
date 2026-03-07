---
sidebar_label: useScript
title: useScript
description: Dynamically loads an external script tag and tracks its loading status.
---

# useScript

Dynamically loads an external script tag and tracks its loading status.

## Import

```tsx
import { useScript } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function GoogleMaps() {
  const status = useScript(
    'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY'
  );

  if (status === 'loading') return <p>Loading Google Maps...</p>;
  if (status === 'error') return <p>Failed to load Google Maps script.</p>;

  return <div id="map" style={{ width: '100%', height: 400 }} />;
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | `string` | - | The URL of the external script to load. |

### Return Value

| Type | Description |
|------|-------------|
| `'loading'` | The script is currently being loaded. |
| `'ready'` | The script has loaded successfully and is ready to use. |
| `'error'` | The script failed to load. |

The return type is `ScriptStatus`, which is a union of the three string literals above.

## Notes

- If a `<script>` tag with the same `src` already exists in the document, the hook immediately returns `'ready'` without appending a duplicate.
- The script is appended to `document.body` with `async = true`.
- SSR-safe: on the server (where `document` is `undefined`), the initial status is `'loading'`.
- Event listeners for `load` and `error` are cleaned up when the component unmounts, but the `<script>` element itself is **not** removed from the DOM.
- If you need to load multiple scripts, use one `useScript` call per script URL.

## Related Hooks

- [useFetch](./use-fetch.md) - For fetching data from an API endpoint rather than loading a script.
