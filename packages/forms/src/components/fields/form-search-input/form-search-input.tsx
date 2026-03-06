import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { SearchInput } from '@forge-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  loading?: boolean
}

export function FormSearchInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, placeholder, disabled, className, loading }: FormSearchInputProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <SearchInput
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          loading={loading}
          onClear={() => field.onChange('')}
        />
      )}
    />
  )
}
