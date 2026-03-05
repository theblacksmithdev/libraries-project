# @flatui/auth-ui

Authentication UI components. Depends on `@flatui/react` + `@flatui/forms`.

## Key Directories

```
src/
├── components/
│   ├── auth-layout/            # AuthLayout — Card wrapper with title/description/footer
│   ├── login-form/             # LoginForm + spec
│   ├── register-form/          # RegisterForm + spec
│   ├── forgot-password-form/   # ForgotPasswordForm + spec
│   ├── reset-password-form/    # ResetPasswordForm + spec
│   └── social-login-buttons/   # SocialLoginButtons (Google, GitHub, Facebook, Apple, Microsoft, Twitter)
├── types/auth.ts               # AuthLabels, SocialProvider, AuthError types + defaultLabels
├── lib/utils.ts                # cn() helper
├── styles/globals.css          # Tailwind directives + CSS variables
└── index.ts
```

## Commands

```bash
yarn workspace @flatui/auth-ui build
yarn workspace @flatui/auth-ui test
yarn workspace @flatui/auth-ui storybook    # port 6007
```

## Component Pattern

Each form component:
1. Defines a Zod schema for validation
2. Uses `<Form schema={...} onSubmit={...} mode="onSubmit">` from `@flatui/forms`
3. Uses `<FormInput name="..." label="..." />` for form fields
4. Displays external errors via `<Alert variant="destructive">` from `@flatui/react`
5. Footer links use `<Button variant="link" size="sm">`
6. Social provider section uses `<Divider label="...">` separator

## Props Convention

All form components accept:
- `onSubmit` — form submission handler
- `error?: AuthError | null` — external error to display
- `loading?: boolean` — disables inputs, changes button text
- `labels?: Partial<AuthLabels>` — i18n label overrides
- `className?: string`

## Tailwind Config

Content paths include upstream packages to ensure all utility classes are generated:
```ts
content: [
  './src/**/*.{ts,tsx}',
  '../flatui/src/**/*.{ts,tsx}',
  '../forms/src/**/*.{ts,tsx}',
]
```

## Testing Notes

- Form submissions are async → wrap `onSubmit` assertions in `waitFor()`
- Zod validation errors: use `findByText('error message')` (renders as FormMessage)
- External error prop: use `getByRole('alert')` (renders as Alert)
- Success states: use `getByRole('status')` (Alert with `role="status"`)
- `getByLabelText()` works for all form fields (FormLabel links to input via htmlFor)
