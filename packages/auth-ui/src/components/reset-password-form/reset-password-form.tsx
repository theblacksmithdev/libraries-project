import React, { useState } from 'react'
import { Button, Input, Label } from '@flatui/react'
import { AuthLayout } from '../auth-layout'
import type { AuthLabels, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

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
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setValidationError(null)

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters')
      return
    }

    await onSubmit({ password, code })
    setSubmitted(true)
  }

  const displayError = validationError
    ? { code: 'validation', message: validationError }
    : error

  return (
    <AuthLayout
      title={labels.resetPasswordTitle}
      description={labels.resetPasswordDescription}
      className={className}
      footer={
        onLoginClick ? (
          <button
            type="button"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={onLoginClick}
          >
            Back to sign in
          </button>
        ) : undefined
      }
    >
      {submitted && !error && !validationError ? (
        <div role="status" className="rounded-md bg-primary/10 p-4 text-center text-sm">
          <p className="font-medium">Password reset successful</p>
          <p className="mt-1 text-muted-foreground">
            You can now sign in with your new password.
          </p>
          {onLoginClick && (
            <Button variant="outline" className="mt-4" onClick={onLoginClick}>
              Go to sign in
            </Button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {displayError && (
            <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {displayError.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reset-password">{labels.passwordLabel}</Label>
            <Input
              id="reset-password"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reset-confirm-password">{labels.confirmPasswordLabel}</Label>
            <Input
              id="reset-confirm-password"
              type="password"
              placeholder={labels.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Resetting…' : labels.resetPasswordButton}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
