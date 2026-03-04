import React, { useState } from 'react'
import { Button, Input, Label } from '@flatui/react'
import { cn } from '../../lib/utils'
import { AuthLayout } from '../auth-layout'
import { SocialLoginButtons } from '../social-login-buttons'
import type { AuthLabels, SocialProvider, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

export interface RegisterFormProps {
  /** Called when the form is submitted */
  onSubmit: (data: { email: string; password: string; displayName: string }) => void | Promise<void>
  /** Called when a social provider button is clicked */
  onSocialLogin?: (provider: SocialProvider) => void | Promise<void>
  /** Social providers to display */
  socialProviders?: SocialProvider[]
  /** Navigate to login */
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

export function RegisterForm({
  onSubmit,
  onSocialLogin,
  socialProviders = [],
  onLoginClick,
  error,
  loading = false,
  labels: labelOverrides,
  className,
}: RegisterFormProps) {
  const labels = { ...defaultLabels, ...labelOverrides }
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

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

    await onSubmit({ email, password, displayName })
  }

  const displayError = validationError
    ? { code: 'validation', message: validationError }
    : error

  return (
    <AuthLayout
      title={labels.registerTitle}
      description={labels.registerDescription}
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {displayError && (
          <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {displayError.message}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="register-name">{labels.displayNameLabel}</Label>
          <Input
            id="register-name"
            type="text"
            placeholder={labels.displayNamePlaceholder}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            disabled={loading}
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">{labels.emailLabel}</Label>
          <Input
            id="register-email"
            type="email"
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">{labels.passwordLabel}</Label>
          <Input
            id="register-password"
            type="password"
            placeholder={labels.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-confirm-password">{labels.confirmPasswordLabel}</Label>
          <Input
            id="register-confirm-password"
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
          {loading ? 'Creating account…' : labels.registerButton}
        </Button>

        {socialProviders.length > 0 && onSocialLogin && (
          <>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={cn('bg-card px-2 text-muted-foreground')}>
                  {labels.orContinueWith}
                </span>
              </div>
            </div>
            <SocialLoginButtons
              providers={socialProviders}
              onSocialLogin={onSocialLogin}
              disabled={loading}
            />
          </>
        )}
      </form>
    </AuthLayout>
  )
}
