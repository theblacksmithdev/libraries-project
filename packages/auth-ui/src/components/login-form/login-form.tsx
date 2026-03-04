import React from 'react'
import { z } from 'zod'
import { Button, Alert, AlertDescription, Divider } from '@flatui/react'
import { Form, FormInput } from '@flatui/forms'
import { AuthLayout } from '../auth-layout'
import { SocialLoginButtons } from '../social-login-buttons'
import type { AuthLabels, SocialProvider, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})

type LoginData = z.infer<typeof loginSchema>

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

  async function handleSubmit(data: LoginData) {
    await onSubmit(data)
  }

  return (
    <AuthLayout
      title={labels.loginTitle}
      description={labels.loginDescription}
      className={className}
      footer={
        onRegisterClick ? (
          <Button variant="link" size="sm" onClick={onRegisterClick}>
            {labels.registerLink}
          </Button>
        ) : undefined
      }
    >
      <Form schema={loginSchema} onSubmit={handleSubmit} mode="onSubmit">
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

        <FormInput
          name="password"
          label={labels.passwordLabel}
          placeholder={labels.passwordPlaceholder}
          type="password"
          disabled={loading}
        />

        {onForgotPasswordClick && (
          <div className="flex justify-end -mt-2">
            <Button variant="link" size="sm" onClick={onForgotPasswordClick}>
              {labels.forgotPasswordLink}
            </Button>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in…' : labels.loginButton}
        </Button>

        {socialProviders.length > 0 && onSocialLogin && (
          <>
            <Divider label={labels.orContinueWith} className="my-4" />
            <SocialLoginButtons
              providers={socialProviders}
              onSocialLogin={onSocialLogin}
              disabled={loading}
            />
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
