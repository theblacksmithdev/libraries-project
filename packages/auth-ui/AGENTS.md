# @blacksmith-ui/auth — AI Reference

> Pre-built authentication UI flows (Login, Register, Forgot/Reset Password) with social login, adapter-based backends, and full i18n. Built on `@blacksmith-ui/forms` + `@blacksmith-ui/react`.

## Installation

```bash
npm install @blacksmith-ui/auth @blacksmith-ui/forms @blacksmith-ui/react
# or
yarn add @blacksmith-ui/auth @blacksmith-ui/forms @blacksmith-ui/react
```

**Peer dependencies:**
- `@blacksmith-ui/react ^0.1.0`
- `react ^18.0.0 || ^19.0.0`
- `react-dom ^18.0.0 || ^19.0.0`
- `tailwindcss ^3.3.0`

**Bundled dependencies:** `@blacksmith-ui/forms`, `zod`, `clsx`, `tailwind-merge`

## Setup

### 1. Import styles

```tsx
import '@blacksmith-ui/react/styles.css';
```

### 2. Configure Tailwind

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@blacksmith-ui/react/src/**/*.{ts,tsx}',
    './node_modules/@blacksmith-ui/forms/src/**/*.{ts,tsx}',
    './node_modules/@blacksmith-ui/auth/src/**/*.{ts,tsx}',
  ],
  // ... extend theme with CSS variable colors (see @blacksmith-ui/react AGENTS.md)
};
```

---

## Quick Start

### Standalone (No AuthProvider)

Use form components directly with your own auth logic:

```tsx
import { LoginForm } from '@blacksmith-ui/auth';

function LoginPage() {
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      await myAuthService.signIn(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      setError({ code: 'auth/error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      error={error}
      loading={loading}
      onForgotPasswordClick={() => router.push('/forgot-password')}
      onRegisterClick={() => router.push('/register')}
      socialProviders={['google', 'github']}
      onSocialLogin={(provider) => myAuthService.socialLogin(provider)}
    />
  );
}
```

### With AuthProvider + Adapter

Use the adapter pattern for managed auth state:

```tsx
import { AuthProvider, useAuth, LoginForm, createMockAdapter } from '@blacksmith-ui/auth';

// 1. Create adapter
const adapter = createMockAdapter({ delay: 500 });

// 2. Wrap app with AuthProvider
function App() {
  return (
    <AuthProvider config={{ adapter, socialProviders: ['google', 'github'] }}>
      <AuthPages />
    </AuthProvider>
  );
}

// 3. Use useAuth() in components
function AuthPages() {
  const { user, signInWithEmail, signInWithSocial, signOut, loading, error, socialProviders } = useAuth();

  if (user) return <Dashboard user={user} onSignOut={signOut} />;

  return (
    <LoginForm
      onSubmit={({ email, password }) => signInWithEmail(email, password)}
      onSocialLogin={(provider) => signInWithSocial(provider)}
      socialProviders={socialProviders}
      error={error}
      loading={loading}
    />
  );
}
```

---

## Form Components

### `LoginForm`

Email/password login form with optional social providers.

```tsx
<LoginForm
  onSubmit={(data) => {}}          // Required: { email: string, password: string }
  error={null}                      // Optional: { code: string, message: string } | null
  loading={false}                   // Optional: disables inputs, shows "Signing in…"
  socialProviders={['google']}      // Optional: show social login buttons
  onSocialLogin={(provider) => {}}  // Optional: called with provider name
  onForgotPasswordClick={() => {}}  // Optional: "Forgot password?" link handler
  onRegisterClick={() => {}}        // Optional: "Don't have an account? Sign up" link handler
  labels={{ loginTitle: 'Welcome' }} // Optional: customize any label text
  className="custom-class"          // Optional: additional CSS classes
/>
```

**Zod validation:** email (required + valid email), password (required)

**Layout:** AuthLayout card with title "Welcome back", email input, password input, submit button, optional social buttons with "Or continue with" divider, optional footer links.

---

### `RegisterForm`

User registration form with password confirmation.

```tsx
<RegisterForm
  onSubmit={(data) => {}}          // Required: { email: string, password: string, displayName: string }
  error={null}                      // Optional: AuthError | null
  loading={false}                   // Optional: shows "Creating account…"
  socialProviders={['google']}      // Optional: social login buttons
  onSocialLogin={(provider) => {}}  // Optional: social login handler
  onLoginClick={() => {}}           // Optional: "Already have an account? Sign in" link
  labels={{}}                       // Optional: customize labels
  className=""                      // Optional
/>
```

**Zod validation:**
- `displayName`: required string
- `email`: required + valid email
- `password`: required, minimum 8 characters
- `confirmPassword`: required, must match password

**Note:** `onSubmit` receives `{ email, password, displayName }` — `confirmPassword` is stripped after validation.

---

### `ForgotPasswordForm`

Password recovery — sends reset link to email.

```tsx
<ForgotPasswordForm
  onSubmit={(data) => {}}          // Required: { email: string }
  error={null}                      // Optional: AuthError | null
  loading={false}                   // Optional: shows "Sending…"
  onLoginClick={() => {}}           // Optional: "Back to Sign in" link
  labels={{}}                       // Optional
  className=""                      // Optional
/>
```

**Zod validation:** email (required + valid email)

**Special behavior:** After successful submission, the form is replaced with a success message: *"Check your email — If an account exists for {email}, you'll receive a password reset link."* This uses an internal `submitted` state.

---

### `ResetPasswordForm`

Set a new password using a reset code/token.

```tsx
<ResetPasswordForm
  onSubmit={(data) => {}}          // Required: { password: string, code: string }
  code="abc123"                     // Required: reset code from URL/route params
  error={null}                      // Optional: AuthError | null
  loading={false}                   // Optional: shows "Resetting…"
  onLoginClick={() => {}}           // Optional: "Go to sign in" button after success
  labels={{}}                       // Optional
  className=""                      // Optional
/>
```

**Zod validation:**
- `password`: required, minimum 8 characters
- `confirmPassword`: required, must match password

**Special behavior:** After successful submission, shows success message: *"Password reset successful — You can now sign in with your new password."* with optional "Go to sign in" button.

**Note:** `onSubmit` receives `{ password, code }` where `code` comes from the `code` prop.

---

### `SocialLoginButtons`

Standalone social login button group.

```tsx
<SocialLoginButtons
  providers={['google', 'github', 'facebook']}  // Required: which providers to show
  onSocialLogin={(provider) => {}}               // Required: called with provider name
  disabled={false}                                // Optional: disable all buttons
  layout="full"                                   // Optional: 'full' (default) | 'icons'
  className=""                                    // Optional
/>
```

**Supported providers:** `'google'` | `'github'` | `'facebook'` | `'apple'` | `'microsoft'` | `'twitter'`

**Layouts:**
- `'full'`: Full-width buttons with labels ("Continue with Google", etc.)
- `'icons'`: Icon-only grid layout (3-column)

Returns `null` if `providers` is empty.

---

### `AuthLayout`

Card wrapper used by all auth forms. Use directly for custom auth UIs.

```tsx
<AuthLayout
  title="Welcome"                    // Required: card title
  description="Sign in to continue"  // Optional: subtitle
  footer={<p>Footer content</p>}     // Optional: card footer
  maxWidth="max-w-md"                // Optional: Tailwind max-width class (default: max-w-md)
  className=""                        // Optional
>
  {children}
</AuthLayout>
```

Renders: Centered card with `min-h-full items-center justify-center p-4`.

---

## Types

### `AuthUser`
```tsx
interface AuthUser {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  providerId: string;
}
```

### `SocialProvider`
```tsx
type SocialProvider = 'google' | 'github' | 'facebook' | 'apple' | 'microsoft' | 'twitter';
```

### `AuthError`
```tsx
interface AuthError {
  code: string;
  message: string;
}
```

### `AuthResult`
```tsx
type AuthResult =
  | { success: true; user: AuthUser }
  | { success: false; error: AuthError };
```

### `AuthAdapter`

Backend interface. Implement this to connect any auth provider:

```tsx
interface AuthAdapter {
  signInWithEmail(email: string, password: string): Promise<AuthResult>;
  signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult>;
  signInWithSocial(provider: SocialProvider): Promise<AuthResult>;
  sendPasswordResetEmail(email: string): Promise<{ success: boolean; error?: AuthError }>;
  confirmPasswordReset(code: string, newPassword: string): Promise<{ success: boolean; error?: AuthError }>;
  signOut(): Promise<void>;
  getCurrentUser(): AuthUser | null;
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;  // Returns unsubscribe fn
}
```

### `AuthConfig`
```tsx
interface AuthConfig {
  adapter: AuthAdapter;
  socialProviders?: SocialProvider[];
  redirectAfterLogin?: string;
  redirectAfterRegister?: string;
  requireEmailVerification?: boolean;
  labels?: Partial<AuthLabels>;
}
```

### `AuthLabels` (all customizable)
```tsx
interface AuthLabels {
  loginTitle: string;                    // "Welcome back"
  loginDescription: string;              // "Sign in to your account"
  loginButton: string;                   // "Sign in"
  registerTitle: string;                 // "Create an account"
  registerDescription: string;           // "Get started with a new account"
  registerButton: string;                // "Create account"
  forgotPasswordTitle: string;           // "Forgot password"
  forgotPasswordDescription: string;     // "Enter your email and we'll send you a reset link"
  forgotPasswordButton: string;          // "Send reset link"
  resetPasswordTitle: string;            // "Reset password"
  resetPasswordDescription: string;      // "Enter your new password"
  resetPasswordButton: string;           // "Reset password"
  emailLabel: string;                    // "Email"
  emailPlaceholder: string;              // "you@example.com"
  passwordLabel: string;                 // "Password"
  passwordPlaceholder: string;           // "Enter your password"
  confirmPasswordLabel: string;          // "Confirm password"
  confirmPasswordPlaceholder: string;    // "Confirm your password"
  displayNameLabel: string;              // "Full name"
  displayNamePlaceholder: string;        // "John Doe"
  forgotPasswordLink: string;            // "Forgot password?"
  loginLink: string;                     // "Already have an account? Sign in"
  registerLink: string;                  // "Don't have an account? Sign up"
  orContinueWith: string;                // "Or continue with"
  socialGoogle: string;                  // "Google"
  socialGithub: string;                  // "GitHub"
  socialFacebook: string;                // "Facebook"
  socialApple: string;                   // "Apple"
  socialMicrosoft: string;               // "Microsoft"
  socialTwitter: string;                 // "Twitter"
}
```

---

## AuthProvider & useAuth

### `AuthProvider`
```tsx
<AuthProvider config={{ adapter, socialProviders: ['google'] }}>
  {children}
</AuthProvider>
```

Manages auth state. Calls `adapter.getCurrentUser()` on mount and `adapter.onAuthStateChanged()` for state updates.

### `useAuth()` Hook

Access auth state and methods from any child component:

```tsx
const {
  user,                     // AuthUser | null — current user
  loading,                  // boolean — auth state initializing
  error,                    // AuthError | null — last error (cleared on each attempt)
  signInWithEmail,          // (email, password) => Promise<AuthResult>
  signUpWithEmail,          // (email, password, displayName?) => Promise<AuthResult>
  signInWithSocial,         // (provider) => Promise<AuthResult>
  sendPasswordResetEmail,   // (email) => Promise<{ success, error? }>
  confirmPasswordReset,     // (code, newPassword) => Promise<{ success, error? }>
  signOut,                  // () => Promise<void>
  socialProviders,          // SocialProvider[]
  labels,                   // AuthLabels (merged defaults + custom)
  config,                   // AuthConfig
} = useAuth();
```

---

## Adapters

### `createMockAdapter(options?)`

For development and testing.

```tsx
import { createMockAdapter } from '@blacksmith-ui/auth';

const adapter = createMockAdapter({
  delay: 800,                // Simulated network delay (default: 800ms)
  initialUser: null,         // Start logged in/out
  simulateError: undefined,  // Force all operations to return this error
});
```

All operations succeed by default. Creates mock users with generated IDs. Useful for Storybook and prototyping.

### `createFirebaseAdapter(options)`

For Firebase Authentication.

```tsx
import { createFirebaseAdapter } from '@blacksmith-ui/auth';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const auth = getAuth(firebaseApp);

const adapter = createFirebaseAdapter({
  auth,
  socialProviderMap: {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
  },
});
```

Wraps Firebase Auth SDK methods. Translates Firebase errors and user objects to library types.

### Custom Adapter

Implement the `AuthAdapter` interface for any backend:

```tsx
import type { AuthAdapter } from '@blacksmith-ui/auth';

const myAdapter: AuthAdapter = {
  async signInWithEmail(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      return { success: false, error: { code: 'auth/failed', message: 'Invalid credentials' } };
    }
    const user = await res.json();
    return { success: true, user };
  },
  async signUpWithEmail(email, password, displayName) { /* ... */ },
  async signInWithSocial(provider) { /* ... */ },
  async sendPasswordResetEmail(email) { /* ... */ },
  async confirmPasswordReset(code, newPassword) { /* ... */ },
  async signOut() { /* ... */ },
  getCurrentUser() { /* return cached user or null */ },
  onAuthStateChanged(callback) {
    // Subscribe to auth changes, call callback(user | null)
    // Return unsubscribe function
    return () => {};
  },
};
```

---

## Complete Multi-Page Auth Example

```tsx
import { useState } from 'react';
import {
  AuthProvider,
  useAuth,
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  createMockAdapter,
} from '@blacksmith-ui/auth';

const adapter = createMockAdapter();

function App() {
  return (
    <AuthProvider config={{ adapter, socialProviders: ['google', 'github'] }}>
      <AuthFlow />
    </AuthProvider>
  );
}

function AuthFlow() {
  const { user, signInWithEmail, signUpWithEmail, signInWithSocial,
          sendPasswordResetEmail, signOut, error, loading, socialProviders } = useAuth();
  const [page, setPage] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');

  if (user) {
    return (
      <div>
        <p>Welcome, {user.displayName}!</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }

  switch (page) {
    case 'login':
      return (
        <LoginForm
          onSubmit={({ email, password }) => signInWithEmail(email, password)}
          onSocialLogin={signInWithSocial}
          socialProviders={socialProviders}
          error={error}
          loading={loading}
          onForgotPasswordClick={() => setPage('forgot')}
          onRegisterClick={() => setPage('register')}
        />
      );
    case 'register':
      return (
        <RegisterForm
          onSubmit={({ email, password, displayName }) => signUpWithEmail(email, password, displayName)}
          onSocialLogin={signInWithSocial}
          socialProviders={socialProviders}
          error={error}
          loading={loading}
          onLoginClick={() => setPage('login')}
        />
      );
    case 'forgot':
      return (
        <ForgotPasswordForm
          onSubmit={({ email }) => sendPasswordResetEmail(email)}
          error={error}
          loading={loading}
          onLoginClick={() => setPage('login')}
        />
      );
    case 'reset':
      return (
        <ResetPasswordForm
          onSubmit={({ password, code }) => confirmPasswordReset(code, password)}
          code="reset-code-from-url"
          error={error}
          loading={loading}
          onLoginClick={() => setPage('login')}
        />
      );
  }
}
```

---

## Error Handling

All form components handle errors consistently:

1. **Validation errors** (Zod) — Appear below each field as `<p>` text via `FormMessage`
2. **External errors** (`error` prop) — Displayed as `<Alert variant="destructive" role="alert">` at the top of the form
3. **Success states** — Displayed as `<Alert role="status">` (ForgotPasswordForm, ResetPasswordForm)

### Error prop format
```tsx
error={{ code: 'auth/invalid-credentials', message: 'Invalid email or password' }}
```

The `message` is displayed to the user. The `code` is for programmatic use.

---

## Testing Notes

1. **Form submission is async** — wrap assertions in `waitFor()`:
   ```tsx
   await user.click(screen.getByRole('button', { name: /sign in/i }));
   await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({ email: '...', password: '...' }));
   ```

2. **External errors** → `getByRole('alert')`:
   ```tsx
   expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials');
   ```

3. **Zod validation errors** → `findByText()`:
   ```tsx
   expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
   ```

4. **Success messages** → `getByRole('status')`:
   ```tsx
   expect(screen.getByRole('status')).toHaveTextContent('Check your email');
   ```

5. **Loading state** disables all inputs and changes button text.

6. **Social buttons** only render when both `socialProviders` and `onSocialLogin` are provided.
