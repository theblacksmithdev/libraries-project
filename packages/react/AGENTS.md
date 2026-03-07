# @blacksmith-ui/react — AI Reference

> 60+ accessible UI components built on Radix UI + Tailwind CSS with HSL CSS variable theming. Apple/Anthropic-inspired flat design.

## Installation

```bash
npm install @blacksmith-ui/react
# or
yarn add @blacksmith-ui/react
```

**Peer dependencies:**
- `react ^18.0.0 || ^19.0.0`
- `react-dom ^18.0.0 || ^19.0.0`
- `tailwindcss ^3.3.0`
- `lucide-react ^0.400.0`

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
    './node_modules/@blacksmith-ui/react/src/**/*.{ts,tsx}', // include library source
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
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

### 3. Theming (optional)

```tsx
import { ThemeProvider } from '@blacksmith-ui/react';

// Use a built-in preset: 'default' | 'blue' | 'green' | 'violet' | 'red' | 'neutral'
<ThemeProvider preset="blue" defaultMode="light">
  <App />
</ThemeProvider>

// Or supply a custom theme
<ThemeProvider
  theme={{
    colors: { primary: '220 70% 50%', background: '0 0% 100%' },
    darkColors: { primary: '220 70% 60%', background: '220 10% 10%' },
    radius: '0.5rem',
  }}
  defaultMode="system"
>
  <App />
</ThemeProvider>
```

Dark mode is toggled via `.dark` class on `<html>`. The ThemeProvider manages this automatically based on `defaultMode`.

---

## Import Pattern

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Alert } from '@blacksmith-ui/react';
```

All components are named exports from the package root.

---

## Component Reference

### Utility

#### `cn(...inputs: ClassValue[])`
Tailwind-aware className merging (clsx + tailwind-merge).
```tsx
import { cn } from '@blacksmith-ui/react';
<div className={cn('p-4 bg-red-500', isActive && 'bg-blue-500')} />
```

---

### Buttons & Actions

#### `Button`
```tsx
<Button variant="default" size="default" asChild={false}>Click me</Button>
```
| Prop | Values | Default |
|------|--------|---------|
| `variant` | `"default"` \| `"destructive"` \| `"outline"` \| `"secondary"` \| `"ghost"` \| `"link"` | `"default"` |
| `size` | `"default"` \| `"sm"` \| `"lg"` \| `"icon"` | `"default"` |
| `asChild` | `boolean` — render as child element (Radix Slot) | `false` |

Extends `React.ButtonHTMLAttributes<HTMLButtonElement>`. ForwardRef.

#### `Toggle` / `ToggleGroup`
Radix-based toggle button(s).

---

### Layout

#### `Box`
Polymorphic layout primitive. Accepts `StyleProps` for prop-based Tailwind class generation.
```tsx
<Box as="section" p="lg" bg="card" rounded="md" shadow="sm">
  Content
</Box>
```
| Prop | Description |
|------|-------------|
| `as` | Element type (default: `"div"`) |
| StyleProps | See StyleProps reference below |

#### `Flex`
Box with `display="flex"` pre-applied.
```tsx
<Flex direction="row" align="center" justify="between" gap="md">
  <span>Left</span>
  <span>Right</span>
</Flex>
```

#### `Grid`
CSS Grid layout primitive.

#### `Stack`
Vertical or horizontal stack with gap.

#### `Container`
Centered max-width container.

#### `Divider`
Horizontal or vertical divider line.

#### `AspectRatio`
Radix-based aspect ratio container.

#### `ScrollArea`
Radix-based custom scrollbar container.

#### `Resizable`
Resizable panel layout.

#### StyleProps Reference
These props are accepted by `Box`, `Flex`, `Grid`, `Stack`, `Text`:

| Category | Props | Token Values |
|----------|-------|-------------|
| Spacing | `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`, `gap` | `"0"` `"unit"` `"xs"` `"sm"` `"md"` `"lg"` `"xl"` `"2xl"` |
| Colors | `bg`, `color`, `borderColor` | `"background"` `"foreground"` `"primary"` `"secondary"` `"muted"` `"accent"` `"destructive"` `"card"` `"border"` `"input"` `"ring"` etc. |
| Layout | `display`, `position`, `overflow`, `w`, `h`, `maxW` | display: `"flex"` `"grid"` `"block"` `"hidden"` etc. |
| Flex | `direction`, `align`, `justify`, `wrap`, `grow`, `shrink` | direction: `"row"` `"col"` etc. align: `"start"` `"center"` `"end"` etc. |
| Visual | `shadow`, `rounded`, `borderWidth`, `opacity` | shadow: `"none"` `"sm"` `"md"` `"lg"` `"xl"` |
| Typography | `fontSize`, `fontWeight`, `fontFamily`, `textAlign` | fontSize: `"sm"` `"base"` `"lg"` `"xl"` `"2xl"` etc. |

---

### Typography

#### `Text`
Typography primitive with variant presets.
```tsx
<Text variant="body">Regular text</Text>
<Text variant="caption" color="muted-foreground">Small muted text</Text>
<Text as="h1" fontSize="3xl" fontWeight="bold">Heading</Text>
```
| Prop | Values | Default |
|------|--------|---------|
| `variant` | `"body"` \| `"label"` \| `"caption"` \| `"overline"` | `"body"` |
| `as` | Any element type | `"p"` |
| StyleProps | All style props | — |

#### `Label`
Form label (Radix). Styled with `text-sm font-medium`.

---

### Inputs & Controls

#### `Input`
```tsx
<Input type="email" placeholder="you@example.com" disabled={false} />
```
Standard HTML input with Tailwind styling. ForwardRef. Extends `React.ComponentProps<"input">`.

#### `SearchInput`
Input with search icon, clear button, optional loading state.

#### `Textarea`
Multi-line text input.

#### `Select` (Radix)
```tsx
<Select>
  <SelectTrigger><SelectValue placeholder="Choose..." /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```
Exports: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`

#### `Checkbox` (Radix)
```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
  <Label htmlFor="terms">Accept terms</Label>
</div>
```

#### `Switch` (Radix)
```tsx
<div className="flex items-center gap-2">
  <Switch checked={enabled} onCheckedChange={setEnabled} />
  <Label>Enable notifications</Label>
</div>
```

#### `RadioGroup` (Radix)
```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="a" />
    <Label htmlFor="a">Option A</Label>
  </div>
</RadioGroup>
```

#### `Slider` / `RangeSlider`
Numeric slider controls.

#### `DatePicker`
Date selection component.

#### `NumberInput`
Numeric input with increment/decrement.

#### `PinInput` / `InputOTP`
PIN/OTP code entry.

#### `ColorPicker`
Color selection with optional swatches.

#### `FileUpload`
File drop zone / file input.

#### `TagInput`
Tag/chip input with add/remove.

#### `Rating`
Star rating input.

---

### Data Display

#### `Card`
```tsx
<Card variant="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Body content</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```
| Prop | Values | Default |
|------|--------|---------|
| `variant` | `"default"` \| `"elevated"` \| `"outlined"` \| `"ghost"` \| `"filled"` | `"default"` |

Exports: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

#### `Badge`
```tsx
<Badge variant="default">New</Badge>
```
Variants: `"default"` | `"secondary"` | `"destructive"` | `"outline"`

#### `Table`
HTML table with Tailwind styling.
Exports: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`

#### `DataTable`
Data table with sorting, filtering, pagination.

#### `Accordion` (Radix)
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### `Tabs` (Radix)
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Other Data Display
`Calendar`, `Chart`, `StatCard`, `Timeline`, `Tree`, `List`, `Pagination`, `Progress`, `Skeleton`, `Spinner`, `EmptyState`

#### `Spinner`
```tsx
<Spinner size="md" variant="spinner" label="Loading..." />
```
| Prop | Values | Default |
|------|--------|---------|
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` |
| `variant` | `"spinner"` \| `"dots"` \| `"bars"` | `"spinner"` |
| `label` | `string` (sr-only accessible label) | — |

---

### Overlays & Navigation

#### `Dialog` (Radix)
```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Description text</DialogDescription>
    </DialogHeader>
    <p>Content here</p>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
Exports: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogPortal`, `DialogOverlay`

#### `AlertDialog` (Radix)
Confirmation dialog. Similar API to Dialog but requires explicit confirm/cancel.

#### `Drawer` / `Sheet`
Slide-in panel from edge.

#### `Popover` (Radix)
```tsx
<Popover>
  <PopoverTrigger asChild><Button>Info</Button></PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>
```

#### `Tooltip` (Radix)
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### `HoverCard` (Radix)
Rich content on hover.

#### `DropdownMenu` (Radix)
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Menu</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### `ContextMenu` (Radix)
Right-click context menu. Same sub-component pattern as DropdownMenu.

#### `CommandPalette`
Command/search palette (Cmd+K style).

#### `NavigationMenu` (Radix)
Top-level navigation with dropdowns.

#### `Menubar` (Radix)
Desktop-style menu bar.

#### `Breadcrumb`
Breadcrumb navigation.

#### `Sidebar`
Collapsible sidebar navigation.

#### `Dock`
macOS-style dock component.

---

### Feedback

#### `Alert`
```tsx
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```
| Prop | Values | Default |
|------|--------|---------|
| `variant` | `"default"` \| `"destructive"` \| `"success"` \| `"warning"` \| `"info"` | `"default"` |

Has `role="alert"` by default. Exports: `Alert`, `AlertTitle`, `AlertDescription`

#### `AlertBanner`
Full-width dismissible alert banner.

#### `Toast` / `useToast`
Programmatic toast notifications.
```tsx
import { useToast } from '@blacksmith-ui/react';
const { toast } = useToast();
toast({ title: 'Saved!', description: 'Changes saved.', variant: 'default' });
```

#### `SonnerToaster`
Alternative toast system using Sonner.

---

### Media

`Image`, `VideoPlayer`, `CodeBlock`, `Carousel`, `Lightbox`

---

### Specialized

`Stepper`/`Wizard`, `NotificationCenter`, `SpotlightTour`, `BackToTop`

---

### Form Primitives

These are low-level form building blocks used by `@blacksmith-ui/forms`. You typically don't need these directly if using the forms package.

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@blacksmith-ui/react';
```

Usage pattern:
```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="you@example.com" {...field} />
      </FormControl>
      <FormDescription>Your account email</FormDescription>
      <FormMessage /> {/* Auto-displays validation errors */}
    </FormItem>
  )}
/>
```

---

## Hooks

#### `useToast()`
Programmatic toast notification management.

#### `useDarkMode()`
Dark mode toggle built on `useThemeConfig`. Requires `ThemeProvider` ancestor.
```tsx
const { isDark, toggle, enable, disable } = useDarkMode();
```
Returns: `{ isDark: boolean, toggle: () => void, enable: () => void, disable: () => void }`

- `isDark` — `true` when resolved theme mode is `'dark'`
- `toggle()` — switches between `'light'` and `'dark'`
- `enable()` — sets mode to `'dark'`
- `disable()` — sets mode to `'light'`

Persisted via ThemeProvider's `storageKey` (default: `'blacksmith-ui-theme-mode'`).

#### `useMobile()`
Returns `true` when viewport width is below mobile breakpoint.

#### `useNotificationCenter()`
Notification state management for NotificationCenter component.

#### `useThemeConfig()`
Access current theme config from ThemeProvider context.
```tsx
const { mode, setMode, resolvedMode, theme } = useThemeConfig();
```

---

## Accessibility

All interactive components use Radix UI primitives which provide:
- ARIA attributes (`role`, `aria-*`)
- Keyboard navigation (Arrow keys, Enter, Escape, Tab)
- Focus management and trapping
- Screen reader announcements

---

## Dark Mode

Toggle via `.dark` class on `<html>`:
```tsx
document.documentElement.classList.toggle('dark');
```
Or use `ThemeProvider` with `defaultMode="system"` for automatic management.

All components automatically adapt to dark mode via CSS variables.

---

## Important Notes

1. **Always include library source in Tailwind `content`** — otherwise component styles won't be generated:
   ```js
   content: ['./node_modules/@blacksmith-ui/react/src/**/*.{ts,tsx}']
   ```

2. **CSS variables use HSL values without `hsl()` wrapper** — the Tailwind config wraps them:
   ```css
   --primary: 220 70% 50%;  /* NOT hsl(220, 70%, 50%) */
   ```

3. **`asChild` prop** on Button, DialogTrigger, etc. — renders as the child element instead of the default, forwarding all props. Useful for wrapping links:
   ```tsx
   <Button asChild><a href="/page">Link styled as button</a></Button>
   ```

4. **ForwardRef** — Most components forward refs. Use `ref` prop for direct DOM access.

5. **Type declaration caveat** — `.d.ts` files use `@/` path aliases that may not resolve in consuming projects. If you get type errors for Box, Flex, or Text, use plain `<div className="flex ...">` instead.
