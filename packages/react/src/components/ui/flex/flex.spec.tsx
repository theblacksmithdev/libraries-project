import { render, screen } from '@testing-library/react'
import { Flex } from '.'

describe('Flex', () => {
  it('renders as a flex container by default', () => {
    render(<Flex data-testid="flex">Content</Flex>)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('flex')
  })

  it('applies direction prop', () => {
    render(<Flex data-testid="flex" direction="col" />)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('flex')
    expect(el.className).toContain('flex-col')
  })

  it('applies direction="row-reverse"', () => {
    render(<Flex data-testid="flex" direction="row-reverse" />)
    expect(screen.getByTestId('flex').className).toContain('flex-row-reverse')
  })

  it('applies gap prop with spacing tokens', () => {
    const { rerender } = render(<Flex data-testid="flex" gap="sm" />)
    expect(screen.getByTestId('flex').className).toContain('gap-sm-space')

    rerender(<Flex data-testid="flex" gap="md" />)
    expect(screen.getByTestId('flex').className).toContain('gap-md-space')

    rerender(<Flex data-testid="flex" gap="lg" />)
    expect(screen.getByTestId('flex').className).toContain('gap-lg-space')
  })

  it('applies direction and gap together', () => {
    render(<Flex data-testid="flex" direction="col" gap="md" />)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('flex')
    expect(el.className).toContain('flex-col')
    expect(el.className).toContain('gap-md-space')
  })

  it('applies flex-specific style props', () => {
    render(<Flex data-testid="flex" align="center" justify="between" gap="md" />)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('items-center')
    expect(el.className).toContain('justify-between')
    expect(el.className).toContain('gap-md-space')
  })

  it('applies wrap prop', () => {
    render(<Flex data-testid="flex" wrap="wrap" />)
    expect(screen.getByTestId('flex').className).toContain('flex-wrap')
  })

  it('does not leak style props to the DOM', () => {
    render(<Flex data-testid="flex" direction="col" gap="md" align="center" />)
    const el = screen.getByTestId('flex')
    expect(el).not.toHaveAttribute('direction')
    expect(el).not.toHaveAttribute('gap')
    expect(el).not.toHaveAttribute('align')
  })

  it('supports polymorphic as prop', () => {
    render(<Flex as="nav" data-testid="flex">Nav</Flex>)
    expect(screen.getByTestId('flex').tagName).toBe('NAV')
  })

  it('merges className with style classes (className wins)', () => {
    render(<Flex data-testid="flex" gap="md" className="gap-0" />)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('gap-0')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Flex ref={ref}>Test</Flex>)
    expect(ref).toHaveBeenCalled()
  })
})
