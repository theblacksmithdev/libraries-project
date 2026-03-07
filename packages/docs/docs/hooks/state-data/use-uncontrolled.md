---
sidebar_label: useUncontrolled
title: useUncontrolled
description: Enables a component to work in both controlled and uncontrolled modes with a single API.
---

# useUncontrolled

Enables a component to work in both controlled and uncontrolled modes with a single API.

## Import

```tsx
import { useUncontrolled } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
interface RatingProps {
  value?: number;
  defaultValue: number;
  onChange?: (value: number) => void;
}

function Rating({ value, defaultValue, onChange }: RatingProps) {
  const [rating, setRating] = useUncontrolled({
    value,
    defaultValue,
    onChange,
  });

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          style={{ color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// Uncontrolled usage:
<Rating defaultValue={3} />

// Controlled usage:
<Rating value={rating} defaultValue={0} onChange={setRating} />
```

## API Reference

### Parameters

Accepts a single options object:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `T \| undefined` | `undefined` | The controlled value. When provided (`!== undefined`), the component is in controlled mode. |
| `defaultValue` | `T` | (required) | The initial value used in uncontrolled mode. |
| `onChange` | `(value: T) => void` | `undefined` | Callback fired when the value changes, in both controlled and uncontrolled modes. |

### Return Value

Returns a tuple `[currentValue, handleChange]`:

| Property | Type | Description |
|----------|------|-------------|
| `currentValue` | `T` | The current value. In controlled mode this is `value`; in uncontrolled mode this is the internal state. |
| `handleChange` | `(nextValue: T) => void` | Setter function. In uncontrolled mode, updates internal state and calls `onChange`. In controlled mode, only calls `onChange` (state is managed externally). |

## Notes

- The hook determines controlled vs. uncontrolled mode by checking `value !== undefined`. Passing `null` is considered controlled.
- In controlled mode, calling `handleChange` does **not** update internal state -- it only invokes `onChange`. The parent must update `value` for the change to take effect.
- In uncontrolled mode, calling `handleChange` updates the internal state **and** invokes `onChange` if provided.
- This pattern is commonly used when building reusable form components that need to support both controlled and uncontrolled usage.

## Related Hooks

- [useDefault](./use-default.md) - For state with a fallback default value.
- [useToggle](./use-toggle.md) - For simple boolean toggling.
