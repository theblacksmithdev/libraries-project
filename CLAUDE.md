# FlatUI Component Library

Yarn workspaces monorepo with 3 packages. **Requires Node >= 20** (use `nvm use` — `.nvmrc` is set to 20).

## Package Dependency Graph

```
@flatui/react  (core primitives, no internal deps)
    ↑
@flatui/forms  (depends on @flatui/react)
    ↑
@flatui/auth-ui (depends on @flatui/react + @flatui/forms)
```

Build order must follow this graph: `flatui → forms → auth-ui`.

## Packages

| Package | Path | Port | Description |
|---------|------|------|-------------|
| `@flatui/react` | `packages/flatui` | 6006 | Core UI primitives (Button, Card, Alert, Input, etc.) built on Radix UI + Tailwind |
| `@flatui/forms` | `packages/forms` | 6008 | Form components (Form, FormInput, etc.) with react-hook-form + Zod validation |
| `@flatui/auth-ui` | `packages/auth-ui` | 6007 | Auth flows (Login, Register, Forgot/Reset Password) built on forms + react primitives |

## Common Commands

```bash
# Build all (dependency order)
yarn build:all

# Test all
yarn test:all

# Single package
yarn workspace @flatui/react build
yarn workspace @flatui/react test
yarn workspace @flatui/forms build
yarn workspace @flatui/forms test
yarn workspace @flatui/auth-ui build
yarn workspace @flatui/auth-ui test

# Storybook
yarn workspace @flatui/react storybook      # port 6006
yarn workspace @flatui/forms storybook      # port 6008
yarn workspace @flatui/auth-ui storybook    # port 6007
```

## Build Pipeline (per package)

Each package uses: `rollup -c rollup.config.mjs && tsc --project tsconfig.build.json --emitDeclarationOnly`

- **Rollup**: bundles to ESM + CJS with preserveModules, terser minification
- **TypeScript**: emits `.d.ts` files only (rollup handles JS)
- **Path alias**: `@/` → `./src/` (configured in tsconfig.json + rollup alias plugin)

## Testing

- **Framework**: Vitest with jsdom environment
- **Libraries**: @testing-library/react + @testing-library/user-event
- **Coverage**: v8 provider, 80% thresholds
- **Globals**: `vi`, `describe`, `it`, `expect` are globally available (no imports needed)

## Key Architecture Decisions

- **Styling**: Tailwind CSS with HSL CSS variables for theming (defined in each package's `globals.css`)
- **Dark mode**: `darkMode: ['class']` — toggled via `.dark` class on `document.documentElement`
- **Component primitives**: Radix UI headless components wrapped with Tailwind styling
- **Form state**: react-hook-form with Zod schema validation via `@hookform/resolvers`

## Known Gotchas

1. **Node version**: Must use Node >= 20. Node 16 fails with `crypto.getRandomValues is not a function`. Run `nvm use` before any command.

2. **Tailwind content paths**: Downstream packages must include upstream package source in their Tailwind `content` array, otherwise classes used by imported components won't be generated. Example: auth-ui's config includes `../flatui/src/**/*.{ts,tsx}` and `../forms/src/**/*.{ts,tsx}`.

3. **`@flatui/react` type declarations use `@/` path aliases** in `.d.ts` files. This causes type errors when consuming packages try to resolve `Box`, `Flex`, `Text` (whose types depend on `@/lib/style-props` or `@/components/ui/box`). Workaround: use plain `<div className="flex ...">` instead of `<Flex>` in downstream packages.

4. **Form submission in tests is async**: When using `<Form>` from `@flatui/forms`, wrap `onSubmit` assertions in `waitFor()` because react-hook-form validation is asynchronous.

5. **Zod validation errors render as `<FormMessage>`** (a `<p>` element), not as `<Alert role="alert">`. In tests, use `findByText()` for Zod field errors, `getByRole('alert')` for external error props displayed via `<Alert>`.

6. **`clsx` and `tailwind-merge` show as "Unresolved dependencies" warnings** during auth-ui rollup build — this is expected and harmless (they're bundled dependencies).
