---
sidebar_label: useSteps
title: useSteps
description: Manages step-based navigation state for wizards, multi-step forms, and stepper components.
---

# useSteps

Manages step-based navigation state for wizards, multi-step forms, and stepper components.

## Import

```tsx
import { useSteps } from '@blacksmith-ui/hooks';
```

## Usage

```tsx
function Wizard() {
  const { currentStep, isFirst, isLast, next, prev, goTo, reset } = useSteps(4);

  const steps = ['Account', 'Profile', 'Preferences', 'Review'];

  return (
    <div>
      <nav>
        {steps.map((label, i) => (
          <button
            key={label}
            onClick={() => goTo(i)}
            style={{ fontWeight: i === currentStep ? 'bold' : 'normal' }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div>Step {currentStep + 1}: {steps[currentStep]}</div>

      <div>
        <button onClick={prev} disabled={isFirst}>Back</button>
        {isLast ? (
          <button onClick={reset}>Start Over</button>
        ) : (
          <button onClick={next}>Next</button>
        )}
      </div>
    </div>
  );
}
```

## API Reference

### Parameters

| Parameter     | Type     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `totalSteps`  | `number` | --      | Total number of steps. **Required.**             |
| `initialStep` | `number` | `0`     | Zero-based index of the step to start on.        |

### Return Value

| Property      | Type                    | Description                                                              |
| ------------- | ----------------------- | ------------------------------------------------------------------------ |
| `currentStep` | `number`                | Zero-based index of the active step.                                      |
| `isFirst`     | `boolean`               | `true` when `currentStep === 0`.                                          |
| `isLast`      | `boolean`               | `true` when `currentStep === totalSteps - 1`.                             |
| `next`        | `() => void`            | Advances to the next step. Clamps at the last step.                       |
| `prev`        | `() => void`            | Goes back to the previous step. Clamps at `0`.                            |
| `goTo`        | `(step: number) => void`| Jumps to a specific step. The value is clamped to `[0, totalSteps - 1]`.  |
| `reset`       | `() => void`            | Returns to `initialStep`.                                                 |

## Notes

- All step indices are **zero-based**. A `totalSteps` of 4 gives valid indices `0`, `1`, `2`, `3`.
- `next`, `prev`, and `goTo` all clamp the value to the valid range, so you never get an out-of-bounds step.
- `next`, `prev`, `goTo`, and `reset` are stable callbacks (wrapped in `useCallback`) and safe to use in dependency arrays or pass as props.
- `reset` returns to `initialStep`, not necessarily `0`. If you passed `initialStep={2}`, `reset` will go back to step `2`.

## Related Hooks

- [useCollapse](./use-collapse.md) -- for toggling visibility of sections, useful in accordion-style step indicators.
