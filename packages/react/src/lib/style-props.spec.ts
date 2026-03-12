import { describe, it, expect } from 'vitest'
import { buildStyleClasses, splitStyleProps } from './style-props'

describe('buildStyleClasses', () => {
  it('returns empty string for no props', () => {
    expect(buildStyleClasses({})).toBe('')
  })

  // ── Spacing ──────────────────────────────────────────────────────

  it('maps semantic padding tokens to standard Tailwind classes', () => {
    expect(buildStyleClasses({ p: '0' })).toBe('p-0')
    expect(buildStyleClasses({ p: 'px' })).toBe('p-px')
    expect(buildStyleClasses({ p: '3xs' })).toBe('p-0.5')
    expect(buildStyleClasses({ p: '2xs' })).toBe('p-1')
    expect(buildStyleClasses({ p: 'xs' })).toBe('p-1.5')
    expect(buildStyleClasses({ p: 'sm' })).toBe('p-2')
    expect(buildStyleClasses({ p: 'sm+' })).toBe('p-3')
    expect(buildStyleClasses({ p: 'md' })).toBe('p-4')
    expect(buildStyleClasses({ p: 'md+' })).toBe('p-5')
    expect(buildStyleClasses({ p: 'lg' })).toBe('p-6')
    expect(buildStyleClasses({ p: 'lg+' })).toBe('p-7')
    expect(buildStyleClasses({ p: 'xl' })).toBe('p-8')
    expect(buildStyleClasses({ p: 'xl+' })).toBe('p-10')
    expect(buildStyleClasses({ p: '2xl' })).toBe('p-12')
    expect(buildStyleClasses({ p: '3xl' })).toBe('p-16')
    expect(buildStyleClasses({ p: '4xl' })).toBe('p-20')
    expect(buildStyleClasses({ p: '5xl' })).toBe('p-24')
    expect(buildStyleClasses({ p: '6xl' })).toBe('p-32')
    expect(buildStyleClasses({ p: '7xl' })).toBe('p-40')
    expect(buildStyleClasses({ p: '8xl' })).toBe('p-48')
    expect(buildStyleClasses({ p: '9xl' })).toBe('p-64')
    expect(buildStyleClasses({ p: '10xl' })).toBe('p-80')
    expect(buildStyleClasses({ p: '11xl' })).toBe('p-96')
  })

  it('maps directional padding', () => {
    expect(buildStyleClasses({ px: 'md' })).toBe('px-4')
    expect(buildStyleClasses({ py: 'lg' })).toBe('py-6')
    expect(buildStyleClasses({ pt: 'sm' })).toBe('pt-2')
    expect(buildStyleClasses({ pr: 'xs' })).toBe('pr-1.5')
    expect(buildStyleClasses({ pb: '2xs' })).toBe('pb-1')
    expect(buildStyleClasses({ pl: '0' })).toBe('pl-0')
  })

  it('maps margin tokens', () => {
    expect(buildStyleClasses({ m: 'md' })).toBe('m-4')
    expect(buildStyleClasses({ mx: 'lg' })).toBe('mx-6')
    expect(buildStyleClasses({ my: 'sm' })).toBe('my-2')
    expect(buildStyleClasses({ mt: 'xs' })).toBe('mt-1.5')
    expect(buildStyleClasses({ mr: '0' })).toBe('mr-0')
    expect(buildStyleClasses({ mb: '2xs' })).toBe('mb-1')
    expect(buildStyleClasses({ ml: 'xl' })).toBe('ml-8')
  })

  it('maps gap tokens including gapX and gapY', () => {
    expect(buildStyleClasses({ gap: 'md' })).toBe('gap-4')
    expect(buildStyleClasses({ gap: '0' })).toBe('gap-0')
    expect(buildStyleClasses({ gap: 'xs' })).toBe('gap-1.5')
    expect(buildStyleClasses({ gapX: 'sm' })).toBe('gap-x-2')
    expect(buildStyleClasses({ gapY: 'lg' })).toBe('gap-y-6')
  })

  // ── Colors ───────────────────────────────────────────────────────

  it('maps background colors', () => {
    expect(buildStyleClasses({ bg: 'primary' })).toBe('bg-primary')
    expect(buildStyleClasses({ bg: 'transparent' })).toBe('bg-transparent')
    expect(buildStyleClasses({ bg: 'muted-foreground' })).toBe('bg-muted-foreground')
    expect(buildStyleClasses({ bg: 'current' })).toBe('bg-current')
    expect(buildStyleClasses({ bg: 'inherit' })).toBe('bg-inherit')
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

  // ── Layout ───────────────────────────────────────────────────────

  it('maps display', () => {
    expect(buildStyleClasses({ display: 'flex' })).toBe('flex')
    expect(buildStyleClasses({ display: 'hidden' })).toBe('hidden')
    expect(buildStyleClasses({ display: 'grid' })).toBe('grid')
    expect(buildStyleClasses({ display: 'block' })).toBe('block')
    expect(buildStyleClasses({ display: 'contents' })).toBe('contents')
    expect(buildStyleClasses({ display: 'table' })).toBe('table')
  })

  it('maps position', () => {
    expect(buildStyleClasses({ position: 'relative' })).toBe('relative')
    expect(buildStyleClasses({ position: 'absolute' })).toBe('absolute')
    expect(buildStyleClasses({ position: 'sticky' })).toBe('sticky')
  })

  it('maps overflow and directional overflow', () => {
    expect(buildStyleClasses({ overflow: 'hidden' })).toBe('overflow-hidden')
    expect(buildStyleClasses({ overflow: 'auto' })).toBe('overflow-auto')
    expect(buildStyleClasses({ overflowX: 'scroll' })).toBe('overflow-x-scroll')
    expect(buildStyleClasses({ overflowY: 'clip' })).toBe('overflow-y-clip')
  })

  it('maps width, height, and size variants', () => {
    expect(buildStyleClasses({ w: 'full' })).toBe('w-full')
    expect(buildStyleClasses({ h: 'screen' })).toBe('h-screen')
    expect(buildStyleClasses({ minW: '0' })).toBe('min-w-0')
    expect(buildStyleClasses({ minH: 'full' })).toBe('min-h-full')
    expect(buildStyleClasses({ maxW: 'fit' })).toBe('max-w-fit')
    expect(buildStyleClasses({ maxH: 'screen' })).toBe('max-h-screen')
    expect(buildStyleClasses({ w: '1/2' })).toBe('w-1/2')
    expect(buildStyleClasses({ w: '96' })).toBe('w-96')
  })

  it('maps zIndex', () => {
    expect(buildStyleClasses({ zIndex: '10' })).toBe('z-10')
    expect(buildStyleClasses({ zIndex: '50' })).toBe('z-50')
    expect(buildStyleClasses({ zIndex: 'auto' })).toBe('z-auto')
  })

  it('maps inset properties', () => {
    expect(buildStyleClasses({ top: '0' })).toBe('top-0')
    expect(buildStyleClasses({ right: 'auto' })).toBe('right-auto')
    expect(buildStyleClasses({ bottom: 'full' })).toBe('bottom-full')
    expect(buildStyleClasses({ left: '1/2' })).toBe('left-1/2')
    expect(buildStyleClasses({ inset: '0' })).toBe('inset-0')
    expect(buildStyleClasses({ insetX: '0' })).toBe('inset-x-0')
    expect(buildStyleClasses({ insetY: 'auto' })).toBe('inset-y-auto')
  })

  it('maps aspectRatio and objectFit', () => {
    expect(buildStyleClasses({ aspectRatio: 'square' })).toBe('aspect-square')
    expect(buildStyleClasses({ aspectRatio: 'video' })).toBe('aspect-video')
    expect(buildStyleClasses({ objectFit: 'cover' })).toBe('object-cover')
    expect(buildStyleClasses({ objectFit: 'contain' })).toBe('object-contain')
  })

  // ── Flex ─────────────────────────────────────────────────────────

  it('maps flex direction', () => {
    expect(buildStyleClasses({ direction: 'row' })).toBe('flex-row')
    expect(buildStyleClasses({ direction: 'col' })).toBe('flex-col')
    expect(buildStyleClasses({ direction: 'col-reverse' })).toBe('flex-col-reverse')
  })

  it('maps align and justify', () => {
    expect(buildStyleClasses({ align: 'center' })).toBe('items-center')
    expect(buildStyleClasses({ justify: 'between' })).toBe('justify-between')
    expect(buildStyleClasses({ justify: 'evenly' })).toBe('justify-evenly')
  })

  it('maps wrap, grow, shrink', () => {
    expect(buildStyleClasses({ wrap: 'wrap' })).toBe('flex-wrap')
    expect(buildStyleClasses({ grow: '1' })).toBe('grow')
    expect(buildStyleClasses({ shrink: '0' })).toBe('shrink-0')
  })

  it('maps alignSelf and justifySelf', () => {
    expect(buildStyleClasses({ alignSelf: 'center' })).toBe('self-center')
    expect(buildStyleClasses({ alignSelf: 'start' })).toBe('self-start')
    expect(buildStyleClasses({ justifySelf: 'end' })).toBe('justify-self-end')
  })

  it('maps flex shorthand and order', () => {
    expect(buildStyleClasses({ flex: '1' })).toBe('flex-1')
    expect(buildStyleClasses({ flex: 'none' })).toBe('flex-none')
    expect(buildStyleClasses({ order: 'first' })).toBe('order-first')
    expect(buildStyleClasses({ order: 'last' })).toBe('order-last')
    expect(buildStyleClasses({ order: '3' })).toBe('order-3')
  })

  // ── Grid ─────────────────────────────────────────────────────────

  it('maps grid columns and column span', () => {
    expect(buildStyleClasses({ gridCols: '3' })).toBe('grid-cols-3')
    expect(buildStyleClasses({ gridCols: '12' })).toBe('grid-cols-12')
    expect(buildStyleClasses({ colSpan: '2' })).toBe('col-span-2')
    expect(buildStyleClasses({ colSpan: 'full' })).toBe('col-span-full')
  })

  it('maps grid rows, row span, and placeItems', () => {
    expect(buildStyleClasses({ gridRows: '3' })).toBe('grid-rows-3')
    expect(buildStyleClasses({ rowSpan: '2' })).toBe('row-span-2')
    expect(buildStyleClasses({ rowSpan: 'full' })).toBe('row-span-full')
    expect(buildStyleClasses({ placeItems: 'center' })).toBe('place-items-center')
  })

  // ── Visual ───────────────────────────────────────────────────────

  it('maps shadow', () => {
    expect(buildStyleClasses({ shadow: 'md' })).toBe('shadow-md')
    expect(buildStyleClasses({ shadow: 'none' })).toBe('shadow-none')
    expect(buildStyleClasses({ shadow: 'DEFAULT' })).toBe('shadow')
  })

  it('maps rounded', () => {
    expect(buildStyleClasses({ rounded: 'lg' })).toBe('rounded-lg')
    expect(buildStyleClasses({ rounded: 'full' })).toBe('rounded-full')
  })

  it('maps borderWidth and borderStyle', () => {
    expect(buildStyleClasses({ borderWidth: '1' })).toBe('border')
    expect(buildStyleClasses({ borderWidth: '2' })).toBe('border-2')
    expect(buildStyleClasses({ borderStyle: 'dashed' })).toBe('border-dashed')
    expect(buildStyleClasses({ borderStyle: 'solid' })).toBe('border-solid')
  })

  it('maps opacity', () => {
    expect(buildStyleClasses({ opacity: '50' })).toBe('opacity-50')
    expect(buildStyleClasses({ opacity: '0' })).toBe('opacity-0')
  })

  // ── Typography ───────────────────────────────────────────────────

  it('maps fontSize', () => {
    expect(buildStyleClasses({ fontSize: 'lg' })).toBe('text-lg')
    expect(buildStyleClasses({ fontSize: '2xl' })).toBe('text-2xl')
    expect(buildStyleClasses({ fontSize: '9xl' })).toBe('text-9xl')
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

  it('maps lineHeight', () => {
    expect(buildStyleClasses({ lineHeight: 'tight' })).toBe('leading-tight')
    expect(buildStyleClasses({ lineHeight: 'relaxed' })).toBe('leading-relaxed')
    expect(buildStyleClasses({ lineHeight: '6' })).toBe('leading-6')
  })

  it('maps letterSpacing', () => {
    expect(buildStyleClasses({ letterSpacing: 'tight' })).toBe('tracking-tight')
    expect(buildStyleClasses({ letterSpacing: 'widest' })).toBe('tracking-widest')
  })

  it('maps textTransform', () => {
    expect(buildStyleClasses({ textTransform: 'uppercase' })).toBe('uppercase')
    expect(buildStyleClasses({ textTransform: 'capitalize' })).toBe('capitalize')
  })

  it('maps textDecoration', () => {
    expect(buildStyleClasses({ textDecoration: 'underline' })).toBe('underline')
    expect(buildStyleClasses({ textDecoration: 'line-through' })).toBe('line-through')
  })

  it('maps textOverflow', () => {
    expect(buildStyleClasses({ textOverflow: 'truncate' })).toBe('truncate')
    expect(buildStyleClasses({ textOverflow: 'ellipsis' })).toBe('text-ellipsis')
  })

  it('maps whiteSpace', () => {
    expect(buildStyleClasses({ whiteSpace: 'nowrap' })).toBe('whitespace-nowrap')
    expect(buildStyleClasses({ whiteSpace: 'pre-line' })).toBe('whitespace-pre-line')
  })

  it('maps wordBreak', () => {
    expect(buildStyleClasses({ wordBreak: 'all' })).toBe('break-all')
    expect(buildStyleClasses({ wordBreak: 'words' })).toBe('break-words')
  })

  // ── Interactivity ────────────────────────────────────────────────

  it('maps cursor', () => {
    expect(buildStyleClasses({ cursor: 'pointer' })).toBe('cursor-pointer')
    expect(buildStyleClasses({ cursor: 'not-allowed' })).toBe('cursor-not-allowed')
    expect(buildStyleClasses({ cursor: 'grab' })).toBe('cursor-grab')
  })

  it('maps userSelect', () => {
    expect(buildStyleClasses({ userSelect: 'none' })).toBe('select-none')
    expect(buildStyleClasses({ userSelect: 'text' })).toBe('select-text')
  })

  it('maps pointerEvents', () => {
    expect(buildStyleClasses({ pointerEvents: 'none' })).toBe('pointer-events-none')
    expect(buildStyleClasses({ pointerEvents: 'auto' })).toBe('pointer-events-auto')
  })

  // ── Transitions ──────────────────────────────────────────────────

  it('maps transition', () => {
    expect(buildStyleClasses({ transition: 'colors' })).toBe('transition-colors')
    expect(buildStyleClasses({ transition: 'DEFAULT' })).toBe('transition')
    expect(buildStyleClasses({ transition: 'none' })).toBe('transition-none')
  })

  it('maps duration', () => {
    expect(buildStyleClasses({ duration: '150' })).toBe('duration-150')
    expect(buildStyleClasses({ duration: '300' })).toBe('duration-300')
  })

  it('maps ease', () => {
    expect(buildStyleClasses({ ease: 'in-out' })).toBe('ease-in-out')
    expect(buildStyleClasses({ ease: 'linear' })).toBe('ease-linear')
  })

  // ── Combined ─────────────────────────────────────────────────────

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
    expect(result).toBe('p-4 gap-4 bg-primary flex items-center shadow-md rounded-lg')
  })

  it('combines advanced props', () => {
    const result = buildStyleClasses({
      display: 'grid',
      gridCols: '3',
      gap: 'lg',
      p: 'xl',
      rounded: 'xl',
      transition: 'colors',
      duration: '200',
      cursor: 'pointer',
    })
    expect(result).toBe('p-8 gap-6 grid grid-cols-3 shadow-none rounded-xl cursor-pointer transition-colors duration-200'.replace('shadow-none ', ''))
    // Let's verify each class individually
    expect(result).toContain('p-8')
    expect(result).toContain('gap-6')
    expect(result).toContain('grid')
    expect(result).toContain('grid-cols-3')
    expect(result).toContain('rounded-xl')
    expect(result).toContain('transition-colors')
    expect(result).toContain('duration-200')
    expect(result).toContain('cursor-pointer')
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
    expect(styleClasses).toBe('p-4 bg-primary')
    expect(restProps).toHaveProperty('onClick')
    expect(restProps).toHaveProperty('data-testid')
    expect(restProps).toHaveProperty('children')
    expect(restProps).not.toHaveProperty('p')
    expect(restProps).not.toHaveProperty('bg')
  })

  it('separates new style props (grid, cursor, transition)', () => {
    const { styleClasses, restProps } = splitStyleProps({
      gridCols: '3' as const,
      cursor: 'pointer' as const,
      transition: 'colors' as const,
      id: 'my-grid',
    })
    expect(styleClasses).toBe('grid-cols-3 cursor-pointer transition-colors')
    expect(restProps).toHaveProperty('id')
    expect(restProps).not.toHaveProperty('gridCols')
    expect(restProps).not.toHaveProperty('cursor')
    expect(restProps).not.toHaveProperty('transition')
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
