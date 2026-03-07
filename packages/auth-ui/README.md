# @blacksmith-ui/auth

Drop-in authentication UI components for React — login, registration, password reset, and social login with a pluggable adapter pattern. Built on `@blacksmith-ui/react` and `@blacksmith-ui/forms`.

> **Part of the [blacksmith-cli](https://github.com/oluwatobimaxwell/blacksmith-cli) ecosystem.** This library powers the default auth flows for blacksmith-cli scaffolded projects, but is fully standalone and can be used in any React application.

[![npm version](https://img.shields.io/npm/v/@blacksmith-ui/auth)](https://www.npmjs.com/package/@blacksmith-ui/auth)
[![license](https://img.shields.io/npm/l/@blacksmith-ui/auth)](./LICENSE)

## Features

- **4 auth flows** — Login, register, forgot password, and reset password forms
- **Social login** — Google, GitHub, Facebook, Apple, Microsoft, and Twitter OAuth buttons
- **Adapter pattern** — Works with any auth backend (Firebase, Supabase, Auth0, custom APIs)
- **Built-in adapters** — Mock adapter for development, Firebase adapter for production
- **Full i18n support** — Every label is customizable via the `labels` prop
- **Zod validation** — Client-side form validation with clear error messages
- **AuthProvider context** — Manages auth state and provides `useAuth()` hook
- **Accessible** — Keyboard navigable, proper ARIA attributes, screen reader friendly

## Installation

```bash
npm install @blacksmith-ui/auth @blacksmith-ui/react
# or
yarn add @blacksmith-ui/auth @blacksmith-ui/react
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss lucide-react
```

| Peer Dependency | Version |
|-----------------|---------|
| `@blacksmith-ui/react` | `^0.1.0` |
| `react` | `^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `tailwindcss` | `^3.3.0` |

> **Note:** `@blacksmith-ui/forms` is a direct dependency and installed automatically.

### Tailwind Configuration

Add all three packages to your Tailwind `content` array:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@blacksmith-ui/react/dist/**/*.{js,mjs}',
    './node_modules/@blacksmith-ui/forms/dist/**/*.{js,mjs}',
    './node_modules/@blacksmith-ui/auth/dist/**/*.{js,mjs}',
  ],
  // ... theme config from @blacksmith-ui/react setup
};
```

## Quick Start

```tsx
import { AuthProvider, LoginForm, createMockAdapter } from '@blacksmith-ui/auth';
import '@blacksmith-ui/react/styles.css';

const adapter = createMockAdapter();

function App() {
  return (
    <AuthProvider adapter={adapter}>
      <LoginForm
        onSuccess={(user) => console.log('Logged in:', user)}
        socialProviders={['google', 'github']}
      />
    </AuthProvider>
  );
}
```

## Components

### `LoginForm`

Email/password login with optional social providers and "remember me" checkbox.

```tsx
<LoginForm
  onSuccess={(user) => navigate('/dashboard')}
  error={error}                         // External error to display
  loading={isLoading}                   // Disables form, shows loading state
  socialProviders={['google', 'github']}
  onForgotPassword={() => navigate('/forgot-password')}
  onRegister={() => navigate('/register')}
  labels={{ loginTitle: 'Welcome back' }}
  className="max-w-md"
/>
```

### `RegisterForm`

User registration with name, email, password, and password confirmation.

```tsx
<RegisterForm
  onSuccess={(user) => navigate('/verify-email')}
  error={error}
  loading={isLoading}
  socialProviders={['google', 'github']}
  onLogin={() => navigate('/login')}
  labels={{ registerTitle: 'Get started' }}
/>
```

### `ForgotPasswordForm`

Password recovery — sends a reset email to the user.

```tsx
<ForgotPasswordForm
  onSuccess={() => showToast('Check your email')}
  error={error}
  loading={isLoading}
  onLogin={() => navigate('/login')}
/>
```

### `ResetPasswordForm`

Set a new password using a reset token/code.

```tsx
<ResetPasswordForm
  code={resetToken}  // From URL params
  onSuccess={() => navigate('/login')}
  error={error}
  loading={isLoading}
/>
```

### `SocialLoginButtons`

Standalone social login buttons that can be used independently.

```tsx
<SocialLoginButtons
  providers={['google', 'github', 'apple']}
  onSocialLogin={(provider) => handleSocial(provider)}
  loading={isLoading}
/>
```

### `AuthLayout`

Card wrapper for auth forms with title, description, and footer slot.

```tsx
<AuthLayout
  title="Welcome back"
  description="Sign in to your account"
  footer={<p>Need help? <a href="/support">Contact support</a></p>}
>
  {/* Form content */}
</AuthLayout>
```

## Common Props

All form components share these props:

| Prop | Type | Description |
|------|------|-------------|
| `onSuccess` | `(user: AuthUser) => void` | Called after successful authentication |
| `error` | `AuthError \| null` | External error to display (e.g., from API) |
| `loading` | `boolean` | Disables inputs and shows loading state on submit button |
| `labels` | `Partial<AuthLabels>` | Override any text label for i18n |
| `className` | `string` | Additional CSS classes |

## Auth Adapters

The adapter pattern decouples the UI from the auth implementation. Implement the `AuthAdapter` interface to connect any backend:

```tsx
interface AuthAdapter {
  signInWithEmail(email: string, password: string): Promise<AuthResult>;
  signUpWithEmail(email: string, password: string, displayName?: string): Promise<AuthResult>;
  signInWithSocial(provider: SocialProvider): Promise<AuthResult>;
  sendPasswordResetEmail(email: string): Promise<{ success: boolean; error?: AuthError }>;
  confirmPasswordReset(code: string, newPassword: string): Promise<{ success: boolean; error?: AuthError }>;
  signOut(): Promise<void>;
  getCurrentUser(): AuthUser | null;
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}
```

### Mock Adapter

For development and testing:

```tsx
import { createMockAdapter } from '@blacksmith-ui/auth';

const adapter = createMockAdapter({
  simulateDelay: 1000,  // Simulate network latency (ms)
  // Pre-populated users, auto-success, etc.
});
```

### Firebase Adapter

For Firebase Authentication:

```tsx
import { createFirebaseAdapter } from '@blacksmith-ui/auth';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);
const adapter = createFirebaseAdapter({ auth });
```

### Custom Adapter

Connect to any backend:

```tsx
const customAdapter: AuthAdapter = {
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
  // ... implement remaining methods
};
```

## AuthProvider & useAuth

`AuthProvider` manages auth state and exposes it via the `useAuth()` hook:

```tsx
import { AuthProvider, useAuth } from '@blacksmith-ui/auth';

function App() {
  return (
    <AuthProvider adapter={adapter}>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <LoginForm />;

  return (
    <div>
      <p>Welcome, {user.displayName}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
```

## Internationalization (i18n)

Every text label can be overridden via the `labels` prop on any form component:

```tsx
<LoginForm
  labels={{
    loginTitle: 'Bienvenue',
    loginDescription: 'Connectez-vous a votre compte',
    loginButton: 'Se connecter',
    emailLabel: 'Adresse email',
    emailPlaceholder: 'vous@exemple.com',
    passwordLabel: 'Mot de passe',
    forgotPasswordLink: 'Mot de passe oublie ?',
    registerLink: "Pas de compte ? S'inscrire",
    orContinueWith: 'Ou continuer avec',
  }}
/>
```

### Available Labels

| Label | Default |
|-------|---------|
| `loginTitle` | "Welcome back" |
| `loginDescription` | "Sign in to your account" |
| `loginButton` | "Sign in" |
| `registerTitle` | "Create an account" |
| `registerDescription` | "Get started with a new account" |
| `registerButton` | "Create account" |
| `forgotPasswordTitle` | "Forgot password" |
| `forgotPasswordButton` | "Send reset link" |
| `resetPasswordTitle` | "Reset password" |
| `resetPasswordButton` | "Reset password" |
| `emailLabel` | "Email" |
| `passwordLabel` | "Password" |
| `confirmPasswordLabel` | "Confirm password" |
| `displayNameLabel` | "Full name" |
| `rememberMe` | "Remember me" |
| `forgotPasswordLink` | "Forgot password?" |
| `loginLink` | "Already have an account? Sign in" |
| `registerLink` | "Don't have an account? Sign up" |
| `orContinueWith` | "Or continue with" |

## Types

Key TypeScript types exported from this package:

```tsx
import type {
  AuthUser,           // { id, email, displayName, photoURL, emailVerified, providerId }
  AuthAdapter,        // Interface for auth backend implementations
  AuthResult,         // { success: true, user } | { success: false, error }
  AuthError,          // { code: string, message: string }
  AuthLabels,         // All customizable text labels
  SocialProvider,     // 'google' | 'github' | 'facebook' | 'apple' | 'microsoft' | 'twitter'
  AuthConfig,         // AuthProvider configuration
  LoginFormProps,
  RegisterFormProps,
  ForgotPasswordFormProps,
  ResetPasswordFormProps,
  SocialLoginButtonsProps,
  AuthLayoutProps,
  AuthProviderProps,
  AuthContextValue,
} from '@blacksmith-ui/auth';
```

## Development

### Prerequisites

- **Node.js >= 20** (use `nvm use`)
- **Yarn 1.x** (Classic)
- Build upstream packages first: `@blacksmith-ui/react` then `@blacksmith-ui/forms`

### Commands

```bash
# Build (build react + forms first)
yarn workspace @blacksmith-ui/auth build

# Test
yarn workspace @blacksmith-ui/auth test

# Test with coverage
yarn workspace @blacksmith-ui/auth test:coverage

# Storybook (port 6007)
yarn workspace @blacksmith-ui/auth storybook
```

### Project Structure

```
src/
├── components/
│   ├── auth-layout/            # Card wrapper with title/description/footer
│   ├── login-form/             # LoginForm + tests
│   ├── register-form/          # RegisterForm + tests
│   ├── forgot-password-form/   # ForgotPasswordForm + tests
│   ├── reset-password-form/    # ResetPasswordForm + tests
│   └── social-login-buttons/   # OAuth provider buttons
├── adapters/
│   ├── mock-adapter.ts         # Mock adapter for development/testing
│   └── firebase-adapter.ts     # Firebase Authentication adapter
├── providers/
│   └── auth-provider.tsx       # AuthProvider + useAuth hook
├── types/
│   └── auth.ts                 # AuthUser, AuthAdapter, AuthLabels, etc.
├── styles/globals.css
└── index.ts
```

## Related Packages

| Package | Description |
|---------|-------------|
| [`@blacksmith-ui/react`](../react) | Core UI primitives (required peer dependency) |
| [`@blacksmith-ui/forms`](../forms) | Form components with Zod validation (bundled dependency) |

## License

[MIT](../../LICENSE)
