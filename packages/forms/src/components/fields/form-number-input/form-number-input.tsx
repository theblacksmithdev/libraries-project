import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { NumberInput } from '@flatui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export function FormNumberInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, min, max, step, placeholder }: FormNumberInputProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <NumberInput
          value={field.value}
          onChange={field.onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    />
  )
}
