# FlatUI — Project Setup & Developer Guide

Complete setup guide for the FlatUI component library monorepo, including tooling, Claude Code integration, and AI-assisted development workflows.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Package Overview](#package-overview)
- [Build & Test Commands](#build--test-commands)
- [Storybook](#storybook)
- [Code Quality](#code-quality)
- [Claude Code Integration](#claude-code-integration)
  - [CLAUDE.md Files](#claudemd-files)
  - [Skills (Slash Commands)](#skills-slash-commands)
  - [Permissions](#permissions)
  - [Memory](#memory)
- [UI/UX Pro Max Skill](#uiux-pro-max-skill)
- [Development Workflows](#development-workflows)
- [Architecture Reference](#architecture-reference)
- [Known Gotchas](#known-gotchas)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Required Version | Check Command |
|------|-----------------|---------------|
| **Node.js** | >= 20 | `node -v` |
| **Yarn** | 1.22.x | `yarn -v` |
| **Python** | 3.x | `python3 --version` |
| **Git** | any | `git --version` |
| **nvm** | any | `nvm --version` |
| **Claude Code** | latest | `claude --version` |

### Node Version

This project **requires Node >= 20**. An `.nvmrc` file is set at the root.

```bash
nvm install 20
nvm use
```

> Node 16 will fail with `crypto.getRandomValues is not a function`. Always run `nvm use` when opening the project.

### Python

Python 3 is required for the UI/UX Pro Max design intelligence skill. No pip packages are needed — the skill uses only the Python standard library.

### Claude Code

Install Claude Code if not already set up:

```bash
npm install -g @anthropic-ai/claude-code
```

---

## Getting Started

```bash
# 1. Clone the repository
git clone <repo-url>
cd libraries-project

# 2. Switch to the correct Node version
nvm use

# 3. Install dependencies
yarn install --ignore-engines

# 4. Build all packages (dependency order)
yarn build:all

# 5. Run all tests
yarn test:all

# 6. Start Claude Code
claude
```

---

## Project Structure

```
libraries-project/
├── CLAUDE.md                    # Root AI context (loaded every session)
├── SETUP.md                     # This file
├── ABOUT.md                     # Design philosophy & roadmap
├── package.json                 # Workspace root with aggregate scripts
├── tsconfig.base.json           # Shared TypeScript config
├── .eslintrc.cjs                # Shared ESLint config
├── .prettierrc                  # Shared Prettier config
├── .nvmrc                       # Node version (20)
├── .claude/
│   ├── settings.local.json      # Claude Code permissions
│   └── skills/                  # Slash commands
│       ├── build/SKILL.md
│       ├── test/SKILL.md
│       ├── check/SKILL.md
│       ├── new-component/SKILL.md
│       ├── new-form-field/SKILL.md
│       ├── storybook/SKILL.md
│       └── ui-ux-pro-max/       # Design intelligence skill
│           ├── SKILL.md
│           ├── scripts/         # Python search engine
│           └── data/            # 12 CSV databases
└── packages/
    ├── flatui/                  # @flatui/react — core primitives
    │   ├── CLAUDE.md
    │   ├── src/components/ui/   # 60+ UI components
    │   └── ...
    ├── forms/                   # @flatui/forms — form components
    │   ├── CLAUDE.md
    │   ├── src/components/      # Form, FormInput, 14+ field types
    │   └── ...
    └── auth-ui/                 # @flatui/auth-ui — auth flows
        ├── CLAUDE.md
        ├── src/components/      # Login, Register, Forgot/Reset Password
        └── ...
```

---

## Package Overview

### Dependency Graph

```
@flatui/react       ← no internal dependencies (core)
     ↑
@flatui/forms        ← depends on @flatui/react
     ↑
@flatui/auth-ui      ← depends on @flatui/react + @flatui/forms
```

**Build order must follow this graph.** Always build upstream packages first.

### @flatui/react (Core)

| | |
|---|---|
| **Path** | `packages/flatui` |
| **Description** | UI primitives — Button, Card, Alert, Input, Dialog, Tabs, etc. |
| **Built on** | Radix UI + Tailwind CSS + class-variance-authority |
| **Exports** | 60+ components, ThemeProvider, presets |
| **Tests** | 514 across 83 test files |
| **Stories** | 50+ Storybook stories |

### @flatui/forms (Forms)

| | |
|---|---|
| **Path** | `packages/forms` |
| **Description** | Smart form components with Zod validation and React Query hooks |
| **Built on** | react-hook-form + @hookform/resolvers + Zod + @tanstack/react-query |
| **Exports** | Form, 17 field components (FormInput, FormSelect, FormCheckbox, etc.), hooks |
| **Tests** | 48 across 20 test files |

### @flatui/auth-ui (Auth)

| | |
|---|---|
| **Path** | `packages/auth-ui` |
| **Description** | Authentication flows — Login, Register, Forgot/Reset Password, Social Login |
| **Built on** | @flatui/react + @flatui/forms + Zod schemas |
| **Exports** | 5 auth components + types |
| **Tests** | 38 across 6 test files |

---

## Build & Test Commands

### Root-Level Scripts

| Command | What it does |
|---------|-------------|
| `yarn build:all` | Build all 3 packages in dependency order |
| `yarn test:all` | Run all tests across all 3 packages |
| `yarn lint:all` | Lint all 3 packages |

### Per-Package Scripts

| Command | Package |
|---------|---------|
| `yarn workspace @flatui/react build` | Build core |
| `yarn workspace @flatui/react test` | Test core |
| `yarn workspace @flatui/forms build` | Build forms |
| `yarn workspace @flatui/forms test` | Test forms |
| `yarn workspace @flatui/auth-ui build` | Build auth-ui |
| `yarn workspace @flatui/auth-ui test` | Test auth-ui |

### Build Pipeline (per package)

```bash
rollup -c rollup.config.mjs && tsc --project tsconfig.build.json --emitDeclarationOnly
```

1. **Rollup** bundles source to ESM (`dist/esm/`) + CJS (`dist/cjs/`) with tree-shaking, preserveModules, and terser minification
2. **TypeScript** emits type declarations (`dist/types/`) only — Rollup handles the JS

### Testing Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Test runner (jsdom environment) |
| **@testing-library/react** | Component rendering + queries |
| **@testing-library/user-event** | User interaction simulation |
| **@vitest/coverage-v8** | Code coverage (80% thresholds) |

Globals `vi`, `describe`, `it`, `expect` are available without imports.

---

## Storybook

Each package has its own Storybook instance on a dedicated port:

| Package | Port | Command |
|---------|------|---------|
| @flatui/react | 6006 | `yarn workspace @flatui/react storybook` |
| @flatui/auth-ui | 6007 | `yarn workspace @flatui/auth-ui storybook` |
| @flatui/forms | 6008 | `yarn workspace @flatui/forms storybook` |

All Storybook instances include:
- Auto-docs generation via `react-docgen-typescript`
- Light/dark theme toggle in toolbar
- Accessibility addon (`@storybook/addon-a11y`)
- Centered layout by default

---

## Code Quality

### ESLint

```javascript
// .eslintrc.cjs
{
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', '@typescript-eslint/recommended', 'react-hooks/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
  }
}
```

### Prettier

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### TypeScript

- Strict mode enabled globally via `tsconfig.base.json`
- `moduleResolution: "bundler"`, `target: "ESNext"`
- Path alias: `@/` → `./src/` in each package

---

## Claude Code Integration

This project is fully configured for AI-assisted development with Claude Code.

### CLAUDE.md Files

Claude Code reads these on every session start for project context.

| File | Scope | Contents |
|------|-------|---------|
| `CLAUDE.md` (root) | Whole project | Dependency graph, all commands, build pipeline, testing patterns, 6 documented gotchas |
| `packages/flatui/CLAUDE.md` | @flatui/react | Directory structure, component patterns, theme system, exports catalog |
| `packages/forms/CLAUDE.md` | @flatui/forms | Form API with code examples, FieldWrapper architecture, async testing pattern |
| `packages/auth-ui/CLAUDE.md` | @flatui/auth-ui | Component pattern, props convention, Tailwind content config, testing notes |

### Skills (Slash Commands)

7 custom skills available via `/command` syntax in Claude Code:

| Command | Description |
|---------|-------------|
| `/build [react\|forms\|auth-ui\|all]` | Build one or all packages in dependency order. Auto-fixes failures. |
| `/test [react\|forms\|auth-ui\|all]` | Run tests for one or all packages. Auto-fixes failures. |
| `/check [react\|forms\|auth-ui\|all]` | Full verification — tests then build, stops on first failure. |
| `/new-component ComponentName` | Scaffold a new component in `@flatui/react` with component + test + story + index + package export. |
| `/new-form-field FieldName` | Scaffold a new form field in `@flatui/forms` using the FieldWrapper pattern. |
| `/storybook [react\|forms\|auth-ui]` | Launch Storybook for a specific package. |
| `/ui-ux-pro-max` | Design intelligence — see [UI/UX Pro Max section](#uiux-pro-max-skill) below. |

### Permissions

Pre-configured in `.claude/settings.local.json`:

- **Bash**: `source`, `git init`, `node`, `npx shadcn@latest`, `yarn add`, `curl` are auto-allowed
- **Web Search**: enabled
- **Web Fetch**: allowed for design reference domains (shadcn, anthropic, github, cva.style, etc.)

### Memory

Claude Code maintains persistent memory across sessions at:

```
~/.claude/projects/-Users-...-libraries-project/memory/MEMORY.md
```

This stores learnings like the Node version requirement, Tailwind content path gotcha, type declaration issues, and testing patterns. It auto-builds over time.

---

## UI/UX Pro Max Skill

A comprehensive design intelligence system installed as a Claude Code skill. Contains 67 UI styles, 97 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 13 technology stacks.

### Usage in Claude Code

The skill activates automatically when you ask Claude Code to design, build, or review UI/UX work. You can also invoke it directly:

```
/ui-ux-pro-max
```

### Design System Generation

Generate a complete design system recommendation:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard analytics" --design-system -p "My Project"
```

This returns: recommended pattern, style, colors, typography, effects, anti-patterns, and a pre-delivery checklist.

### Domain Searches

Search specific design domains for detailed recommendations:

```bash
# Style recommendations
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "minimalism dark mode" --domain style

# Color palettes
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech professional" --domain color

# Typography / font pairings
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant modern" --domain typography

# UX guidelines
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# Landing page patterns
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "hero social-proof" --domain landing

# Chart types
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "trend comparison" --domain chart
```

### Stack-Specific Guidelines

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive forms" --stack html-tailwind
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "state performance" --stack react
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "component patterns" --stack shadcn
```

Available stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`, `nuxtjs`, `nuxt-ui`, `astro`

### Persist Design Systems

Save a design system for reuse across sessions:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "beauty spa" --design-system --persist -p "Serenity Spa"
```

Creates `design-system/MASTER.md` with global rules and `design-system/pages/` for page-specific overrides.

### Data Sources

The skill searches across 12 CSV databases:

| Database | Contents |
|----------|----------|
| `styles.csv` | 67 UI styles with colors, effects, compatibility scores |
| `colors.csv` | 97 palettes organized by product type and industry |
| `typography.csv` | 57 Google Font pairings with mood/personality tags |
| `products.csv` | Product type recommendations (SaaS, e-commerce, etc.) |
| `landing.csv` | Landing page patterns and CTA strategies |
| `charts.csv` | 25 chart types with library recommendations |
| `ux-guidelines.csv` | 99 UX rules prioritized by impact |
| `ui-reasoning.csv` | 100 reasoning rules for design system generation |
| `icons.csv` | Icon library recommendations |
| `react-performance.csv` | React-specific performance patterns |
| `web-interface.csv` | Web accessibility and interface guidelines |
| `stacks/` | 13 framework-specific CSV files |

---

## Development Workflows

### Adding a New Component to @flatui/react

```
/new-component Breadcrumb
```

Or manually:

1. Create `packages/flatui/src/components/ui/breadcrumb/`
2. Add `breadcrumb.tsx` (use `React.forwardRef` + `cn()` + `cva` for variants)
3. Add `breadcrumb.spec.tsx` (Vitest + Testing Library)
4. Add `breadcrumb.stories.tsx` (Storybook with controls)
5. Add `index.ts` re-export
6. Export from `packages/flatui/src/index.ts`
7. Run `/check react` to verify

### Adding a New Form Field to @flatui/forms

```
/new-form-field PhoneInput
```

Or manually:

1. Create `packages/forms/src/components/fields/form-phone-input/`
2. Add `form-phone-input.tsx` using `FieldWrapper` + `BaseFieldProps` pattern
3. Add test, story, index
4. Export from `packages/forms/src/index.ts`
5. Run `/check forms` to verify

### Adding a New Auth Flow to @flatui/auth-ui

1. Create component in `packages/auth-ui/src/components/`
2. Define Zod schema for form validation
3. Use `<Form schema={...} mode="onSubmit">` + `<FormInput>` from `@flatui/forms`
4. Use `<Alert variant="destructive">` for error display
5. Use `<Button variant="link">` for navigation links
6. Add labels to `types/auth.ts` `defaultLabels`
7. Write tests with `waitFor()` for submit assertions
8. Run `/check auth-ui` to verify

### Pre-Commit Verification

```
/check all
```

This runs all tests and builds across all 3 packages in dependency order.

---

## Architecture Reference

### Styling System

- **Engine**: Tailwind CSS 3.4 with `darkMode: ['class']`
- **Theming**: HSL CSS variables in `globals.css` (`:root` for light, `.dark` for dark)
- **Utility**: `cn()` helper (`clsx` + `tailwind-merge`) in each package's `lib/utils.ts`
- **Variants**: `class-variance-authority` (cva) for component variant APIs
- **Color format**: `--background: 60 20% 95%` → consumed as `hsl(var(--background))`

### Form Architecture

```
<Form schema={zodSchema} onSubmit={handler} mode="onSubmit">
  ├── FormProvider (react-hook-form context)
  └── <form className="space-y-4">
       ├── <FormInput name="email" label="Email">
       │    └── FieldWrapper
       │         ├── FormField (Controller)
       │         └── FormItem
       │              ├── FormLabel (htmlFor linked)
       │              ├── FormControl (Slot with id)
       │              │    └── <Input {...field} />
       │              └── FormMessage (Zod errors)
       └── <Button type="submit">
```

### Component Pattern

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const componentVariants = cva('base-classes', {
  variants: { variant: { default: '...', destructive: '...' } },
  defaultVariants: { variant: 'default' },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(componentVariants({ variant }), className)} {...props} />
  )
)
Component.displayName = 'Component'

export { Component }
```

### Tailwind Content Configuration

Downstream packages must include upstream source in their `content` array:

```typescript
// packages/auth-ui/tailwind.config.ts
content: [
  './src/**/*.{ts,tsx}',           // own source
  '../flatui/src/**/*.{ts,tsx}',   // @flatui/react source
  '../forms/src/**/*.{ts,tsx}',    // @flatui/forms source
]
```

Without this, Tailwind won't generate utility classes used by imported components.

---

## Known Gotchas

| # | Issue | Solution |
|---|-------|----------|
| 1 | **Node 16 crashes** with `crypto.getRandomValues` | Use Node >= 20 (`nvm use`) |
| 2 | **Tailwind classes missing** in downstream packages | Add upstream package paths to `content` array in `tailwind.config.ts` |
| 3 | **`Flex`/`Box`/`Text` type errors** in auth-ui/forms | `@flatui/react` `.d.ts` files use `@/` path aliases that don't resolve cross-package. Use `<div className="flex ...">` instead |
| 4 | **Form submit assertions flaky** | react-hook-form validation is async. Wrap `onSubmit` expectations in `waitFor()` |
| 5 | **Zod errors not found by `getByRole('alert')`** | Zod field errors render as `<FormMessage>` (`<p>` tag), not `<Alert>`. Use `findByText()` instead |
| 6 | **`clsx`/`tailwind-merge` rollup warnings** | "Unresolved dependencies" warnings during auth-ui build are harmless — these are bundled deps |
| 7 | **`yarn install` fails on engine check** | Run `yarn install --ignore-engines` if nvm hasn't switched yet |

---

## Troubleshooting

### "crypto.getRandomValues is not a function"

```bash
nvm use   # switches to Node 20 from .nvmrc
```

### Storybook styles broken / components unstyled

Check that the package's `tailwind.config.ts` includes content paths for all upstream packages. See [Tailwind Content Configuration](#tailwind-content-configuration).

### TypeScript errors on Flex/Box/Text children

Use plain `<div>` with Tailwind classes instead of `Flex`/`Box`/`Text` from `@flatui/react` in downstream packages. This is a known type declaration issue.

### Tests pass locally but build fails

Run in order: `yarn workspace @flatui/react build` first, since downstream packages depend on its compiled output for types.

### "Module not found: @flatui/forms"

Run `yarn install --ignore-engines` from root to link workspace packages.
