import type { AuthAdapter, AuthUser, AuthResult, SocialProvider } from '../types/auth'

/**
 * Firebase auth adapter.
 *
 * This adapter wraps Firebase Authentication. The consumer must pass
 * their own Firebase Auth instance so that this package does NOT
 * bundle the Firebase SDK as a dependency.
 *
 * @example
 * ```ts
 * import { initializeApp } from 'firebase/app'
 * import { getAuth } from 'firebase/auth'
 * import { createFirebaseAdapter } from '@forge-ui/auth-ui'
 *
 * const app = initializeApp({ ... })
 * const auth = getAuth(app)
 * const adapter = createFirebaseAdapter({ auth })
 * ```
 */

// Minimal typings for the Firebase Auth objects we use,
// so we don't need firebase as a dependency.
interface FirebaseUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  emailVerified: boolean
  providerId: string
}

interface FirebaseUserCredential {
  user: FirebaseUser
}

interface FirebaseAuthError {
  code: string
  message: string
}

interface FirebaseAuth {
  currentUser: FirebaseUser | null
  signInWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential>
  createUserWithEmailAndPassword(email: string, password: string): Promise<FirebaseUserCredential>
  signInWithPopup(provider: unknown): Promise<FirebaseUserCredential>
  sendPasswordResetEmail(email: string): Promise<void>
  confirmPasswordReset(oobCode: string, newPassword: string): Promise<void>
  signOut(): Promise<void>
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void): () => void
}

export interface FirebaseAdapterOptions {
  /** A Firebase Auth instance (from `getAuth()`) */
  auth: FirebaseAuth
  /**
   * A map from SocialProvider name to the Firebase provider instance.
   * e.g. `{ google: new GoogleAuthProvider(), github: new GithubAuthProvider() }`
   */
  socialProviderMap?: Partial<Record<SocialProvider, unknown>>
}

function toAuthUser(fbUser: FirebaseUser): AuthUser {
  return {
    id: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName,
    photoURL: fbUser.photoURL,
    emailVerified: fbUser.emailVerified,
    providerId: fbUser.providerId,
  }
}

function toAuthError(err: unknown): { code: string; message: string } {
  const fbErr = err as FirebaseAuthError
  return {
    code: fbErr.code ?? 'auth/unknown',
    message: fbErr.message ?? 'An unknown error occurred',
  }
}

export function createFirebaseAdapter({ auth, socialProviderMap = {} }: FirebaseAdapterOptions): AuthAdapter {
  return {
    async signInWithEmail(email, password): Promise<AuthResult> {
      try {
        const cred = await auth.signInWithEmailAndPassword(email, password)
        return { success: true, user: toAuthUser(cred.user) }
      } catch (err) {
        return { success: false, error: toAuthError(err) }
      }
    },

    async signUpWithEmail(email, password, _displayName?): Promise<AuthResult> {
      try {
        const cred = await auth.createUserWithEmailAndPassword(email, password)
        return { success: true, user: toAuthUser(cred.user) }
      } catch (err) {
        return { success: false, error: toAuthError(err) }
      }
    },

    async signInWithSocial(provider): Promise<AuthResult> {
      const fbProvider = socialProviderMap[provider]
      if (!fbProvider) {
        return {
          success: false,
          error: { code: 'auth/unsupported-provider', message: `Provider "${provider}" is not configured` },
        }
      }
      try {
        const cred = await auth.signInWithPopup(fbProvider)
        return { success: true, user: toAuthUser(cred.user) }
      } catch (err) {
        return { success: false, error: toAuthError(err) }
      }
    },

    async sendPasswordResetEmail(email) {
      try {
        await auth.sendPasswordResetEmail(email)
        return { success: true }
      } catch (err) {
        return { success: false, error: toAuthError(err) }
      }
    },

    async confirmPasswordReset(code, newPassword) {
      try {
        await auth.confirmPasswordReset(code, newPassword)
        return { success: true }
      } catch (err) {
        return { success: false, error: toAuthError(err) }
      }
    },

    async signOut() {
      await auth.signOut()
    },

    getCurrentUser() {
      return auth.currentUser ? toAuthUser(auth.currentUser) : null
    },

    onAuthStateChanged(callback) {
      return auth.onAuthStateChanged((fbUser) => {
        callback(fbUser ? toAuthUser(fbUser) : null)
      })
    },
  }
}
