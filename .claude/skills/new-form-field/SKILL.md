---
name: new-form-field
description: Scaffold a new form field component in @blacksmith-ui/forms. Usage: /new-form-field FieldName
---

Create a new form field named `Form$ARGUMENTS` in the `@blacksmith-ui/forms` package.

## Steps

1. **Create directory**: `packages/forms/src/components/fields/form-<kebab-case-name>/`

2. **Create field component** (`form-<kebab-case-name>.tsx`):
   - Import `FieldWrapper` and `BaseFieldProps` from `../shared`
   - Import the underlying UI component from `@blacksmith-ui/react`
   - Define `Form$ARGUMENTSProps` extending `BaseFieldProps` with field-specific props
   - Use `FieldWrapper` with a `render` prop that passes `field` to the UI component

3. **Create test file** (`form-<kebab-case-name>.spec.tsx`):
   - Test within a `<Form schema={testSchema}>` wrapper
   - Test label rendering, value changes, validation errors
   - Use `waitFor()` for form submission assertions

4. **Create story file** (`form-<kebab-case-name>.stories.tsx`):
   - Wrap in `<Form>` with a Zod schema
   - Show default, disabled, with-error states

5. **Create index file** (`index.ts`):
   - Re-export the field component and its props

6. **Add export to package index**: Add to `packages/forms/src/index.ts`

## Template

```tsx
import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { ComponentName } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface Form$ARGUMENTSProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
}

export function Form$ARGUMENTS<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, placeholder, disabled, className }: Form$ARGUMENTSProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <ComponentName {...field} placeholder={placeholder} disabled={disabled} />
      )}
    />
  )
}
```

## Key Pattern

`BaseFieldProps` provides: `name`, `label`, `description`, `className`, `disabled`
`FieldWrapper` renders: `FormItem > FormLabel > FormControl > FormMessage`
The `render` prop receives the react-hook-form `field` object to spread onto the UI component.
