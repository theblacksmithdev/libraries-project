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
  fontSizeBase: '--font-size-base',
  fontSizeSm: '--font-size-sm',
  fontSizeLg: '--font-size-lg',
  fontSizeXl: '--font-size-xl',
  fontSize2xl: '--font-size-2xl',
  fontSize3xl: '--font-size-3xl',
  fontSize4xl: '--font-size-4xl',
  lineHeight: '--line-height',
}

const SPACING_MAP: Record<string, string> = {
  unit: '--spacing-unit',
  xs: '--spacing-xs',
  sm: '--spacing-sm',
  md: '--spacing-md',
  lg: '--spacing-lg',
  xl: '--spacing-xl',
  '2xl': '--spacing-2xl',
}

const SHADOW_MAP: Record<string, string> = {
  sm: '--shadow-sm',
  md: '--shadow-md',
  lg: '--shadow-lg',
  xl: '--shadow-xl',
}

const BORDER_WIDTH_MAP: Record<string, string> = {
  DEFAULT: '--border-width',
  thick: '--border-width-thick',
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

  // Typography
  if (theme.typography) {
    for (const [key, cssVar] of Object.entries(TYPOGRAPHY_MAP)) {
      const value = theme.typography[key as keyof typeof theme.typography]
      if (value !== undefined) {
        vars[cssVar] = value
      }
    }
  }

  // Spacing
  if (theme.spacing) {
    for (const [key, cssVar] of Object.entries(SPACING_MAP)) {
      const value = theme.spacing[key as keyof typeof theme.spacing]
      if (value !== undefined) {
        vars[cssVar] = value
      }
    }
  }

  // Shadows — merge darkShadows over shadows when in dark mode
  const baseShadows = theme.shadows ?? {}
  const darkShadows = theme.darkShadows ?? {}
  const shadows = resolvedMode === 'dark'
    ? { ...baseShadows, ...darkShadows }
    : baseShadows

  for (const [key, cssVar] of Object.entries(SHADOW_MAP)) {
    const value = shadows[key as keyof typeof shadows]
    if (value !== undefined) {
      vars[cssVar] = value
    }
  }

  // Border widths
  if (theme.borderWidths) {
    for (const [key, cssVar] of Object.entries(BORDER_WIDTH_MAP)) {
      const value = theme.borderWidths[key as keyof typeof theme.borderWidths]
      if (value !== undefined) {
        vars[cssVar] = value
      }
    }
  }

  return vars
}
