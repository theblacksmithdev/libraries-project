import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { Select } from '@forge-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface SelectOptionDef {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroupDef {
  label: string
  options: SelectOptionDef[]
}

export type SelectOptionOrGroup = SelectOptionDef | SelectGroupDef

// The @forge-ui/react simple Select accepts `options` at runtime but its type
// declarations may not include the simple variant. Cast to bridge the gap.
const SimpleSelect = Select as React.ComponentType<{
  options: SelectOptionOrGroup[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}>

export interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  placeholder?: string
  options: SelectOptionOrGroup[]
}

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, placeholder, disabled, className, options }: FormSelectProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <SimpleSelect
          options={options}
          value={field.value}
          onValueChange={field.onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    />
  )
}
