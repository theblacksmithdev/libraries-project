import * as React from 'react'
import type { ThemeContextValue, ThemeConfig } from '../lib/theme-types'

const defaultContext: ThemeContextValue = {
  mode: 'system',
  setMode: () => {},
  resolvedMode: 'light',
  theme: {},
}

export const ThemeContext = React.createContext<ThemeContextValue>(defaultContext)

export function useThemeConfig(): ThemeContextValue {
  return React.useContext(ThemeContext)
}
