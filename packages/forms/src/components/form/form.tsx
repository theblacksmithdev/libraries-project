import * as React from 'react'
import { useForm, type UseFormProps, type FieldValues, type SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyZodSchema = { _output?: any; _input?: any; _def?: any } | Record<string, any>

export interface FormProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema: AnyZodSchema
  onSubmit: SubmitHandler<TFieldValues>
  defaultValues?: UseFormProps<TFieldValues>['defaultValues']
  mode?: UseFormProps<TFieldValues>['mode']
  children: React.ReactNode
  className?: string
  mutation?: {
    error?: Error | null
    isPending?: boolean
  }
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  mode = 'onBlur',
  children,
  className,
  mutation,
  ...props
}: FormProps<TFieldValues>) {
  const form = useForm<TFieldValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
    mode,
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
        {...props}
      >
        {children}
        {mutation?.error && (
          <p className="text-sm font-medium text-destructive">
            {mutation.error.message}
          </p>
        )}
      </form>
    </FormProvider>
  )
}
