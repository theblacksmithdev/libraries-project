import React, { useState } from 'react'
import { z } from 'zod'
import { Button, Alert, AlertTitle, AlertDescription } from '@blacksmith-ui/react'
import { Form, FormInput } from '@blacksmith-ui/forms'
import { AuthLayout } from '../auth-layout'
import type { AuthLabels, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export interface ResetPasswordFormProps {
  /** Called when the form is submitted */
  onSubmit: (data: { password: string; code: string }) => void | Promise<void>
  /** The reset code/token (from URL params, etc.) */
  code: string
  /** Navigate back to login */
  onLoginClick?: () => void
  /** External error to display */
  error?: AuthError | null
  /** Whether the form is in a loading state */
  loading?: boolean
  /** Label overrides */
  labels?: Partial<AuthLabels>
  /** Additional className */
  className?: string
}

export function ResetPasswordForm({
  onSubmit,
  code,
  onLoginClick,
  error,
  loading = false,
  labels: labelOverrides,
  className,
}: ResetPasswordFormProps) {
  const labels = { ...defaultLabels, ...labelOverrides }
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(data: ResetPasswordData) {
    await onSubmit({ password: data.password, code })
    setSubmitted(true)
  }

  return (
    <AuthLayout
      title={labels.resetPasswordTitle}
      description={labels.resetPasswordDescription}
      className={className}
      footer={
        onLoginClick ? (
          <Button variant="link" size="sm" onClick={onLoginClick}>
            Back to sign in
          </Button>
        ) : undefined
      }
    >
      {submitted && !error ? (
        <Alert role="status">
          <AlertTitle>Password reset successful</AlertTitle>
          <AlertDescription>
            You can now sign in with your new password.
          </AlertDescription>
          {onLoginClick && (
            <Button variant="outline" className="mt-4" onClick={onLoginClick}>
              Go to sign in
            </Button>
          )}
        </Alert>
      ) : (
        <Form schema={resetPasswordSchema} onSubmit={handleSubmit} mode="onSubmit">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <FormInput
            name="password"
            label={labels.passwordLabel}
            placeholder="New password"
            type="password"
            disabled={loading}
          />

          <FormInput
            name="confirmPassword"
            label={labels.confirmPasswordLabel}
            placeholder={labels.confirmPasswordPlaceholder}
            type="password"
            disabled={loading}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Resetting…' : labels.resetPasswordButton}
          </Button>
        </Form>
      )}
    </AuthLayout>
  )
}
