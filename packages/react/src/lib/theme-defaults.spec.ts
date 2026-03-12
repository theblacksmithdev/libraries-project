import { describe, it, expect } from 'vitest'
import { buildCssVariables } from './theme-defaults'
import type { ThemeConfig } from './theme-types'

describe('buildCssVariables', () => {
  it('returns empty object for undefined theme', () => {
    expect(buildCssVariables(undefined, 'light')).toEqual({})
  })

  it('returns empty object for empty theme', () => {
    expect(buildCssVariables({}, 'light')).toEqual({})
  })

  it('maps color keys to CSS variables', () => {
    const theme: ThemeConfig = {
      colors: {
        primary: '217 91% 60%',
        background: '210 40% 98%',
      },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--primary']).toBe('217 91% 60%')
    expect(vars['--background']).toBe('210 40% 98%')
  })

  it('converts hex colors to HSL', () => {
    const theme: ThemeConfig = {
      colors: {
        primary: '#3b82f6',
      },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--primary']).toBe('217 91% 60%')
  })

  it('uses darkColors in dark mode', () => {
    const theme: ThemeConfig = {
      colors: {
        primary: '217 91% 60%',
        background: '210 40% 98%',
      },
      darkColors: {
        background: '222 47% 11%',
      },
    }
    const vars = buildCssVariables(theme, 'dark')
    expect(vars['--background']).toBe('222 47% 11%')
    expect(vars['--primary']).toBe('217 91% 60%')
  })

  it('darkColors override colors in dark mode', () => {
    const theme: ThemeConfig = {
      colors: { primary: '100 50% 50%' },
      darkColors: { primary: '200 60% 40%' },
    }
    const vars = buildCssVariables(theme, 'dark')
    expect(vars['--primary']).toBe('200 60% 40%')
  })

  it('ignores darkColors in light mode', () => {
    const theme: ThemeConfig = {
      colors: { primary: '100 50% 50%' },
      darkColors: { primary: '200 60% 40%' },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--primary']).toBe('100 50% 50%')
  })

  it('maps radius', () => {
    const theme: ThemeConfig = { radius: '0.75rem' }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--radius']).toBe('0.75rem')
  })

  it('maps typography font families', () => {
    const theme: ThemeConfig = {
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--font-family']).toBe('Inter, sans-serif')
  })

  it('only emits defined keys (partial overrides)', () => {
    const theme: ThemeConfig = {
      colors: { primary: '217 91% 60%' },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(Object.keys(vars)).toEqual(['--primary'])
  })
})
