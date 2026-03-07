import { useCallback } from 'react'
import { useThemeConfig } from './use-theme-config'

export function useDarkMode() {
  const { resolvedMode, setMode } = useThemeConfig()

  const isDark = resolvedMode === 'dark'

  const toggle = useCallback(() => {
    setMode(isDark ? 'light' : 'dark')
  }, [isDark, setMode])

  const enable = useCallback(() => setMode('dark'), [setMode])
  const disable = useCallback(() => setMode('light'), [setMode])

  return { isDark, toggle, enable, disable }
}
