---
name: new-component
description: Scaffold a new UI component in @flatui/react. Usage: /new-component ComponentName
---

Create a new component named `$ARGUMENTS` in the `@flatui/react` package.

## Steps

1. **Create directory**: `packages/flatui/src/components/ui/<kebab-case-name>/`

2. **Create component file** (`<kebab-case-name>.tsx`):
   - Use `React.forwardRef` pattern
   - Accept `className` prop and merge with `cn()` from `@/lib/utils`
   - Use `class-variance-authority` (cva) if the component has variants
   - Export the component and its props interface
   - Follow existing component patterns in the codebase

3. **Create test file** (`<kebab-case-name>.spec.tsx`):
   - Import from `@testing-library/react` and `@testing-library/user-event`
   - Test rendering, props, accessibility (role, aria attributes)
   - Use `vi` globals (no vitest import needed)
   - Follow existing test patterns

4. **Create story file** (`<kebab-case-name>.stories.tsx`):
   - Import type `Meta` and `StoryObj` from `@storybook/react`
   - Create default export with `meta` config
   - Create named story exports (Default, variants, states)
   - Use `args` for interactive controls

5. **Create index file** (`index.ts`):
   - Re-export everything from the component file

6. **Add export to package index**: Add export line to `packages/flatui/src/index.ts`

## Naming Convention

- Directory: `kebab-case` (e.g., `color-picker`)
- Component: `PascalCase` (e.g., `ColorPicker`)
- Props: `PascalCase` + `Props` suffix (e.g., `ColorPickerProps`)
- Test: `<kebab-case>.spec.tsx`
- Story: `<kebab-case>.stories.tsx`

## Template

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface $ARGUMENTSProps extends React.HTMLAttributes<HTMLDivElement> {
  // props here
}

const $ARGUMENTS = React.forwardRef<HTMLDivElement, $ARGUMENTSProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props} />
    )
  }
)
$ARGUMENTS.displayName = '$ARGUMENTS'

export { $ARGUMENTS }
```
