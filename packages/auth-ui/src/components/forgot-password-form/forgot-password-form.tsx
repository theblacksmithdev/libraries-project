import React, { useState } from 'react'
import { z } from 'zod'
import { Button, Alert, AlertTitle, AlertDescription, Text } from '@forge-ui/react'
import { Form, FormInput } from '@forge-ui/forms'
import { AuthLayout } from '../auth-layout'
import type { AuthLabels, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

const forgotPasswordSchema = z.object({
  email: z.string().min(1).email(),
})

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>

export interface ForgotPasswordFormProps {
  /** Called when the form is submitted */
  onSubmit: (data: { email: string }) => void | Promise<void>
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

export function ForgotPasswordForm({
  onSubmit,
  onLoginClick,
  error,
  loading = false,
  labels: labelOverrides,
  className,
}: ForgotPasswordFormProps) {
  const labels = { ...defaultLabels, ...labelOverrides }
  const [submitted, setSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  async function handleSubmit(data: ForgotPasswordData) {
    setSubmittedEmail(data.email)
    await onSubmit(data)
    setSubmitted(true)
  }

  return (
    <AuthLayout
      title={labels.forgotPasswordTitle}
      description={labels.forgotPasswordDescription}
      className={className}
      footer={
        onLoginClick ? (
          <Button variant="link" size="sm" onClick={onLoginClick}>
            {labels.loginLink}
          </Button>
        ) : undefined
      }
    >
      {submitted && !error ? (
        <Alert role="status">
          <AlertTitle>Check your email</AlertTitle>
          <AlertDescription>
            If an account exists for <Text as="strong">{submittedEmail}</Text>, you&apos;ll receive a password reset link.
          </AlertDescription>
        </Alert>
      ) : (
        <Form schema={forgotPasswordSchema} onSubmit={handleSubmit} mode="onSubmit">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <FormInput
            name="email"
            label={labels.emailLabel}
            placeholder={labels.emailPlaceholder}
            type="email"
            disabled={loading}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending…' : labels.forgotPasswordButton}
          </Button>
        </Form>
      )}
    </AuthLayout>
  )
}
