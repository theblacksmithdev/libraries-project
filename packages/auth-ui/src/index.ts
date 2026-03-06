// @blacksmith-ui/auth — Configurable authentication UI components

// Types
export type {
  AuthUser,
  SocialProvider,
  AuthResult,
  AuthError,
  AuthAdapter,
  AuthConfig,
  AuthLabels,
} from './types/auth'
export { defaultLabels } from './types/auth'

// Provider
export { AuthProvider, useAuth } from './providers'
export type { AuthProviderProps, AuthContextValue } from './providers'

// Adapters
export { createMockAdapter } from './adapters'
export type { MockAdapterOptions } from './adapters'
export { createFirebaseAdapter } from './adapters'
export type { FirebaseAdapterOptions } from './adapters'

// Components
export { LoginForm } from './components/login-form'
export type { LoginFormProps } from './components/login-form'

export { RegisterForm } from './components/register-form'
export type { RegisterFormProps } from './components/register-form'

export { ForgotPasswordForm } from './components/forgot-password-form'
export type { ForgotPasswordFormProps } from './components/forgot-password-form'

export { ResetPasswordForm } from './components/reset-password-form'
export type { ResetPasswordFormProps } from './components/reset-password-form'

export { SocialLoginButtons } from './components/social-login-buttons'
export type { SocialLoginButtonsProps } from './components/social-login-buttons'

export { AuthLayout } from './components/auth-layout'
export type { AuthLayoutProps } from './components/auth-layout'
