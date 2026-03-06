/**
 * Hex-to-HSL color conversion utilities for the theme system.
 * Converts hex colors to the "H S% L%" format used by CSS variables.
 */

const HEX_REGEX = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i

export function isHexColor(value: string): boolean {
  return HEX_REGEX.test(value)
}

export function hexToHsl(hex: string): string {
  const cleaned = hex.replace('#', '')

  let r: number, g: number, b: number

  if (cleaned.length === 3 || cleaned.length === 4) {
    r = parseInt(cleaned[0] + cleaned[0], 16) / 255
    g = parseInt(cleaned[1] + cleaned[1], 16) / 255
    b = parseInt(cleaned[2] + cleaned[2], 16) / 255
  } else {
    r = parseInt(cleaned.slice(0, 2), 16) / 255
    g = parseInt(cleaned.slice(2, 4), 16) / 255
    b = parseInt(cleaned.slice(4, 6), 16) / 255
  }

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) {
    return `0 0% ${Math.round(l * 100)}%`
  }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h: number
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6
  } else {
    h = ((r - g) / d + 4) / 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

export function normalizeColor(value: string): string {
  if (isHexColor(value)) {
    return hexToHsl(value)
  }
  return value
}
