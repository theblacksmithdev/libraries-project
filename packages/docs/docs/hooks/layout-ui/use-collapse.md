---
sidebar_label: useCollapse
title: useCollapse
description: Manages expand/collapse state and provides prop getters for accessible collapsible sections.
---

# useCollapse

Manages expand/collapse state and provides prop getters for accessible collapsible sections.

## Import

```tsx
import { useCollapse } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const { isOpen, getToggleProps, getCollapseProps } = useCollapse();

  return (
    <div>
      <button {...getToggleProps()}>
        {title} {isOpen ? '−' : '+'}
      </button>
      <div {...getCollapseProps()}>
        {children}
      </div>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter     | Type      | Default | Description                                          |
| ------------- | --------- | ------- | ---------------------------------------------------- |
| `defaultOpen` | `boolean` | `false` | Whether the collapsible section starts in the open state. |

### Return Value

| Property           | Type                        | Description                                                                                           |
| ------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `isOpen`           | `boolean`                   | Current open/closed state.                                                                             |
| `toggle`           | `() => void`                | Toggles between open and closed.                                                                       |
| `open`             | `() => void`                | Sets state to open.                                                                                    |
| `close`            | `() => void`                | Sets state to closed.                                                                                  |
| `getCollapseProps` | `() => CollapseProps`       | Returns props to spread onto the collapsible content element (see below).                               |
| `getToggleProps`   | `() => ToggleProps`         | Returns props to spread onto the trigger/button element (see below).                                    |

#### `getCollapseProps()` return shape

| Property      | Type                                   | Description                                    |
| ------------- | -------------------------------------- | ---------------------------------------------- |
| `ref`         | `React.RefObject<HTMLElement \| null>` | Ref attached to the content element.            |
| `style`       | `React.CSSProperties`                 | `overflow: 'hidden'`, `height: 'auto' \| '0px'`, `transition: 'height 200ms ease'`. |
| `aria-hidden` | `boolean`                              | `true` when collapsed, `false` when open.       |

#### `getToggleProps()` return shape

| Property        | Type         | Description                                       |
| --------------- | ------------ | ------------------------------------------------- |
| `onClick`       | `() => void` | Calls `toggle` when clicked.                       |
| `aria-expanded` | `boolean`    | `true` when open, `false` when collapsed.          |

## Notes

- The collapse animation uses a CSS `height` transition (`200ms ease`). When open, `height` is set to `auto`, so the transition only animates on close (from computed height to `0px`). For smooth open animations, consider measuring content height with the ref and setting an explicit pixel value.
- The `aria-hidden` and `aria-expanded` attributes are handled automatically for accessibility.
- `toggle`, `open`, and `close` are stable callbacks (wrapped in `useCallback`) and safe to pass as props without causing unnecessary re-renders.

## Related Hooks

- [useSteps](./use-steps.md) -- for multi-step UI flows like wizards or accordions with sequential steps.
