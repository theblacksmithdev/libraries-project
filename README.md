# FlatUI

A modern React component library with Apple/Anthropic-inspired flat design, powered by Tailwind CSS and Radix UI.

Built as a Yarn workspaces monorepo with three composable packages — core primitives, smart forms, and authentication UI.

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@flatui/react`](./packages/flatui) | Core UI primitives — 60+ accessible components built on Radix UI | ![npm](https://img.shields.io/npm/v/@flatui/react) |
| [`@flatui/forms`](./packages/forms) | Smart form components with react-hook-form + Zod validation | ![npm](https://img.shields.io/npm/v/@flatui/forms) |
| [`@flatui/auth-ui`](./packages/auth-ui) | Pre-built authentication flows — login, register, forgot/reset password | ![npm](https://img.shields.io/npm/v/@flatui/auth-ui) |

### Dependency Graph

```
@flatui/react        (no internal deps)
    ^
    |
@flatui/forms        (peer dep: @flatui/react)
    ^
    |
@flatui/auth-ui      (peer dep: @flatui/react, dep: @flatui/forms)
```

## Features

- **60+ components** — From buttons and cards to data tables, charts, and command palettes
- **Accessible by default** — Built on Radix UI headless primitives with full keyboard navigation and ARIA support
- **Tailwind CSS theming** — HSL CSS variables for effortless customization and dark mode support
- **TypeScript-first** — Full type definitions with exported prop types for every component
- **Dual module format** — Ships both ESM and CJS with source maps
- **Form validation** — First-class Zod schema validation via react-hook-form
- **Auth-ready** — Drop-in login, register, and password reset forms with social login support
- **Tree-shakable** — `preserveModules` build ensures you only bundle what you use

## Quick Start

### Installation

```bash
# Core components (required)
npm install @flatui/react

# Form components (optional)
npm install @flatui/forms

# Auth components (optional)
npm install @flatui/auth-ui
```

#### Peer Dependencies

Each package requires these peer dependencies:

```bash
npm install react react-dom tailwindcss
```

`@flatui/react` also requires:
```bash
npm install lucide-react
```

### Setup

#### 1. Import the stylesheet

Import the FlatUI CSS in your app's entry point:

```tsx
import '@flatui/react/styles.css';
```

#### 2. Configure Tailwind

Add the FlatUI source files to your Tailwind `content` array so utility classes are generated:

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@flatui/react/dist/**/*.{js,mjs}',
    // If using @flatui/forms:
    './node_modules/@flatui/forms/dist/**/*.{js,mjs}',
    // If using @flatui/auth-ui:
    './node_modules/@flatui/auth-ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
};
```

#### 3. Use components

```tsx
import { Button, Card, Input, Alert } from '@flatui/react';

function App() {
  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Welcome</h2>
      <Input placeholder="Enter your name" className="mb-4" />
      <Button>Get Started</Button>
    </Card>
  );
}
```

## Component Reference

### @flatui/react

<details>
<summary><strong>Layout</strong></summary>

| Component | Description |
|-----------|-------------|
| `Box` | Base layout primitive with style props |
| `Flex` | Flexbox container |
| `Grid` | CSS Grid container |
| `Stack` | Vertical/horizontal stack layout |
| `Container` | Max-width centered container |
| `Divider` | Visual separator |
| `AspectRatio` | Maintain aspect ratio for content |
| `Resizable` | Resizable panel groups |
| `ScrollArea` | Custom scrollbar container |

</details>

<details>
<summary><strong>Typography</strong></summary>

| Component | Description |
|-----------|-------------|
| `Text` | Text display with style props |
| `Typography` | Semantic heading/paragraph elements |
| `Label` | Form label with accessibility support |

</details>

<details>
<summary><strong>Input & Controls</strong></summary>

| Component | Description |
|-----------|-------------|
| `Input` | Text input field |
| `SearchInput` | Search-specific input with icon |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown select menu |
| `Checkbox` | Check/uncheck toggle |
| `Switch` | On/off toggle switch |
| `RadioGroup` | Radio button group |
| `Slider` | Single-value range slider |
| `RangeSlider` | Dual-handle range selector |
| `DatePicker` | Date selection with calendar popup |
| `NumberInput` | Numeric input with increment/decrement |
| `PinInput` / `InputOTP` | PIN/OTP code entry |
| `ColorPicker` | Color selection |
| `FileUpload` | File upload with drag & drop |
| `TagInput` | Tag/chip input with add/remove |
| `Rating` | Star/icon rating selector |

</details>

<details>
<summary><strong>Data Display</strong></summary>

| Component | Description |
|-----------|-------------|
| `Card` | Content container with header/footer |
| `Table` | Data table |
| `DataTable` | Feature-rich data table with sorting/filtering |
| `Accordion` | Expandable/collapsible sections |
| `Tabs` | Tab-based content switching |
| `Badge` | Status/label badge |
| `Calendar` | Full calendar display |
| `Chart` | Data visualization (via Recharts) |
| `StatCard` | Metric/stat display card |
| `Timeline` | Chronological event display |
| `Tree` | Hierarchical tree view |
| `List` | Structured list display |
| `Pagination` | Page navigation controls |
| `Progress` | Progress bar |
| `Skeleton` | Loading placeholder |
| `Spinner` | Loading spinner |
| `EmptyState` | Empty content placeholder |

</details>

<details>
<summary><strong>Overlay & Navigation</strong></summary>

| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialog |
| `AlertDialog` | Confirmation dialog |
| `Drawer` / `Sheet` | Slide-out panel |
| `Popover` | Floating content panel |
| `Tooltip` | Hover tooltip |
| `HoverCard` | Rich hover content |
| `ContextMenu` | Right-click menu |
| `DropdownMenu` | Action dropdown |
| `CommandPalette` | Searchable command menu (cmdk) |
| `NavigationMenu` | Site navigation |
| `Menubar` | Application menu bar |
| `Breadcrumb` | Breadcrumb navigation |
| `Sidebar` | App sidebar |
| `Dock` | macOS-style dock |

</details>

<details>
<summary><strong>Feedback</strong></summary>

| Component | Description |
|-----------|-------------|
| `Alert` | Inline alert message |
| `AlertBanner` | Full-width alert banner |
| `Toast` / `Toaster` | Temporary notification toast |
| `SonnerToaster` | Sonner-based toast notifications |

</details>

<details>
<summary><strong>Media</strong></summary>

| Component | Description |
|-----------|-------------|
| `Image` | Optimized image display |
| `VideoPlayer` | Video playback |
| `CodeBlock` | Syntax-highlighted code (via Shiki) |
| `Carousel` | Image/content carousel |
| `Lightbox` | Full-screen media viewer |

</details>

<details>
<summary><strong>Specialized</strong></summary>

| Component | Description |
|-----------|-------------|
| `Stepper` / `Wizard` | Multi-step workflow |
| `NotificationCenter` | Notification management panel |
| `SpotlightTour` | Guided feature tour |
| `BackToTop` | Scroll-to-top button |
| `Toggle` / `ToggleGroup` | Toggle buttons |

</details>

<details>
<summary><strong>Utilities & Hooks</strong></summary>

| Export | Description |
|--------|-------------|
| `cn()` | Merge class names (clsx + tailwind-merge) |
| `ThemeProvider` | Theme context provider |
| `useToast()` | Programmatic toast notifications |
| `useMobile()` | Responsive breakpoint detection |
| `useNotificationCenter()` | Notification state management |
| `presets` | Pre-configured theme configurations |

</details>

### @flatui/forms

Extends `@flatui/react` with form-aware components powered by react-hook-form and Zod.

| Component | Description |
|-----------|-------------|
| `Form` | Form wrapper with Zod schema validation |
| `FieldWrapper` | Label + error message wrapper for any field |
| `FormInput` | Text input with validation |
| `FormTextarea` | Textarea with validation |
| `FormSearchInput` | Search input with validation |
| `FormSelect` | Select dropdown with validation |
| `FormCheckbox` | Checkbox with validation |
| `FormSwitch` | Switch toggle with validation |
| `FormRadioGroup` | Radio group with validation |
| `FormDatePicker` | Date picker with validation |
| `FormNumberInput` | Number input with validation |
| `FormSlider` | Slider with validation |
| `FormRangeSlider` | Range slider with validation |
| `FormRating` | Rating input with validation |
| `FormTagInput` | Tag input with validation |
| `FormColorPicker` | Color picker with validation |
| `FormFileUpload` | File upload with validation |
| `FormPinInput` | PIN input with validation |

**Hooks:**

| Hook | Description |
|------|-------------|
| `useFormMutation()` | TanStack React Query mutation for form submission |
| `useFormQuery()` | TanStack React Query integration for form data |
| `FormQueryProvider` | QueryClient context provider |

**Usage:**

```tsx
import { Form, FormInput, FormSelect } from '@flatui/forms';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Select a role'),
});

function CreateUserForm() {
  return (
    <Form schema={schema} onSubmit={(data) => console.log(data)}>
      <FormInput name="name" label="Full Name" placeholder="Jane Doe" />
      <FormSelect
        name="role"
        label="Role"
        options={[
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ]}
      />
      <button type="submit">Create User</button>
    </Form>
  );
}
```

### @flatui/auth-ui

Drop-in authentication UI with configurable providers and adapters.

| Component | Description |
|-----------|-------------|
| `LoginForm` | Email/password login |
| `RegisterForm` | User registration |
| `ForgotPasswordForm` | Password recovery request |
| `ResetPasswordForm` | Password reset with token |
| `SocialLoginButtons` | OAuth buttons (Google, GitHub, Facebook, Apple, Microsoft, Twitter) |
| `AuthLayout` | Card wrapper for auth forms |
| `AuthProvider` | Auth context with adapter pattern |

**Usage:**

```tsx
import {
  AuthProvider,
  LoginForm,
  createMockAdapter,
} from '@flatui/auth-ui';
import '@flatui/react/styles.css';

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

## Theming

FlatUI uses HSL CSS variables for theming. Override them in your own CSS to customize the look:

```css
:root {
  --background: 60 20% 95%;
  --foreground: 60 3% 8%;
  --primary: 18 62% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 45% 61%;
  --secondary-foreground: 0 0% 100%;
  --muted: 48 16% 89%;
  --muted-foreground: 48 5% 42%;
  --accent: 48 16% 89%;
  --destructive: 16 53% 50%;
  --border: 48 16% 89%;
  --ring: 18 62% 60%;
  --radius: 0.5rem;
}

.dark {
  --background: 48 6% 15%;
  --foreground: 48 16% 89%;
  --card: 48 5% 18%;
  --muted: 48 5% 25%;
  --border: 48 5% 25%;
}
```

### Dark Mode

Dark mode is toggled via the `.dark` class on `<html>`:

```tsx
import { ThemeProvider } from '@flatui/react';

function App() {
  return (
    <ThemeProvider>
      {/* Components automatically respond to dark mode */}
    </ThemeProvider>
  );
}
```

Toggle programmatically:

```ts
document.documentElement.classList.toggle('dark');
```

## Development

### Prerequisites

- **Node.js >= 20** (use `nvm use` — `.nvmrc` is included)
- **Yarn 1.x** (Classic)

### Getting Started

```bash
# Install dependencies
yarn install

# Build all packages (in dependency order)
yarn build:all

# Run all tests
yarn test:all
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `yarn build:all` | Build all packages (flatui -> forms -> auth-ui) |
| `yarn test:all` | Run all test suites |
| `yarn lint:all` | Lint all packages |
| `yarn storybook` | Start @flatui/react Storybook (port 6006) |
| `yarn storybook:forms` | Start @flatui/forms Storybook (port 6008) |
| `yarn storybook:auth-ui` | Start @flatui/auth-ui Storybook (port 6007) |

### Per-Package Commands

```bash
# Build a single package
yarn workspace @flatui/react build
yarn workspace @flatui/forms build
yarn workspace @flatui/auth-ui build

# Test a single package
yarn workspace @flatui/react test
yarn workspace @flatui/forms test
yarn workspace @flatui/auth-ui test

# Test with coverage
yarn workspace @flatui/react test:coverage
```

### Build Pipeline

Each package uses Rollup + TypeScript:

1. **Rollup** bundles source to ESM (`dist/esm/`) and CJS (`dist/cjs/`) with `preserveModules`, terser minification, and source maps
2. **TypeScript** emits declaration files to `dist/types/`

### Project Structure

```
libraries-project/
├── packages/
│   ├── flatui/          # @flatui/react — Core UI primitives
│   │   ├── src/
│   │   │   ├── components/ui/   # All component source
│   │   │   ├── hooks/           # Custom hooks
│   │   │   ├── lib/             # Utilities (cn, style-props)
│   │   │   ├── styles/          # globals.css with CSS variables
│   │   │   └── index.ts         # Public API
│   │   ├── rollup.config.mjs
│   │   └── tailwind.config.ts
│   ├── forms/           # @flatui/forms — Form components
│   │   ├── src/
│   │   │   ├── components/      # Form field components
│   │   │   ├── hooks/           # useFormMutation, useFormQuery
│   │   │   └── index.ts
│   │   └── rollup.config.mjs
│   └── auth-ui/         # @flatui/auth-ui — Auth flows
│       ├── src/
│       │   ├── components/      # Login, Register, etc.
│       │   ├── adapters/        # Auth adapters (mock, firebase)
│       │   ├── context/         # AuthProvider
│       │   └── index.ts
│       └── rollup.config.mjs
├── package.json         # Root workspace config
└── CLAUDE.md            # AI assistant instructions
```

### Testing

Tests use **Vitest** with **jsdom**, **@testing-library/react**, and **@testing-library/user-event**.

```bash
# Run all tests
yarn test:all

# Watch mode (single package)
yarn workspace @flatui/react test:watch

# Coverage report
yarn workspace @flatui/react test:coverage
```

Coverage thresholds are set at 80% for branches, functions, lines, and statements.

## Publishing

All packages are configured for npm publication with public access.

```bash
# Build all packages first
yarn build:all

# Verify package contents
cd packages/flatui && npm pack --dry-run

# Login to npm
npm login

# Publish in dependency order
yarn workspace @flatui/react publish --access public
yarn workspace @flatui/forms publish --access public
yarn workspace @flatui/auth-ui publish --access public
```

Each package has a `prepublishOnly` script that automatically runs the build before publishing.

## License

[MIT](./LICENSE)
