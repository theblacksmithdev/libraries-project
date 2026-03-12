import type { ThemeConfig } from './theme-types'
import { normalizeColor } from './color-utils'

const COLOR_KEYS = [
  'background', 'foreground', 'card', 'card-foreground', 'popover',
  'popover-foreground', 'primary', 'primary-foreground', 'secondary',
  'secondary-foreground', 'muted', 'muted-foreground', 'accent',
  'accent-foreground', 'destructive', 'destructive-foreground', 'border',
  'input', 'ring', 'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
  'sidebar-background', 'sidebar-foreground', 'sidebar-primary',
  'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground',
  'sidebar-border', 'sidebar-ring',
] as const

const TYPOGRAPHY_MAP: Record<string, string> = {
  fontFamily: '--font-family',
  fontFamilyHeading: '--font-family-heading',
  fontFamilyMono: '--font-family-mono',
}

export function buildCssVariables(
  theme: ThemeConfig | undefined,
  resolvedMode: 'light' | 'dark'
): Record<string, string> {
  if (!theme) return {}

  const vars: Record<string, string> = {}

  // Colors — merge darkColors over colors when in dark mode
  const baseColors = theme.colors ?? {}
  const darkColors = theme.darkColors ?? {}
  const colors = resolvedMode === 'dark'
    ? { ...baseColors, ...darkColors }
    : baseColors

  for (const key of COLOR_KEYS) {
    const value = colors[key]
    if (value !== undefined) {
      vars[`--${key}`] = normalizeColor(value)
    }
  }

  // Radius
  if (theme.radius !== undefined) {
    vars['--radius'] = theme.radius
  }

  // Typography (font families only — sizes use Tailwind defaults)
  if (theme.typography) {
    for (const [key, cssVar] of Object.entries(TYPOGRAPHY_MAP)) {
      const value = theme.typography[key as keyof typeof theme.typography]
      if (value !== undefined) {
        vars[cssVar] = value
      }
    }
  }

  return vars
}
