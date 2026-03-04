import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { DatePicker } from '@flatui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  dateFormat?: string
}

export function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, placeholder, disabled, className, dateFormat }: FormDatePickerProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <DatePicker
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          disabled={disabled}
          dateFormat={dateFormat}
        />
      )}
    />
  )
}
