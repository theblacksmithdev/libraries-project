import { describe, it, expect } from 'vitest'
import { presets, type PresetName } from './presets'

const HSL_REGEX = /^\d{1,3}\s\d{1,3}%\s\d{1,3}%$/

const PRESET_NAMES: PresetName[] = ['default', 'blue', 'green', 'violet', 'red', 'neutral', 'slate', 'rose', 'amber', 'teal', 'zinc', 'sapphire', 'sand', 'midnight']

const REQUIRED_COLOR_KEYS = [
  'background', 'foreground', 'card', 'card-foreground',
  'popover', 'popover-foreground', 'primary', 'primary-foreground',
  'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
  'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
  'border', 'input', 'ring',
] as const

describe('presets', () => {
  it('exports all 14 presets', () => {
    expect(Object.keys(presets)).toHaveLength(14)
    for (const name of PRESET_NAMES) {
      expect(presets[name]).toBeDefined()
    }
  })

  for (const name of PRESET_NAMES) {
    describe(`preset: ${name}`, () => {
      it('has colors and darkColors', () => {
        expect(presets[name].colors).toBeDefined()
        expect(presets[name].darkColors).toBeDefined()
      })

      it('has a radius', () => {
        expect(presets[name].radius).toBeDefined()
        expect(typeof presets[name].radius).toBe('string')
      })

      it('has all required light color keys', () => {
        for (const key of REQUIRED_COLOR_KEYS) {
          expect(presets[name].colors![key]).toBeDefined()
        }
      })

      it('has all required dark color keys', () => {
        for (const key of REQUIRED_COLOR_KEYS) {
          expect(presets[name].darkColors![key]).toBeDefined()
        }
      })

      it('all light color values are valid HSL format', () => {
        const colors = presets[name].colors!
        for (const key of REQUIRED_COLOR_KEYS) {
          expect(colors[key]).toMatch(HSL_REGEX)
        }
      })

      it('all dark color values are valid HSL format', () => {
        const darkColors = presets[name].darkColors!
        for (const key of REQUIRED_COLOR_KEYS) {
          expect(darkColors[key]).toMatch(HSL_REGEX)
        }
      })
    })
  }
})
