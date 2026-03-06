import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { Slider } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  min?: number
  max?: number
  step?: number
}

export function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, min, max, step }: FormSliderProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <Slider
          value={[field.value]}
          onValueChange={(v) => field.onChange(v[0])}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      )}
    />
  )
}
