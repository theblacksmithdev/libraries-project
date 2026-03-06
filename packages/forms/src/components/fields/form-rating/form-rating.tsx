import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { Rating } from '@blacksmith-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormRatingProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  max?: number
}

export function FormRating<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, max }: FormRatingProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <Rating
          value={field.value}
          onChange={field.onChange}
          max={max}
          disabled={disabled}
        />
      )}
    />
  )
}
