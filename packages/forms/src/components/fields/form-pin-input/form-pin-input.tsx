import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { PinInput } from '@forge-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormPinInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  length?: number
  mask?: boolean
  type?: 'alphanumeric' | 'numeric'
}

export function FormPinInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, length, mask, type }: FormPinInputProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <PinInput
          value={field.value}
          onChange={field.onChange}
          length={length}
          mask={mask}
          type={type}
          disabled={disabled}
        />
      )}
    />
  )
}
