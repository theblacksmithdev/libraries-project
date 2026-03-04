import * as React from 'react'
import type { ThemeMode, ThemeProviderProps, ThemeContextValue } from '../../../lib/theme-types'
import { buildCssVariables } from '../../../lib/theme-defaults'
import { ThemeContext } from '../../../hooks/use-theme-config'

const STORAGE_KEY_DEFAULT = 'flatui-theme-mode'

function getSystemMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialMode(storageKey: string, defaultMode: ThemeMode): ThemeMode {
  if (typeof window === 'undefined') return defaultMode
  const stored = localStorage.getItem(storageKey)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return defaultMode
}

export function ThemeProvider({
  theme = {},
  defaultMode = 'system',
  storageKey = STORAGE_KEY_DEFAULT,
  children,
}: ThemeProviderProps) {
  const [mode, setModeState] = React.useState<ThemeMode>(() =>
    getInitialMode(storageKey, defaultMode)
  )
  const [systemMode, setSystemMode] = React.useState<'light' | 'dark'>(getSystemMode)

  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemMode(e.matches ? 'dark' : 'light')
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const resolvedMode: 'light' | 'dark' = mode === 'system' ? systemMode : mode

  const setMode = React.useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode)
      localStorage.setItem(storageKey, newMode)
    },
    [storageKey]
  )

  const cssVariables = React.useMemo(
    () => buildCssVariables(theme, resolvedMode),
    [theme, resolvedMode]
  )

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({ mode, setMode, resolvedMode, theme }),
    [mode, setMode, resolvedMode, theme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={resolvedMode === 'dark' ? 'dark' : undefined}
        style={cssVariables}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
