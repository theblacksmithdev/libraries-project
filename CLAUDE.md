# BlacksmithUI Component Library

Yarn workspaces monorepo with 3 packages. **Requires Node >= 20** (use `nvm use` — `.nvmrc` is set to 20).

## Package Dependency Graph

```
@blacksmith-ui/react  (core primitives, no internal deps)
    ↑
@blacksmith-ui/forms  (depends on @blacksmith-ui/react)
    ↑
@blacksmith-ui/auth (depends on @blacksmith-ui/react + @blacksmith-ui/forms)
```

Build order must follow this graph: `react → forms → auth`.

## Packages

| Package | Path | Port | Description |
|---------|------|------|-------------|
| `@blacksmith-ui/react` | `packages/react` | 6006 | Core UI primitives (Button, Card, Alert, Input, etc.) built on Radix UI + Tailwind |
| `@blacksmith-ui/forms` | `packages/forms` | 6008 | Form components (Form, FormInput, etc.) with react-hook-form + Zod validation |
| `@blacksmith-ui/auth` | `packages/auth-ui` | 6007 | Auth flows (Login, Register, Forgot/Reset Password) built on forms + react primitives |

## Common Commands

```bash
# Build all (dependency order)
yarn build:all

# Test all
yarn test:all

# Single package
yarn workspace @blacksmith-ui/react build
yarn workspace @blacksmith-ui/react test
yarn workspace @blacksmith-ui/forms build
yarn workspace @blacksmith-ui/forms test
yarn workspace @blacksmith-ui/auth build
yarn workspace @blacksmith-ui/auth test

# Storybook
yarn workspace @blacksmith-ui/react storybook      # port 6006
yarn workspace @blacksmith-ui/forms storybook      # port 6008
yarn workspace @blacksmith-ui/auth storybook    # port 6007
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

2. **Tailwind content paths**: Downstream packages must include upstream package source in their Tailwind `content` array, otherwise classes used by imported components won't be generated. Example: auth-ui's config includes `../react/src/**/*.{ts,tsx}` and `../forms/src/**/*.{ts,tsx}`.

3. **`@blacksmith-ui/react` type declarations use `@/` path aliases** in `.d.ts` files. This causes type errors when consuming packages try to resolve `Box`, `Flex`, `Text` (whose types depend on `@/lib/style-props` or `@/components/ui/box`). Workaround: use plain `<div className="flex ...">` instead of `<Flex>` in downstream packages.

4. **Form submission in tests is async**: When using `<Form>` from `@blacksmith-ui/forms`, wrap `onSubmit` assertions in `waitFor()` because react-hook-form validation is asynchronous.

5. **Zod validation errors render as `<FormMessage>`** (a `<p>` element), not as `<Alert role="alert">`. In tests, use `findByText()` for Zod field errors, `getByRole('alert')` for external error props displayed via `<Alert>`.

6. **`clsx` and `tailwind-merge` show as "Unresolved dependencies" warnings** during auth-ui rollup build — this is expected and harmless (they're bundled dependencies).
