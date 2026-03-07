---
sidebar_label: useToggle
title: useToggle
description: Manages a boolean state with convenience methods to toggle, set on, or set off.
---

# useToggle

Manages a boolean state with convenience methods to toggle, set on, or set off.

## Import

```tsx
import { useToggle } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function FeatureFlag() {
  const [isEnabled, { toggle, on, off }] = useToggle(false);

  return (
    <div>
      <p>Feature is {isEnabled ? 'enabled' : 'disabled'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={on}>Enable</button>
      <button onClick={off}>Disable</button>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `initialValue` | `boolean` | `false` | The initial boolean value. |

### Return Value

Returns a tuple `[value, actions]`:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `boolean` | The current boolean state. |
| `actions.toggle` | `() => void` | Toggles the value to its opposite. |
| `actions.on` | `() => void` | Sets the value to `true`. |
| `actions.off` | `() => void` | Sets the value to `false`. |

## Notes

- All action functions (`toggle`, `on`, `off`) are memoized with `useCallback` and have stable references across re-renders.
- The return type is `readonly [boolean, { toggle, on, off }]` (a const tuple), so you can destructure with any variable names.

## Related Hooks

- [useDisclosure](./use-disclosure.md) - Similar boolean state management with named `isOpen` property and `open`/`close` semantics, suited for modals and drawers.
