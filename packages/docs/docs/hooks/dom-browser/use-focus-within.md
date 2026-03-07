---
sidebar_label: useFocusWithin
title: useFocusWithin
description: Tracks whether focus is currently within a container element or any of its descendants.
---

# useFocusWithin

Tracks whether focus is currently within a container element or any of its descendants.

## Import

```tsx
import { useFocusWithin } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function FormSection() {
  const { ref, isFocusWithin } = useFocusWithin<HTMLFieldSetElement>();

  return (
    <fieldset
      ref={ref}
      style={{
        borderColor: isFocusWithin ? '#3b82f6' : '#d1d5db',
        transition: 'border-color 200ms',
      }}
    >
      <legend>Shipping Address</legend>
      <input placeholder="Street" />
      <input placeholder="City" />
      <input placeholder="Zip" />
    </fieldset>
  );
}
```

## API Reference

### Parameters

This hook takes no parameters. The generic type parameter `T` must extend `HTMLElement`.

### Return Value

| Property        | Type                         | Description                                             |
| --------------- | ---------------------------- | ------------------------------------------------------- |
| `ref`           | `(node: T \| null) => void` | A callback ref to attach to the container element.      |
| `isFocusWithin` | `boolean`                    | `true` when focus is inside the container or its descendants, `false` otherwise. |

## Notes

- Uses a **callback ref** pattern. The ref manages `focusin` and `focusout` event listeners internally.
- On `focusout`, the hook checks `relatedTarget` to determine whether focus moved to another element within the container. If focus stays inside, `isFocusWithin` remains `true`.
- When the ref is reassigned to a different element, listeners are cleaned up on the previous element automatically.
- Useful for styling form groups, toolbars, or any compound component that should visually respond to focus.

## Related Hooks

- [useFocusTrap](./use-focus-trap.md) -- trap keyboard focus within a container
- [useClickOutside](./use-click-outside.md) -- detect clicks outside an element
- [useHover](./use-hover.md) -- track mouse hover state
