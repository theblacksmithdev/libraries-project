export type ThemeColors = Partial<{
  background: string
  foreground: string
  card: string
  'card-foreground': string
  popover: string
  'popover-foreground': string
  primary: string
  'primary-foreground': string
  secondary: string
  'secondary-foreground': string
  muted: string
  'muted-foreground': string
  accent: string
  'accent-foreground': string
  destructive: string
  'destructive-foreground': string
  border: string
  input: string
  ring: string
  'chart-1': string
  'chart-2': string
  'chart-3': string
  'chart-4': string
  'chart-5': string
  'sidebar-background': string
  'sidebar-foreground': string
  'sidebar-primary': string
  'sidebar-primary-foreground': string
  'sidebar-accent': string
  'sidebar-accent-foreground': string
  'sidebar-border': string
  'sidebar-ring': string
  radius: string
}>

export interface ThemeTypography {
  fontFamily?: string
  fontFamilyHeading?: string
  fontFamilyMono?: string
  fontSizeBase?: string
  fontSizeSm?: string
  fontSizeLg?: string
  fontSizeXl?: string
  fontSize2xl?: string
  fontSize3xl?: string
  fontSize4xl?: string
  lineHeight?: string
}

export interface ThemeSpacing {
  unit?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}

export interface ThemeShadows {
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export interface ThemeBorderWidths {
  DEFAULT?: string
  thick?: string
}

export interface ThemeConfig {
  colors?: ThemeColors
  darkColors?: ThemeColors
  radius?: string
  typography?: ThemeTypography
  spacing?: ThemeSpacing
  shadows?: ThemeShadows
  darkShadows?: ThemeShadows
  borderWidths?: ThemeBorderWidths
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeProviderProps {
  theme?: ThemeConfig
  defaultMode?: ThemeMode
  storageKey?: string
  children: React.ReactNode
}

export interface ThemeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  resolvedMode: 'light' | 'dark'
  theme: ThemeConfig
}
