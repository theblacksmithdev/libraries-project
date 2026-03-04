import React, { useState } from 'react'
import { Button, Input, Label } from '@flatui/react'
import { AuthLayout } from '../auth-layout'
import type { AuthLabels, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

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
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit({ email })
    setSubmitted(true)
  }

  return (
    <AuthLayout
      title={labels.forgotPasswordTitle}
      description={labels.forgotPasswordDescription}
      className={className}
      footer={
        onLoginClick ? (
          <button
            type="button"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={onLoginClick}
          >
            {labels.loginLink}
          </button>
        ) : undefined
      }
    >
      {submitted && !error ? (
        <div role="status" className="rounded-md bg-primary/10 p-4 text-center text-sm">
          <p className="font-medium">Check your email</p>
          <p className="mt-1 text-muted-foreground">
            If an account exists for <strong>{email}</strong>, you&apos;ll receive a password reset link.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="forgot-email">{labels.emailLabel}</Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder={labels.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending…' : labels.forgotPasswordButton}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
