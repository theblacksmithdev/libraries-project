import React from 'react'
import { z } from 'zod'
import { Button, Alert, AlertDescription, Divider } from '@blacksmith-ui/react'
import { Form, FormInput } from '@blacksmith-ui/forms'
import { AuthLayout } from '../auth-layout'
import { SocialLoginButtons } from '../social-login-buttons'
import type { AuthLabels, SocialProvider, AuthError } from '../../types/auth'
import { defaultLabels } from '../../types/auth'

const registerSchema = z.object({
  displayName: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type RegisterData = z.infer<typeof registerSchema>

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

  async function handleSubmit(data: RegisterData) {
    const { email, password, displayName } = data
    await onSubmit({ email, password, displayName })
  }

  return (
    <AuthLayout
      title={labels.registerTitle}
      description={labels.registerDescription}
      className={className}
      footer={
        onLoginClick ? (
          <Button variant="link" size="sm" onClick={onLoginClick}>
            {labels.loginLink}
          </Button>
        ) : undefined
      }
    >
      <Form schema={registerSchema} onSubmit={handleSubmit} mode="onSubmit">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <FormInput
          name="displayName"
          label={labels.displayNameLabel}
          placeholder={labels.displayNamePlaceholder}
          type="text"
          disabled={loading}
        />

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

        <FormInput
          name="confirmPassword"
          label={labels.confirmPasswordLabel}
          placeholder={labels.confirmPasswordPlaceholder}
          type="password"
          disabled={loading}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating account…' : labels.registerButton}
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
