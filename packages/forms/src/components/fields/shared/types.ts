import type { FieldPath, FieldValues } from 'react-hook-form'

export interface BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  description?: string
  className?: string
  disabled?: boolean
}
