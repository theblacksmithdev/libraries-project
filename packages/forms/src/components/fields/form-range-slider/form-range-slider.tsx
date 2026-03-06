import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { RangeSlider } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormRangeSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  min?: number
  max?: number
  step?: number
  showLabels?: boolean
  formatLabel?: (value: number) => string
}

export function FormRangeSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  disabled,
  className,
  min,
  max,
  step,
  showLabels,
  formatLabel,
}: FormRangeSliderProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <RangeSlider
          value={field.value}
          onValueChange={field.onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          showLabels={showLabels}
          formatLabel={formatLabel}
        />
      )}
    />
  )
}
