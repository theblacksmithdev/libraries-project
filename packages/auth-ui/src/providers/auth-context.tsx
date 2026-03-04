import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import type {
  AuthAdapter,
  AuthConfig,
  AuthLabels,
  AuthUser,
  AuthError,
  AuthResult,
  SocialProvider,
} from '../types/auth'
import { defaultLabels } from '../types/auth'

export interface AuthContextValue {
  /** The current user, or null if not authenticated */
  user: AuthUser | null
  /** Whether the auth state is still loading */
  loading: boolean
  /** The last auth error encountered */
  error: AuthError | null
  /** Sign in with email/password */
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>
  /** Register with email/password */
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<AuthResult>
  /** Sign in with a social provider */
  signInWithSocial: (provider: SocialProvider) => Promise<AuthResult>
  /** Send password reset email */
  sendPasswordResetEmail: (email: string) => Promise<{ success: boolean; error?: AuthError }>
  /** Confirm password reset */
  confirmPasswordReset: (code: string, newPassword: string) => Promise<{ success: boolean; error?: AuthError }>
  /** Sign out */
  signOut: () => Promise<void>
  /** Configured social providers */
  socialProviders: SocialProvider[]
  /** Resolved labels (defaults merged with custom) */
  labels: AuthLabels
  /** Full auth config */
  config: AuthConfig
}

const AuthContext = createContext<AuthContextValue | null>(null)

export interface AuthProviderProps {
  config: AuthConfig
  children: React.ReactNode
}

export function AuthProvider({ config, children }: AuthProviderProps) {
  const { adapter } = config
  const [user, setUser] = useState<AuthUser | null>(() => adapter.getCurrentUser())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  const labels = useMemo(
    () => ({ ...defaultLabels, ...config.labels }),
    [config.labels],
  )

  useEffect(() => {
    const unsubscribe = adapter.onAuthStateChanged((u) => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [adapter])

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setError(null)
      const result = await adapter.signInWithEmail(email, password)
      if (!result.success) setError(result.error)
      return result
    },
    [adapter],
  )

  const signUpWithEmail = useCallback(
    async (email: string, password: string, displayName?: string) => {
      setError(null)
      const result = await adapter.signUpWithEmail(email, password, displayName)
      if (!result.success) setError(result.error)
      return result
    },
    [adapter],
  )

  const signInWithSocial = useCallback(
    async (provider: SocialProvider) => {
      setError(null)
      const result = await adapter.signInWithSocial(provider)
      if (!result.success) setError(result.error)
      return result
    },
    [adapter],
  )

  const sendPasswordResetEmail = useCallback(
    async (email: string) => {
      setError(null)
      const result = await adapter.sendPasswordResetEmail(email)
      if (!result.success && result.error) setError(result.error)
      return result
    },
    [adapter],
  )

  const confirmPasswordReset = useCallback(
    async (code: string, newPassword: string) => {
      setError(null)
      const result = await adapter.confirmPasswordReset(code, newPassword)
      if (!result.success && result.error) setError(result.error)
      return result
    },
    [adapter],
  )

  const signOut = useCallback(async () => {
    setError(null)
    await adapter.signOut()
  }, [adapter])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      error,
      signInWithEmail,
      signUpWithEmail,
      signInWithSocial,
      sendPasswordResetEmail,
      confirmPasswordReset,
      signOut,
      socialProviders: config.socialProviders ?? [],
      labels,
      config,
    }),
    [
      user,
      loading,
      error,
      signInWithEmail,
      signUpWithEmail,
      signInWithSocial,
      sendPasswordResetEmail,
      confirmPasswordReset,
      signOut,
      config,
      labels,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return ctx
}
