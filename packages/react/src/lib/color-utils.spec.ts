import { describe, it, expect } from 'vitest'
import { isHexColor, hexToHsl, normalizeColor } from './color-utils'

describe('isHexColor', () => {
  it('detects 6-digit hex', () => {
    expect(isHexColor('#3b82f6')).toBe(true)
    expect(isHexColor('#000000')).toBe(true)
    expect(isHexColor('#FFFFFF')).toBe(true)
  })

  it('detects 3-digit hex', () => {
    expect(isHexColor('#fff')).toBe(true)
    expect(isHexColor('#abc')).toBe(true)
  })

  it('detects 8-digit hex (with alpha)', () => {
    expect(isHexColor('#3b82f6ff')).toBe(true)
  })

  it('detects 4-digit hex (with alpha)', () => {
    expect(isHexColor('#fffa')).toBe(true)
  })

  it('rejects non-hex values', () => {
    expect(isHexColor('red')).toBe(false)
    expect(isHexColor('217 91% 60%')).toBe(false)
    expect(isHexColor('rgb(0,0,0)')).toBe(false)
    expect(isHexColor('#gg0000')).toBe(false)
    expect(isHexColor('#12345')).toBe(false)
  })
})

describe('hexToHsl', () => {
  it('converts pure white', () => {
    expect(hexToHsl('#ffffff')).toBe('0 0% 100%')
  })

  it('converts pure black', () => {
    expect(hexToHsl('#000000')).toBe('0 0% 0%')
  })

  it('converts pure red', () => {
    expect(hexToHsl('#ff0000')).toBe('0 100% 50%')
  })

  it('converts pure green', () => {
    expect(hexToHsl('#00ff00')).toBe('120 100% 50%')
  })

  it('converts pure blue', () => {
    expect(hexToHsl('#0000ff')).toBe('240 100% 50%')
  })

  it('converts Tailwind blue-500 (#3b82f6)', () => {
    const result = hexToHsl('#3b82f6')
    expect(result).toBe('217 91% 60%')
  })

  it('converts 3-digit hex', () => {
    expect(hexToHsl('#fff')).toBe('0 0% 100%')
    expect(hexToHsl('#000')).toBe('0 0% 0%')
  })

  it('converts gray', () => {
    expect(hexToHsl('#808080')).toBe('0 0% 50%')
  })
})

describe('normalizeColor', () => {
  it('converts hex to HSL', () => {
    expect(normalizeColor('#3b82f6')).toBe('217 91% 60%')
  })

  it('passes through HSL values', () => {
    expect(normalizeColor('217 91% 60%')).toBe('217 91% 60%')
  })

  it('passes through other string values', () => {
    expect(normalizeColor('18 62% 60%')).toBe('18 62% 60%')
  })
})
