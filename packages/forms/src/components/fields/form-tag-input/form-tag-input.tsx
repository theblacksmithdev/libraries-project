import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { TagInput } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormTagInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  max?: number
}

export function FormTagInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, placeholder, max }: FormTagInputProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <TagInput
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          max={max}
          disabled={disabled}
        />
      )}
    />
  )
}
