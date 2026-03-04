import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { RadioGroup, RadioGroupItem, Label } from '@flatui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  options: RadioOption[]
  orientation?: 'vertical' | 'horizontal'
}

export function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  disabled,
  className,
  options,
  orientation = 'vertical',
}: FormRadioGroupProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <RadioGroup
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
          className={orientation === 'horizontal' ? 'flex gap-4' : undefined}
        >
          {options.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} disabled={opt.disabled} />
              <Label>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  )
}
