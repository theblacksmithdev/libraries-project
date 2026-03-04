import { render, screen } from '@testing-library/react'
import { Flex } from '.'

describe('Flex', () => {
  it('renders as a flex container by default', () => {
    render(<Flex data-testid="flex">Content</Flex>)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('flex')
  })

  it('applies flex-specific style props', () => {
    render(<Flex data-testid="flex" align="center" justify="between" gap="md" />)
    const el = screen.getByTestId('flex')
    expect(el.className).toContain('items-center')
    expect(el.className).toContain('justify-between')
    expect(el.className).toContain('gap-md-space')
  })

  it('supports polymorphic as prop', () => {
    render(<Flex as="nav" data-testid="flex">Nav</Flex>)
    expect(screen.getByTestId('flex').tagName).toBe('NAV')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Flex ref={ref}>Test</Flex>)
    expect(ref).toHaveBeenCalled()
  })
})
