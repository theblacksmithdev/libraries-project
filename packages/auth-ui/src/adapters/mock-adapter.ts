import type { AuthAdapter, AuthUser, AuthResult, AuthError, SocialProvider } from '../types/auth'

/**
 * A mock auth adapter for testing and Storybook demos.
 * Simulates async operations with configurable delay and behaviour.
 */
export interface MockAdapterOptions {
  /** Simulated network delay in ms (default: 800) */
  delay?: number
  /** Pre-populated user to start as "logged in" */
  initialUser?: AuthUser | null
  /** If set, all operations will fail with this error */
  simulateError?: AuthError
}

export function createMockAdapter(options: MockAdapterOptions = {}): AuthAdapter {
  const { delay = 800, initialUser = null, simulateError } = options
  let currentUser: AuthUser | null = initialUser
  const listeners = new Set<(user: AuthUser | null) => void>()

  function notifyListeners() {
    listeners.forEach((cb) => cb(currentUser))
  }

  async function wait() {
    await new Promise((r) => setTimeout(r, delay))
  }

  function makeUser(email: string, displayName?: string): AuthUser {
    return {
      id: `mock-${Date.now()}`,
      email,
      displayName: displayName ?? email.split('@')[0],
      photoURL: null,
      emailVerified: true,
      providerId: 'password',
    }
  }

  return {
    async signInWithEmail(email: string, _password: string): Promise<AuthResult> {
      await wait()
      if (simulateError) return { success: false, error: simulateError }
      currentUser = makeUser(email)
      notifyListeners()
      return { success: true, user: currentUser }
    },

    async signUpWithEmail(email: string, _password: string, displayName?: string): Promise<AuthResult> {
      await wait()
      if (simulateError) return { success: false, error: simulateError }
      currentUser = makeUser(email, displayName)
      notifyListeners()
      return { success: true, user: currentUser }
    },

    async signInWithSocial(provider: SocialProvider): Promise<AuthResult> {
      await wait()
      if (simulateError) return { success: false, error: simulateError }
      currentUser = {
        id: `mock-social-${Date.now()}`,
        email: `user@${provider}.example.com`,
        displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        photoURL: null,
        emailVerified: true,
        providerId: provider,
      }
      notifyListeners()
      return { success: true, user: currentUser }
    },

    async sendPasswordResetEmail(_email: string) {
      await wait()
      if (simulateError) return { success: false, error: simulateError }
      return { success: true }
    },

    async confirmPasswordReset(_code: string, _newPassword: string) {
      await wait()
      if (simulateError) return { success: false, error: simulateError }
      return { success: true }
    },

    async signOut() {
      await wait()
      currentUser = null
      notifyListeners()
    },

    getCurrentUser() {
      return currentUser
    },

    onAuthStateChanged(callback: (user: AuthUser | null) => void) {
      listeners.add(callback)
      // Fire immediately with current state
      callback(currentUser)
      return () => {
        listeners.delete(callback)
      }
    },
  }
}
