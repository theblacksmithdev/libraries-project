import { render, screen } from '@testing-library/react'
import { Text } from '.'

describe('Text', () => {
  it('renders as span by default', () => {
    render(<Text data-testid="text">Hello</Text>)
    const el = screen.getByTestId('text')
    expect(el.tagName).toBe('SPAN')
    expect(el).toHaveTextContent('Hello')
  })

  it('renders as a different element via as prop', () => {
    render(<Text as="p" data-testid="text">Paragraph</Text>)
    expect(screen.getByTestId('text').tagName).toBe('P')
  })

  it('applies body variant by default (text-base)', () => {
    render(<Text data-testid="text">Body text</Text>)
    expect(screen.getByTestId('text').className).toContain('text-base')
  })

  it('applies label variant', () => {
    render(<Text data-testid="text" variant="label">Label</Text>)
    const cls = screen.getByTestId('text').className
    expect(cls).toContain('text-sm')
    expect(cls).toContain('font-medium')
  })

  it('applies caption variant', () => {
    render(<Text data-testid="text" variant="caption">Caption</Text>)
    const cls = screen.getByTestId('text').className
    expect(cls).toContain('text-sm')
    expect(cls).toContain('text-muted-foreground')
  })

  it('applies overline variant', () => {
    render(<Text data-testid="text" variant="overline">Overline</Text>)
    const cls = screen.getByTestId('text').className
    expect(cls).toContain('text-sm')
    expect(cls).toContain('font-semibold')
  })

  it('allows style props to override variant defaults', () => {
    render(<Text data-testid="text" variant="body" fontSize="2xl" fontWeight="bold">Big</Text>)
    const cls = screen.getByTestId('text').className
    expect(cls).toContain('text-2xl')
    expect(cls).toContain('font-bold')
  })

  it('merges className with variant and style props', () => {
    render(<Text data-testid="text" variant="body" className="custom-class">Text</Text>)
    expect(screen.getByTestId('text').className).toContain('custom-class')
  })

  it('does not pass style props as HTML attributes', () => {
    render(<Text data-testid="text" fontSize="lg" color="primary">Test</Text>)
    const el = screen.getByTestId('text')
    expect(el).not.toHaveAttribute('fontSize')
    expect(el).not.toHaveAttribute('color')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Text ref={ref}>Test</Text>)
    expect(ref).toHaveBeenCalled()
  })
})
