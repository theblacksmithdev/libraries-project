# @blacksmith-ui/forms

Smart form components with Zod schema validation, react-hook-form integration, and TanStack React Query hooks — built on top of `@blacksmith-ui/react`.

> **Part of the [blacksmith-cli](https://github.com/oluwatobimaxwell/blacksmith-cli) ecosystem.** This library powers the default forms for blacksmith-cli scaffolded projects, but is fully standalone and can be used in any React application.

[![npm version](https://img.shields.io/npm/v/@blacksmith-ui/forms)](https://www.npmjs.com/package/@blacksmith-ui/forms)
[![license](https://img.shields.io/npm/l/@blacksmith-ui/forms)](./LICENSE)

## Features

- **Zod-first validation** — Define your schema once, get type-safe forms with automatic error display
- **17 field components** — Text, textarea, select, checkbox, switch, radio, date picker, number, slider, color picker, file upload, and more
- **Zero boilerplate** — `<Form>` wraps react-hook-form's `FormProvider` and Zod resolver automatically
- **React Query hooks** — `useFormMutation` and `useFormQuery` for API-connected forms
- **Fully typed** — All field props, form data, and submission handlers are type-safe from your Zod schema
- **Consistent styling** — Every field renders with label, description, and error message via `FieldWrapper`

## Installation

```bash
npm install @blacksmith-ui/forms @blacksmith-ui/react
# or
yarn add @blacksmith-ui/forms @blacksmith-ui/react
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

| Peer Dependency | Version |
|-----------------|---------|
| `@blacksmith-ui/react` | `^0.1.0` |
| `react` | `^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `tailwindcss` | `^3.3.0` |

### Tailwind Configuration

Add both packages to your Tailwind `content` array:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@blacksmith-ui/react/dist/**/*.{js,mjs}',
    './node_modules/@blacksmith-ui/forms/dist/**/*.{js,mjs}',
  ],
  // ... theme config from @blacksmith-ui/react setup
};
```

## Quick Start

```tsx
import { Form, FormInput, FormSelect } from '@blacksmith-ui/forms';
import { Button } from '@blacksmith-ui/react';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Select a role'),
});

function CreateUserForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log(data); // { name: string, email: string, role: string }
  };

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <FormInput name="name" label="Full Name" placeholder="Jane Doe" />
      <FormInput name="email" label="Email" type="email" placeholder="jane@example.com" />
      <FormSelect
        name="role"
        label="Role"
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'Editor', value: 'editor' },
          { label: 'Viewer', value: 'viewer' },
        ]}
      />
      <Button type="submit">Create User</Button>
    </Form>
  );
}
```

## API Reference

### `<Form>`

The root form component. Wraps react-hook-form's `FormProvider` with Zod validation.

```tsx
<Form
  schema={zodSchema}           // Required: Zod schema for validation
  onSubmit={handleSubmit}      // Receives validated, typed data
  defaultValues={{ ... }}      // Optional: initial form values
  mode="onBlur"                // Validation trigger: 'onBlur' (default) | 'onSubmit' | 'onChange'
  mutation={{ error, isPending }} // Optional: displays mutation error, disables during pending
  className="..."              // Applied to the <form> element
>
  {/* Field components */}
</Form>
```

### Field Components

All field components share these base props:

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Field name (must match a key in your Zod schema) |
| `label` | `string` | Label displayed above the field |
| `description` | `string` | Help text displayed below the label |
| `disabled` | `boolean` | Disable the field |
| `className` | `string` | Additional CSS classes |

Each field also accepts the props of its underlying `@blacksmith-ui/react` component (e.g., `FormInput` accepts `Input` props like `type`, `placeholder`).

| Component | Description | Extra Props |
|-----------|-------------|-------------|
| `FormInput` | Text input | `type`, `placeholder` |
| `FormTextarea` | Multi-line text | `placeholder`, `rows` |
| `FormSearchInput` | Search input with icon | `placeholder` |
| `FormSelect` | Dropdown select | `options`, `placeholder` |
| `FormCheckbox` | Checkbox toggle | — |
| `FormSwitch` | Switch toggle | — |
| `FormRadioGroup` | Radio button group | `options` |
| `FormDatePicker` | Date picker | — |
| `FormNumberInput` | Numeric input | `min`, `max`, `step` |
| `FormSlider` | Range slider | `min`, `max`, `step` |
| `FormRangeSlider` | Dual-handle slider | `min`, `max`, `step` |
| `FormRating` | Star rating | `max` |
| `FormTagInput` | Tag/chip input | `placeholder` |
| `FormColorPicker` | Color picker | — |
| `FormFileUpload` | File upload | `accept`, `multiple` |
| `FormPinInput` | PIN/OTP input | `length` |

### `FieldWrapper`

Low-level wrapper used by all field components. Use it to create custom fields:

```tsx
import { FieldWrapper } from '@blacksmith-ui/forms';

<FieldWrapper name="custom" label="Custom Field" description="Help text">
  {(field) => <MyCustomInput {...field} />}
</FieldWrapper>
```

## React Query Integration

### `useFormMutation`

Wraps TanStack React Query's `useMutation` for form submissions:

```tsx
import { Form, FormInput, useFormMutation, FormQueryProvider } from '@blacksmith-ui/forms';
import { Button } from '@blacksmith-ui/react';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const mutation = useFormMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Login failed');
      return res.json();
    },
    onSuccess: (data) => {
      console.log('Logged in:', data);
    },
  });

  return (
    <Form schema={schema} onSubmit={mutation.mutate} mutation={mutation}>
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="password" label="Password" type="password" />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </Form>
  );
}

// Wrap your app with FormQueryProvider
function App() {
  return (
    <FormQueryProvider>
      <LoginForm />
    </FormQueryProvider>
  );
}
```

### `useFormQuery`

Wraps TanStack React Query's `useQuery` for loading form data:

```tsx
const { data, isLoading } = useFormQuery({
  queryKey: ['user', userId],
  queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
});

return (
  <Form schema={schema} onSubmit={handleSubmit} defaultValues={data}>
    {/* fields */}
  </Form>
);
```

### `FormQueryProvider`

Provides a `QueryClient` for the form hooks. Wrap your app (or the relevant subtree) with it:

```tsx
import { FormQueryProvider } from '@blacksmith-ui/forms';

function App() {
  return (
    <FormQueryProvider>
      {/* Forms using useFormMutation/useFormQuery */}
    </FormQueryProvider>
  );
}
```

## Validation

Validation errors are automatically displayed below each field via `FormMessage`. The validation mode controls when errors appear:

| Mode | Behavior |
|------|----------|
| `onBlur` (default) | Validates when the user leaves a field |
| `onSubmit` | Validates only on form submission |
| `onChange` | Validates on every keystroke |

```tsx
// Validate on submit only
<Form schema={schema} onSubmit={handleSubmit} mode="onSubmit">
```

## Development

### Prerequisites

- **Node.js >= 20** (use `nvm use`)
- **Yarn 1.x** (Classic)
- Build `@blacksmith-ui/react` first (this package depends on it)

### Commands

```bash
# Build (build @blacksmith-ui/react first)
yarn workspace @blacksmith-ui/forms build

# Test
yarn workspace @blacksmith-ui/forms test

# Test with coverage
yarn workspace @blacksmith-ui/forms test:coverage

# Storybook (port 6008)
yarn workspace @blacksmith-ui/forms storybook
```

### Project Structure

```
src/
├── components/
│   ├── form/form.tsx           # <Form> wrapper (FormProvider + zodResolver)
│   └── fields/
│       ├── shared/
│       │   ├── types.ts        # BaseFieldProps
│       │   └── field-wrapper.tsx
│       ├── form-input/
│       ├── form-textarea/
│       ├── form-select/
│       ├── form-checkbox/
│       ├── form-switch/
│       ├── form-radio-group/
│       ├── form-date-picker/
│       ├── form-number-input/
│       ├── form-slider/
│       ├── form-range-slider/
│       ├── form-rating/
│       ├── form-tag-input/
│       ├── form-color-picker/
│       ├── form-file-upload/
│       ├── form-pin-input/
│       └── form-search-input/
├── hooks/
│   ├── use-form-mutation.ts    # TanStack React Query mutation hook
│   └── use-form-query.ts       # TanStack React Query query hook
├── providers/
│   └── form-query-provider.tsx  # QueryClient provider
└── index.ts
```

## Related Packages

| Package | Description |
|---------|-------------|
| [`@blacksmith-ui/react`](../react) | Core UI primitives (required peer dependency) |
| [`@blacksmith-ui/auth`](../auth-ui) | Pre-built authentication flows built on this package |

## License

[MIT](../../LICENSE)
