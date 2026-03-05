# @flatui/forms

Smart form components with Zod validation, react-hook-form integration, and React Query hooks. Depends on `@flatui/react`.

## Key Directories

```
src/
├── components/
│   ├── form/form.tsx           # <Form> wrapper (FormProvider + zodResolver)
│   └── fields/
│       ├── shared/
│       │   ├── types.ts        # BaseFieldProps (name, label, description, disabled, className)
│       │   └── field-wrapper.tsx # FieldWrapper (FormField + FormItem + FormLabel + FormControl + FormMessage)
│       ├── form-input/         # FormInput (text, email, password, etc.)
│       ├── form-textarea/      # FormTextarea
│       ├── form-select/        # FormSelect
│       ├── form-checkbox/      # FormCheckbox
│       ├── form-switch/        # FormSwitch
│       ├── form-radio-group/   # FormRadioGroup
│       └── ... (14 more field components)
├── hooks/
│   ├── use-form-mutation.ts    # TanStack React Query useMutation wrapper
│   └── use-form-query.ts       # TanStack React Query useQuery wrapper
├── providers/
│   └── form-query-provider.tsx  # QueryClient provider
├── lib/utils.ts
└── index.ts
```

## Commands

```bash
yarn workspace @flatui/forms build
yarn workspace @flatui/forms test
yarn workspace @flatui/forms storybook    # port 6008
```

## Form Component API

```tsx
<Form
  schema={zodSchema}           // Required: Zod schema for validation
  onSubmit={handleSubmit}      // Receives validated data
  mode="onSubmit"              // Validation trigger: 'onBlur' (default) | 'onSubmit' | 'onChange'
  defaultValues={{ ... }}      // Optional initial values
  mutation={{ error, isPending }} // Optional: displays mutation error below form
>
  <FormInput name="email" label="Email" type="email" placeholder="..." disabled={false} />
  <Button type="submit">Submit</Button>
</Form>
```

- `Form` renders `<form className="space-y-4">` with `FormProvider` context
- All field components use `useFormContext()` to access form state
- `FieldWrapper` renders: `FormItem > FormLabel > FormControl > FormMessage`
- `FormMessage` shows Zod validation errors automatically per field

## Testing Pattern

Form submission with react-hook-form is **async**. Always wrap onSubmit assertions in `waitFor()`:

```tsx
await user.click(submitButton)
await waitFor(() => {
  expect(onSubmit).toHaveBeenCalledWith({ email: '...' })
})
```

Field labels work with `getByLabelText()` — FormLabel uses `htmlFor` linked to FormControl's `id`.
