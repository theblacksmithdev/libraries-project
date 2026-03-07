# @blacksmith-ui/forms — AI Reference

> Smart form components with Zod validation, react-hook-form integration, and React Query hooks. Built on `@blacksmith-ui/react`.

## Installation

```bash
npm install @blacksmith-ui/forms @blacksmith-ui/react
# or
yarn add @blacksmith-ui/forms @blacksmith-ui/react
```

**Peer dependencies:**
- `@blacksmith-ui/react ^0.1.0`
- `react ^18.0.0 || ^19.0.0`
- `react-dom ^18.0.0 || ^19.0.0`
- `tailwindcss ^3.3.0`

**Bundled dependencies (no need to install):**
- `react-hook-form`, `@hookform/resolvers`, `zod`, `@tanstack/react-query`

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
  ],
  // ... extend theme with CSS variable colors (see @blacksmith-ui/react AGENTS.md)
};
```

---

## Quick Start

```tsx
import { z } from 'zod';
import { Form, FormInput, FormSelect, FormCheckbox } from '@blacksmith-ui/forms';
import { Button } from '@blacksmith-ui/react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  acceptTerms: z.boolean().refine(v => v === true, 'You must accept the terms'),
});

function MyForm() {
  const handleSubmit = (data: z.infer<typeof schema>) => {
    console.log(data); // { name, email, role, acceptTerms } — fully typed & validated
  };

  return (
    <Form schema={schema} onSubmit={handleSubmit} defaultValues={{ name: '', email: '', role: '', acceptTerms: false }}>
      <FormInput name="name" label="Full Name" placeholder="John Doe" />
      <FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
      <FormSelect
        name="role"
        label="Role"
        placeholder="Select a role"
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ]}
      />
      <FormCheckbox name="acceptTerms" label="I accept the terms and conditions" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

---

## Core API

### `<Form>` Component

The root form component. Wraps react-hook-form's `FormProvider` with Zod validation.

```tsx
<Form
  schema={zodSchema}           // Required: Zod schema for validation
  onSubmit={handleSubmit}      // Required: (data: z.infer<typeof schema>) => void | Promise<void>
  defaultValues={defaults}     // Optional: initial field values
  mode="onBlur"                // Optional: 'onBlur' (default) | 'onSubmit' | 'onChange'
  mutation={mutation}          // Optional: { error?: Error | null, isPending?: boolean }
  className="custom-class"     // Optional: additional CSS classes
>
  {/* Field components */}
</Form>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `schema` | `ZodSchema` | — | **Required.** Zod schema defining form shape and validation rules |
| `onSubmit` | `(data) => void \| Promise<void>` | — | **Required.** Called with validated, typed data |
| `defaultValues` | `object` | — | Initial values for all fields |
| `mode` | `'onBlur' \| 'onSubmit' \| 'onChange'` | `'onBlur'` | When to trigger validation |
| `mutation` | `{ error?: Error \| null, isPending?: boolean }` | — | Pass `useFormMutation` result to show server errors |
| `className` | `string` | — | Added to the `<form>` element |

**Rendered HTML:** `<form className="space-y-4 {className}">`. Mutation errors render as an alert below the form fields.

---

## Field Components

All field components share these base props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | **Required.** Must match a key in the Zod schema |
| `label` | `string` | — | Label text above the field |
| `description` | `string` | — | Help text below the field |
| `className` | `string` | — | Additional CSS classes on the wrapper |
| `disabled` | `boolean` | `false` | Disable the field |

Validation errors from Zod automatically appear below each field as a `<p>` element (via `FormMessage`).

---

### `FormInput`
Standard text input.
```tsx
<FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `type` | `HTMLInputTypeAttribute` | Input type: `"text"`, `"email"`, `"password"`, `"number"`, `"url"`, `"tel"`, etc. |

### `FormTextarea`
Multi-line text input.
```tsx
<FormTextarea name="bio" label="Bio" placeholder="Tell us about yourself" rows={4} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `rows` | `number` | Number of visible text lines |

### `FormSearchInput`
Search input with icon and clear button.
```tsx
<FormSearchInput name="query" label="Search" placeholder="Search..." loading={isSearching} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `loading` | `boolean` | Show loading indicator |

### `FormSelect`
Dropdown select.
```tsx
<FormSelect
  name="country"
  label="Country"
  placeholder="Select country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    // Grouped options:
    { label: 'Europe', options: [
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ]},
  ]}
/>
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `options` | `SelectOptionOrGroup[]` | Flat or grouped options |

**Option types:**
```tsx
type SelectOptionDef = { value: string; label: string; disabled?: boolean }
type SelectGroupDef = { label: string; options: SelectOptionDef[] }
type SelectOptionOrGroup = SelectOptionDef | SelectGroupDef
```

### `FormCheckbox`
Boolean checkbox. Renders with label to the right.
```tsx
<FormCheckbox name="acceptTerms" label="I accept the terms" description="Required to proceed" />
```

### `FormSwitch`
Boolean toggle switch. Renders with label to the left, switch to the right.
```tsx
<FormSwitch name="notifications" label="Enable notifications" description="Receive email updates" />
```

### `FormRadioGroup`
Radio button group.
```tsx
<FormRadioGroup
  name="plan"
  label="Select Plan"
  orientation="vertical"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
/>
```
| Extra Prop | Type | Default | Description |
|------------|------|---------|-------------|
| `options` | `RadioOption[]` | — | `{ value: string, label: string, disabled?: boolean }` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction |

### `FormDatePicker`
Date picker input.
```tsx
<FormDatePicker name="dob" label="Date of Birth" placeholder="Pick a date" />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `dateFormat` | `string` | Date format string |

### `FormNumberInput`
Numeric input with increment/decrement buttons.
```tsx
<FormNumberInput name="quantity" label="Quantity" min={1} max={100} step={1} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `min` | `number` | Minimum value |
| `max` | `number` | Maximum value |
| `step` | `number` | Increment step |
| `placeholder` | `string` | Placeholder text |

### `FormSlider`
Single-value slider. Internally converts between `number` and `number[]` (Radix Slider expects array).
```tsx
<FormSlider name="volume" label="Volume" min={0} max={100} step={1} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `min` | `number` | Minimum value |
| `max` | `number` | Maximum value |
| `step` | `number` | Step increment |

### `FormRangeSlider`
Dual-handle range slider. Value is `[min, max]` tuple.
```tsx
<FormRangeSlider name="priceRange" label="Price Range" min={0} max={1000} step={10} showLabels />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `min` | `number` | Minimum value |
| `max` | `number` | Maximum value |
| `step` | `number` | Step increment |
| `showLabels` | `boolean` | Show min/max labels |
| `formatLabel` | `(value: number) => string` | Custom label formatter |

### `FormRating`
Star rating input.
```tsx
<FormRating name="rating" label="Your Rating" max={5} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `max` | `number` | Maximum stars |

### `FormTagInput`
Tag/chip input with add/remove.
```tsx
<FormTagInput name="tags" label="Tags" placeholder="Add tag..." max={10} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `max` | `number` | Maximum number of tags |

### `FormColorPicker`
Color picker.
```tsx
<FormColorPicker name="color" label="Brand Color" swatches={['#ff0000', '#00ff00', '#0000ff']} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `placeholder` | `string` | Placeholder text |
| `swatches` | `string[]` | Preset color swatches |

### `FormFileUpload`
File upload with drag-and-drop.
```tsx
<FormFileUpload name="avatar" label="Profile Photo" accept="image/*" maxSize={5242880} />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `accept` | `string` | Accepted file types (MIME) |
| `multiple` | `boolean` | Allow multiple files |
| `maxSize` | `number` | Maximum file size in bytes |

### `FormPinInput`
PIN/OTP code entry.
```tsx
<FormPinInput name="otp" label="Verification Code" length={6} type="numeric" mask />
```
| Extra Prop | Type | Description |
|------------|------|-------------|
| `length` | `number` | Number of digits |
| `mask` | `boolean` | Mask input (like password) |
| `type` | `'alphanumeric' \| 'numeric'` | Input character type |

---

## React Query Integration

### Setup

Wrap your app (or form section) with `FormQueryProvider`:

```tsx
import { FormQueryProvider } from '@blacksmith-ui/forms';

function App() {
  return (
    <FormQueryProvider>
      {/* Components using useFormQuery/useFormMutation */}
    </FormQueryProvider>
  );
}

// Or bring your own QueryClient:
import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

<FormQueryProvider client={queryClient}>
  {children}
</FormQueryProvider>
```

Default QueryClient config: `staleTime: 5 minutes`, `retry: 1`.

### `useFormMutation`

Wrapper around TanStack `useMutation`. Use for form submission with server-side operations.

```tsx
import { useFormMutation } from '@blacksmith-ui/forms';

const mutation = useFormMutation({
  mutationFn: async (data: FormData) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },
  onSuccess: (data) => {
    // Handle success (redirect, toast, etc.)
  },
});

// Connect to Form:
<Form schema={schema} onSubmit={mutation.mutate} mutation={mutation}>
  <FormInput name="email" label="Email" />
  <Button type="submit" disabled={mutation.isPending}>
    {mutation.isPending ? 'Saving...' : 'Save'}
  </Button>
</Form>
```

The `mutation` prop on `<Form>` automatically displays `mutation.error.message` as an alert.

### `useFormQuery`

Wrapper around TanStack `useQuery`. Use for pre-populating form with server data.

```tsx
import { useFormQuery } from '@blacksmith-ui/forms';

const query = useFormQuery({
  queryKey: ['user', userId],
  queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json()),
});

// query.defaultValues is an alias for query.data — convenient for Form:
<Form schema={schema} onSubmit={handleSubmit} defaultValues={query.defaultValues}>
  {/* Fields pre-populated with fetched data */}
</Form>
```

Returns: Standard `UseQueryResult` + `{ defaultValues: TData | undefined }`

---

## Validation Patterns

### Schema Examples

```tsx
import { z } from 'zod';

// Basic fields
const schema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+'),
  website: z.string().url('Invalid URL').optional(),
});

// Password confirmation
const schema = z.object({
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Conditional validation
const schema = z.object({
  hasCompany: z.boolean(),
  companyName: z.string().optional(),
}).refine(data => !data.hasCompany || data.companyName, {
  message: 'Company name is required',
  path: ['companyName'],
});
```

### Error Display

- **Zod field errors** → Automatically shown below each field as `<FormMessage>` (a `<p>` element)
- **Server/mutation errors** → Shown as `<Alert variant="destructive">` below the form when `mutation.error` is set
- Field errors appear on blur by default (configurable via `mode` prop)

---

## Complete Example with Mutation

```tsx
import { z } from 'zod';
import { Form, FormInput, FormTextarea, FormSelect, FormSwitch, useFormMutation, FormQueryProvider } from '@blacksmith-ui/forms';
import { Button } from '@blacksmith-ui/react';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(10, 'Body must be at least 10 characters'),
  category: z.string().min(1, 'Select a category'),
  published: z.boolean(),
});

function CreatePostForm() {
  const mutation = useFormMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const res = await fetch('/api/posts', { method: 'POST', body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed to create post');
      return res.json();
    },
    onSuccess: () => { /* redirect or toast */ },
  });

  return (
    <Form
      schema={schema}
      onSubmit={mutation.mutate}
      mutation={mutation}
      defaultValues={{ title: '', body: '', category: '', published: false }}
    >
      <FormInput name="title" label="Title" placeholder="Post title" />
      <FormTextarea name="body" label="Content" placeholder="Write your post..." rows={6} />
      <FormSelect
        name="category"
        label="Category"
        placeholder="Select category"
        options={[
          { value: 'tech', label: 'Technology' },
          { value: 'design', label: 'Design' },
        ]}
      />
      <FormSwitch name="published" label="Publish immediately" />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create Post'}
      </Button>
    </Form>
  );
}

// Wrap with provider at app level:
<FormQueryProvider>
  <CreatePostForm />
</FormQueryProvider>
```

---

## Testing Notes

1. **Form submission is async** — always use `waitFor()`:
   ```tsx
   await user.click(submitButton);
   await waitFor(() => {
     expect(onSubmit).toHaveBeenCalledWith({ name: 'John', email: 'john@test.com' });
   });
   ```

2. **Query fields by label** — all fields with `label` prop can be found:
   ```tsx
   const input = screen.getByLabelText('Email');
   await user.type(input, 'test@example.com');
   ```

3. **Zod validation errors** appear as plain text (not alerts):
   ```tsx
   await waitFor(() => {
     expect(screen.getByText('Invalid email address')).toBeInTheDocument();
   });
   ```

4. **Server/mutation errors** appear as alerts:
   ```tsx
   expect(screen.getByRole('alert')).toHaveTextContent('Server error message');
   ```

---

## FieldWrapper (Advanced)

For creating custom form fields, use `FieldWrapper` directly:

```tsx
import { FieldWrapper } from '@blacksmith-ui/forms';

function FormCustomField({ name, label, description }) {
  return (
    <FieldWrapper
      name={name}
      label={label}
      description={description}
      render={({ field }) => (
        <MyCustomInput value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
      )}
    />
  );
}
```

`FieldWrapper` renders: `FormItem > FormLabel + FormControl > {render} + FormDescription + FormMessage`
