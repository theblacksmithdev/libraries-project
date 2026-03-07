# @blacksmith-ui/react

Core UI component library for [BlacksmithUI](https://github.com/oluwatobimaxwell/libraries-project) — 60+ accessible React components with Apple/Anthropic-inspired flat design, powered by Tailwind CSS and Radix UI.

> **Part of the [blacksmith-cli](https://github.com/oluwatobimaxwell/blacksmith-cli) ecosystem.** This library powers the default UI for blacksmith-cli scaffolded projects, but is fully standalone and can be used in any React application.

[![npm version](https://img.shields.io/npm/v/@blacksmith-ui/react)](https://www.npmjs.com/package/@blacksmith-ui/react)
[![license](https://img.shields.io/npm/l/@blacksmith-ui/react)](./LICENSE)

## Features

- **60+ components** — Layout, typography, inputs, data display, overlays, feedback, media, and more
- **Accessible by default** — Built on [Radix UI](https://www.radix-ui.com/) headless primitives with full keyboard navigation and ARIA support
- **Tailwind CSS theming** — HSL CSS variables with 6 built-in presets and dark mode support
- **TypeScript-first** — Full type definitions with exported prop types for every component
- **Dual module format** — Ships both ESM and CJS with source maps
- **Tree-shakable** — `preserveModules` build ensures you only bundle what you use
- **Variant system** — Powered by [class-variance-authority](https://cva.style/) (cva)

## Installation

```bash
npm install @blacksmith-ui/react
# or
yarn add @blacksmith-ui/react
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss lucide-react
```

| Peer Dependency | Version |
|-----------------|---------|
| `react` | `^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `tailwindcss` | `^3.3.0` |
| `lucide-react` | `^0.400.0` |

## Setup

### 1. Import the stylesheet

Add the BlacksmithUI CSS to your app's entry point:

```tsx
import '@blacksmith-ui/react/styles.css';
```

### 2. Configure Tailwind

Add BlacksmithUI to your Tailwind `content` array and extend the theme with CSS variable colors:

```js
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@blacksmith-ui/react/dist/**/*.{js,mjs}',
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

### 3. Use components

```tsx
import { Button, Card, Input } from '@blacksmith-ui/react';

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

## Components

### Layout

| Component | Description |
|-----------|-------------|
| `Box` | Base layout primitive with style props |
| `Flex` | Flexbox container with style props |
| `Grid` | CSS Grid container |
| `Stack` | Vertical/horizontal stack layout |
| `Container` | Max-width centered container |
| `Divider` | Visual separator |
| `AspectRatio` | Maintain aspect ratio for content |
| `Resizable` | Resizable panel groups |
| `ScrollArea` | Custom scrollbar container |

### Typography

| Component | Description |
|-----------|-------------|
| `Text` | Text display with style props |
| `Typography` | Semantic heading/paragraph elements |
| `Label` | Form label with accessibility support |

### Input & Controls

| Component | Description |
|-----------|-------------|
| `Input` | Text input field |
| `SearchInput` | Search-specific input with icon |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown select menu |
| `Checkbox` | Check/uncheck toggle |
| `Switch` | On/off toggle switch |
| `RadioGroup` | Radio button group |
| `Slider` | Range slider |
| `RangeSlider` | Dual-handle range selector |
| `DatePicker` | Date selection with calendar popup |
| `NumberInput` | Numeric input with increment/decrement |
| `PinInput` / `InputOTP` | PIN/OTP code entry |
| `ColorPicker` | Color selection |
| `FileUpload` | File upload with drag & drop |
| `TagInput` | Tag/chip input with add/remove |
| `Rating` | Star/icon rating selector |

### Data Display

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

### Overlay & Navigation

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

### Feedback

| Component | Description |
|-----------|-------------|
| `Alert` | Inline alert message |
| `AlertBanner` | Full-width alert banner |
| `Toast` / `Toaster` | Temporary notification toast |
| `SonnerToaster` | Sonner-based toast notifications |

### Media

| Component | Description |
|-----------|-------------|
| `Image` | Optimized image display |
| `VideoPlayer` | Video playback |
| `CodeBlock` | Syntax-highlighted code (via Shiki) |
| `Carousel` | Image/content carousel |
| `Lightbox` | Full-screen media viewer |

### Specialized

| Component | Description |
|-----------|-------------|
| `Stepper` / `Wizard` | Multi-step workflow |
| `NotificationCenter` | Notification management panel |
| `SpotlightTour` | Guided feature tour |
| `BackToTop` | Scroll-to-top button |
| `Toggle` / `ToggleGroup` | Toggle buttons |

### Utilities & Hooks

| Export | Description |
|--------|-------------|
| `cn()` | Merge class names (clsx + tailwind-merge) |
| `useToast()` | Programmatic toast notifications |
| `useMobile()` | Responsive breakpoint detection |
| `useNotificationCenter()` | Notification state management |

## Theming

BlacksmithUI uses HSL CSS variables for theming. Wrap your app with `ThemeProvider` to apply a preset or custom theme:

```tsx
import { ThemeProvider } from '@blacksmith-ui/react';

function App() {
  return (
    <ThemeProvider preset="blue" mode="light">
      {/* All components use the blue theme */}
    </ThemeProvider>
  );
}
```

### Built-in Presets

| Preset | Description |
|--------|-------------|
| `default` | Warm earth tones with orange primary |
| `blue` | Classic blue primary |
| `green` | Natural green primary |
| `violet` | Rich purple primary |
| `red` | Bold red primary |
| `neutral` | Monochrome grayscale with sharp corners |

### Custom Theme

Override CSS variables directly or pass a custom config to `ThemeProvider`:

```css
:root {
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  /* ... */
  --radius: 0.5rem;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Dark Mode

Dark mode is toggled via the `.dark` class on the root element:

```ts
// Toggle programmatically
document.documentElement.classList.toggle('dark');
```

Or use `ThemeProvider` with `mode="dark"`:

```tsx
<ThemeProvider mode="dark">
  {/* Dark mode active */}
</ThemeProvider>
```

## Development

### Prerequisites

- **Node.js >= 20** (use `nvm use`)
- **Yarn 1.x** (Classic)

### Commands

```bash
# Build
yarn workspace @blacksmith-ui/react build

# Test
yarn workspace @blacksmith-ui/react test

# Test with coverage
yarn workspace @blacksmith-ui/react test:coverage

# Watch mode
yarn workspace @blacksmith-ui/react test:watch

# Storybook (port 6006)
yarn workspace @blacksmith-ui/react storybook

# Lint
yarn workspace @blacksmith-ui/react lint
```

### Project Structure

```
src/
├── components/ui/       # All UI components
├── hooks/               # Custom hooks (useToast, useMobile, etc.)
├── lib/
│   ├── utils.ts         # cn() helper (clsx + tailwind-merge)
│   ├── style-props.ts   # StyleProps type + splitStyleProps for Box/Flex/Text
│   ├── presets.ts        # Built-in theme presets
│   └── theme-types.ts   # Theme type definitions
├── styles/globals.css   # CSS variables + Tailwind directives
└── index.ts             # Public exports
```

### Build Output

```
dist/
├── esm/    # ES Modules (preserveModules)
├── cjs/    # CommonJS
└── types/  # TypeScript declarations
```

## Related Packages

| Package | Description |
|---------|-------------|
| [`@blacksmith-ui/forms`](../forms) | Smart form components with Zod validation + react-hook-form |
| [`@blacksmith-ui/auth`](../auth-ui) | Pre-built authentication flows (login, register, password reset) |

## License

[MIT](../../LICENSE)
