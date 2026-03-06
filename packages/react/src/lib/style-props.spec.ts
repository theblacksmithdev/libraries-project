import { describe, it, expect } from 'vitest'
import { buildStyleClasses, splitStyleProps } from './style-props'

describe('buildStyleClasses', () => {
  it('returns empty string for no props', () => {
    expect(buildStyleClasses({})).toBe('')
  })

  it('maps padding with -space suffix for sm/md/lg/xl/2xl', () => {
    expect(buildStyleClasses({ p: 'sm' })).toBe('p-sm-space')
    expect(buildStyleClasses({ p: 'md' })).toBe('p-md-space')
    expect(buildStyleClasses({ p: 'lg' })).toBe('p-lg-space')
    expect(buildStyleClasses({ p: 'xl' })).toBe('p-xl-space')
    expect(buildStyleClasses({ p: '2xl' })).toBe('p-2xl-space')
  })

  it('maps padding without -space suffix for 0/unit/xs', () => {
    expect(buildStyleClasses({ p: '0' })).toBe('p-0')
    expect(buildStyleClasses({ p: 'unit' })).toBe('p-unit')
    expect(buildStyleClasses({ p: 'xs' })).toBe('p-xs')
  })

  it('maps directional padding', () => {
    expect(buildStyleClasses({ px: 'md' })).toBe('px-md-space')
    expect(buildStyleClasses({ py: 'lg' })).toBe('py-lg-space')
    expect(buildStyleClasses({ pt: 'sm' })).toBe('pt-sm-space')
    expect(buildStyleClasses({ pr: 'xs' })).toBe('pr-xs')
    expect(buildStyleClasses({ pb: 'unit' })).toBe('pb-unit')
    expect(buildStyleClasses({ pl: '0' })).toBe('pl-0')
  })

  it('maps margin with -space suffix', () => {
    expect(buildStyleClasses({ m: 'md' })).toBe('m-md-space')
    expect(buildStyleClasses({ mx: 'lg' })).toBe('mx-lg-space')
    expect(buildStyleClasses({ my: 'sm' })).toBe('my-sm-space')
    expect(buildStyleClasses({ mt: 'xs' })).toBe('mt-xs')
    expect(buildStyleClasses({ mr: '0' })).toBe('mr-0')
    expect(buildStyleClasses({ mb: 'unit' })).toBe('mb-unit')
    expect(buildStyleClasses({ ml: 'xl' })).toBe('ml-xl-space')
  })

  it('maps gap with -space suffix', () => {
    expect(buildStyleClasses({ gap: 'md' })).toBe('gap-md-space')
    expect(buildStyleClasses({ gap: '0' })).toBe('gap-0')
    expect(buildStyleClasses({ gap: 'xs' })).toBe('gap-xs')
  })

  it('maps background colors', () => {
    expect(buildStyleClasses({ bg: 'primary' })).toBe('bg-primary')
    expect(buildStyleClasses({ bg: 'transparent' })).toBe('bg-transparent')
    expect(buildStyleClasses({ bg: 'muted-foreground' })).toBe('bg-muted-foreground')
  })

  it('maps text colors', () => {
    expect(buildStyleClasses({ color: 'foreground' })).toBe('text-foreground')
    expect(buildStyleClasses({ color: 'primary' })).toBe('text-primary')
    expect(buildStyleClasses({ color: 'muted-foreground' })).toBe('text-muted-foreground')
  })

  it('maps border colors', () => {
    expect(buildStyleClasses({ borderColor: 'primary' })).toBe('border-primary')
    expect(buildStyleClasses({ borderColor: 'border' })).toBe('border-border')
  })

  it('maps display', () => {
    expect(buildStyleClasses({ display: 'flex' })).toBe('flex')
    expect(buildStyleClasses({ display: 'hidden' })).toBe('hidden')
    expect(buildStyleClasses({ display: 'grid' })).toBe('grid')
    expect(buildStyleClasses({ display: 'block' })).toBe('block')
  })

  it('maps position', () => {
    expect(buildStyleClasses({ position: 'relative' })).toBe('relative')
    expect(buildStyleClasses({ position: 'absolute' })).toBe('absolute')
  })

  it('maps overflow', () => {
    expect(buildStyleClasses({ overflow: 'hidden' })).toBe('overflow-hidden')
    expect(buildStyleClasses({ overflow: 'auto' })).toBe('overflow-auto')
  })

  it('maps width, height, maxWidth', () => {
    expect(buildStyleClasses({ w: 'full' })).toBe('w-full')
    expect(buildStyleClasses({ h: 'screen' })).toBe('h-screen')
    expect(buildStyleClasses({ maxW: 'fit' })).toBe('max-w-fit')
  })

  it('maps flex direction', () => {
    expect(buildStyleClasses({ direction: 'row' })).toBe('flex-row')
    expect(buildStyleClasses({ direction: 'col' })).toBe('flex-col')
  })

  it('maps align and justify', () => {
    expect(buildStyleClasses({ align: 'center' })).toBe('items-center')
    expect(buildStyleClasses({ justify: 'between' })).toBe('justify-between')
  })

  it('maps wrap, grow, shrink', () => {
    expect(buildStyleClasses({ wrap: 'wrap' })).toBe('flex-wrap')
    expect(buildStyleClasses({ grow: '1' })).toBe('grow')
    expect(buildStyleClasses({ shrink: '0' })).toBe('shrink-0')
  })

  it('maps shadow', () => {
    expect(buildStyleClasses({ shadow: 'md' })).toBe('shadow-md')
    expect(buildStyleClasses({ shadow: 'none' })).toBe('shadow-none')
  })

  it('maps rounded', () => {
    expect(buildStyleClasses({ rounded: 'lg' })).toBe('rounded-lg')
    expect(buildStyleClasses({ rounded: 'full' })).toBe('rounded-full')
  })

  it('maps borderWidth', () => {
    expect(buildStyleClasses({ borderWidth: '1' })).toBe('border')
    expect(buildStyleClasses({ borderWidth: '2' })).toBe('border-2')
  })

  it('maps opacity', () => {
    expect(buildStyleClasses({ opacity: '50' })).toBe('opacity-50')
    expect(buildStyleClasses({ opacity: '0' })).toBe('opacity-0')
  })

  it('maps fontSize', () => {
    expect(buildStyleClasses({ fontSize: 'lg' })).toBe('text-lg')
    expect(buildStyleClasses({ fontSize: '2xl' })).toBe('text-2xl')
  })

  it('maps fontWeight', () => {
    expect(buildStyleClasses({ fontWeight: 'bold' })).toBe('font-bold')
    expect(buildStyleClasses({ fontWeight: 'medium' })).toBe('font-medium')
  })

  it('maps fontFamily', () => {
    expect(buildStyleClasses({ fontFamily: 'mono' })).toBe('font-mono')
  })

  it('maps textAlign', () => {
    expect(buildStyleClasses({ textAlign: 'center' })).toBe('text-center')
  })

  it('combines multiple props', () => {
    const result = buildStyleClasses({
      display: 'flex',
      align: 'center',
      gap: 'md',
      bg: 'primary',
      p: 'md',
      rounded: 'lg',
      shadow: 'md',
    })
    expect(result).toBe('p-md-space gap-md-space bg-primary flex items-center shadow-md rounded-lg')
  })

  it('ignores undefined props', () => {
    expect(buildStyleClasses({ p: undefined, bg: 'primary' })).toBe('bg-primary')
  })
})

describe('splitStyleProps', () => {
  it('separates style props from rest props', () => {
    const { styleClasses, restProps } = splitStyleProps({
      p: 'md' as const,
      bg: 'primary' as const,
      onClick: () => {},
      'data-testid': 'box',
      children: 'hello',
    })
    expect(styleClasses).toBe('p-md-space bg-primary')
    expect(restProps).toHaveProperty('onClick')
    expect(restProps).toHaveProperty('data-testid')
    expect(restProps).toHaveProperty('children')
    expect(restProps).not.toHaveProperty('p')
    expect(restProps).not.toHaveProperty('bg')
  })

  it('returns empty string and all rest props when no style props', () => {
    const { styleClasses, restProps } = splitStyleProps({
      onClick: () => {},
      className: 'custom',
    })
    expect(styleClasses).toBe('')
    expect(restProps).toHaveProperty('onClick')
    expect(restProps).toHaveProperty('className')
  })
})
