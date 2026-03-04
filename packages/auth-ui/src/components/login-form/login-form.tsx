import React, { useState } from 'react'
import { Button, Input, Label } from '@flatui/react'
import { cn } from '../../lib/utils'
import { AuthLayout } from '../auth-layout'
import { SocialLoginButtons } from '../social-login-buttons'
import type { AuthLabels, SocialProvider, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

export interface LoginFormProps {
  /** Called when the form is submitted */
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>
  /** Called when a social provider button is clicked */
  onSocialLogin?: (provider: SocialProvider) => void | Promise<void>
  /** Social providers to display */
  socialProviders?: SocialProvider[]
  /** Navigate to register */
  onRegisterClick?: () => void
  /** Navigate to forgot password */
  onForgotPasswordClick?: () => void
  /** External error to display */
  error?: AuthError | null
  /** Whether the form is in a loading state */
  loading?: boolean
  /** Label overrides */
  labels?: Partial<AuthLabels>
  /** Additional className */
  className?: string
}

export function LoginForm({
  onSubmit,
  onSocialLogin,
  socialProviders = [],
  onRegisterClick,
  onForgotPasswordClick,
  error,
  loading = false,
  labels: labelOverrides,
  className,
}: LoginFormProps) {
  const labels = { ...defaultLabels, ...labelOverrides }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSubmit({ email, password })
  }

  return (
    <AuthLayout
      title={labels.loginTitle}
      description={labels.loginDescription}
      className={className}
      footer={
        onRegisterClick ? (
          <button
            type="button"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={onRegisterClick}
          >
            {labels.registerLink}
          </button>
        ) : undefined
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error.message}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="login-email">{labels.emailLabel}</Label>
          <Input
            id="login-email"
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
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">{labels.passwordLabel}</Label>
            {onForgotPasswordClick && (
              <button
                type="button"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                onClick={onForgotPasswordClick}
              >
                {labels.forgotPasswordLink}
              </button>
            )}
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder={labels.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : labels.loginButton}
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
