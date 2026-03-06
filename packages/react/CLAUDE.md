# @blacksmith-ui/react

Core UI component library. No internal package dependencies.

## Key Directories

```
src/
├── components/ui/       # All UI components (alert, box, button, card, flex, text, etc.)
├── lib/
│   ├── utils.ts         # cn() helper (clsx + tailwind-merge)
│   └── style-props.ts   # StyleProps type + splitStyleProps for Box/Flex/Text
├── styles/globals.css   # CSS variables + Tailwind directives
└── index.ts             # Public exports
```

## Commands

```bash
yarn workspace @blacksmith-ui/react build
yarn workspace @blacksmith-ui/react test
yarn workspace @blacksmith-ui/react storybook    # port 6006
```

## Component Patterns

- Components use `React.forwardRef` with `cn()` for className merging
- Variants via `class-variance-authority` (cva)
- Form primitives (`FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`) use react-hook-form's `Controller` + Radix Label
- Layout primitives (`Box`, `Flex`, `Text`) accept `StyleProps` for Tailwind class generation via props

## Theme System

- `ThemeProvider` wraps children in a `<div>` and applies CSS variables via inline styles + optional `dark` class
- CSS variables defined in `globals.css` under `:root` and `.dark`
- Colors use HSL format: `--background: 60 20% 95%` → consumed as `hsl(var(--background))`

## Exports

60+ components exported. Key categories:
- **Layout**: Box, Flex, Container, Grid, Stack, Divider
- **Typography**: Text, Label, Typography
- **Form**: FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage
- **Input**: Input, SearchInput, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, etc.
- **Feedback**: Alert, AlertBanner, Badge, Spinner, Progress, Toast
- **Overlay**: Dialog, Drawer, Popover, Tooltip
- **Data**: Card, Table, Accordion, Tabs
- **Theme**: ThemeProvider, useThemeConfig, presets
