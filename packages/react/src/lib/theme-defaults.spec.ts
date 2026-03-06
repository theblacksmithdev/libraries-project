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

  it('maps typography', () => {
    const theme: ThemeConfig = {
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSizeBase: '16px',
        lineHeight: '1.6',
      },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--font-family']).toBe('Inter, sans-serif')
    expect(vars['--font-size-base']).toBe('16px')
    expect(vars['--line-height']).toBe('1.6')
  })

  it('maps spacing', () => {
    const theme: ThemeConfig = {
      spacing: { unit: '0.5rem', xs: '0.5rem', '2xl': '4rem' },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--spacing-unit']).toBe('0.5rem')
    expect(vars['--spacing-xs']).toBe('0.5rem')
    expect(vars['--spacing-2xl']).toBe('4rem')
  })

  it('maps shadows', () => {
    const theme: ThemeConfig = {
      shadows: { sm: '0 1px 2px black' },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--shadow-sm']).toBe('0 1px 2px black')
  })

  it('uses darkShadows in dark mode', () => {
    const theme: ThemeConfig = {
      shadows: { sm: '0 1px 2px black' },
      darkShadows: { sm: '0 1px 2px white' },
    }
    const vars = buildCssVariables(theme, 'dark')
    expect(vars['--shadow-sm']).toBe('0 1px 2px white')
  })

  it('maps border widths', () => {
    const theme: ThemeConfig = {
      borderWidths: { DEFAULT: '2px', thick: '4px' },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(vars['--border-width']).toBe('2px')
    expect(vars['--border-width-thick']).toBe('4px')
  })

  it('only emits defined keys (partial overrides)', () => {
    const theme: ThemeConfig = {
      colors: { primary: '217 91% 60%' },
    }
    const vars = buildCssVariables(theme, 'light')
    expect(Object.keys(vars)).toEqual(['--primary'])
  })
})
