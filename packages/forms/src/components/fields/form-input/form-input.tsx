import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { Input } from '@flatui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, placeholder, disabled, className, type = 'text' }: FormInputProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <Input {...field} type={type} placeholder={placeholder} disabled={disabled} />
      )}
    />
  )
}
