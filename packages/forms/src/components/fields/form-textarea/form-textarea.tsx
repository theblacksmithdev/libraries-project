import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { Textarea } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  rows?: number
}

export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, placeholder, disabled, className, rows }: FormTextareaProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <Textarea {...field} placeholder={placeholder} disabled={disabled} rows={rows} />
      )}
    />
  )
}
