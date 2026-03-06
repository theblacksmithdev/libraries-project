import * as React from 'react'
import { type FieldPath, type FieldValues } from 'react-hook-form'
import { FileUpload } from '@forge-ui/react'
import { FieldWrapper } from '../shared'
import type { BaseFieldProps } from '../shared'

export interface FormFileUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  accept?: string
  multiple?: boolean
  maxSize?: number
}

export function FormFileUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, disabled, className, accept, multiple, maxSize }: FormFileUploadProps<TFieldValues, TName>) {
  return (
    <FieldWrapper<TFieldValues, TName>
      name={name}
      label={label}
      description={description}
      className={className}
      render={({ field }) => (
        <FileUpload
          value={field.value}
          onChange={field.onChange}
          accept={accept}
          multiple={multiple}
          maxSize={maxSize}
          disabled={disabled}
        />
      )}
    />
  )
}
