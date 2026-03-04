/** Represents an authenticated user across any auth provider */
export interface AuthUser {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  providerId: string
}

/** Supported social/third-party auth providers */
export type SocialProvider = 'google' | 'github' | 'facebook' | 'apple' | 'microsoft' | 'twitter'

/** Result of an authentication operation */
export type AuthResult =
  | { success: true; user: AuthUser }
  | { success: false; error: AuthError }

/** Structured auth error */
export interface AuthError {
  code: string
  message: string
}

/**
 * Adapter interface that auth providers must implement.
 * This allows the auth-ui package to work with Firebase, Supabase,
 * Auth0, custom backends, or any other auth service.
 */
export interface AuthAdapter {
  /** Sign in with email and password */
  signInWithEmail(email: string, password: string): Promise<AuthResult>

  /** Create a new account with email and password */
  signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult>

  /** Sign in using a social/third-party provider */
  signInWithSocial(provider: SocialProvider): Promise<AuthResult>

  /** Send a password reset email */
  sendPasswordResetEmail(email: string): Promise<{ success: boolean; error?: AuthError }>

  /** Confirm password reset with code/token */
  confirmPasswordReset(code: string, newPassword: string): Promise<{ success: boolean; error?: AuthError }>

  /** Sign out the current user */
  signOut(): Promise<void>

  /** Get the currently signed-in user, or null */
  getCurrentUser(): AuthUser | null

  /** Subscribe to auth state changes. Returns an unsubscribe function. */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void
}

/** Configuration for the AuthProvider */
export interface AuthConfig {
  /** The auth adapter implementation to use */
  adapter: AuthAdapter

  /** Social providers to enable (shown as social login buttons) */
  socialProviders?: SocialProvider[]

  /** URL to redirect to after successful login */
  redirectAfterLogin?: string

  /** URL to redirect to after successful registration */
  redirectAfterRegister?: string

  /** Whether to require email verification after registration */
  requireEmailVerification?: boolean

  /** Custom labels / i18n overrides */
  labels?: Partial<AuthLabels>
}

/** Customizable text labels for all auth UI components */
export interface AuthLabels {
  loginTitle: string
  loginDescription: string
  loginButton: string
  registerTitle: string
  registerDescription: string
  registerButton: string
  forgotPasswordTitle: string
  forgotPasswordDescription: string
  forgotPasswordButton: string
  resetPasswordTitle: string
  resetPasswordDescription: string
  resetPasswordButton: string
  emailLabel: string
  emailPlaceholder: string
  passwordLabel: string
  passwordPlaceholder: string
  confirmPasswordLabel: string
  confirmPasswordPlaceholder: string
  displayNameLabel: string
  displayNamePlaceholder: string
  rememberMe: string
  forgotPasswordLink: string
  loginLink: string
  registerLink: string
  orContinueWith: string
  socialGoogle: string
  socialGithub: string
  socialFacebook: string
  socialApple: string
  socialMicrosoft: string
  socialTwitter: string
}

export const defaultLabels: AuthLabels = {
  loginTitle: 'Welcome back',
  loginDescription: 'Sign in to your account',
  loginButton: 'Sign in',
  registerTitle: 'Create an account',
  registerDescription: 'Get started with a new account',
  registerButton: 'Create account',
  forgotPasswordTitle: 'Forgot password',
  forgotPasswordDescription: 'Enter your email and we\'ll send you a reset link',
  forgotPasswordButton: 'Send reset link',
  resetPasswordTitle: 'Reset password',
  resetPasswordDescription: 'Enter your new password',
  resetPasswordButton: 'Reset password',
  emailLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  confirmPasswordLabel: 'Confirm password',
  confirmPasswordPlaceholder: 'Confirm your password',
  displayNameLabel: 'Full name',
  displayNamePlaceholder: 'John Doe',
  rememberMe: 'Remember me',
  forgotPasswordLink: 'Forgot password?',
  loginLink: 'Already have an account? Sign in',
  registerLink: 'Don\'t have an account? Sign up',
  orContinueWith: 'Or continue with',
  socialGoogle: 'Google',
  socialGithub: 'GitHub',
  socialFacebook: 'Facebook',
  socialApple: 'Apple',
  socialMicrosoft: 'Microsoft',
  socialTwitter: 'Twitter',
}
