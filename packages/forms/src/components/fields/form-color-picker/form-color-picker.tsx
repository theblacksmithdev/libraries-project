import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { ColorPicker } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormColorPickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  swatches?: string[]
}

export function FormColorPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, placeholder, swatches }: FormColorPickerProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <ColorPicker
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          swatches={swatches}
          disabled={disabled}
        />
      )}
    />
  )
}
