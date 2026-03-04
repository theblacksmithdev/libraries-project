import { render, screen } from '@testing-library/react'
import { Typography } from '.'

describe('Typography', () => {
  it('renders with default variant', () => {
    render(<Typography>Hello world</Typography>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
    expect(screen.getByText('Hello world').tagName).toBe('P')
  })

  it('renders h1 variant', () => {
    render(<Typography variant="h1">Heading 1</Typography>)
    const el = screen.getByText('Heading 1')
    expect(el.tagName).toBe('H1')
    expect(el).toHaveClass('text-4xl')
  })

  it('renders h2 variant', () => {
    render(<Typography variant="h2">Heading 2</Typography>)
    expect(screen.getByText('Heading 2').tagName).toBe('H2')
  })

  it('renders h3 variant', () => {
    render(<Typography variant="h3">Heading 3</Typography>)
    expect(screen.getByText('Heading 3').tagName).toBe('H3')
  })

  it('renders h4 variant', () => {
    render(<Typography variant="h4">Heading 4</Typography>)
    expect(screen.getByText('Heading 4').tagName).toBe('H4')
  })

  it('renders blockquote variant', () => {
    render(<Typography variant="blockquote">A quote</Typography>)
    expect(screen.getByText('A quote').tagName).toBe('BLOCKQUOTE')
  })

  it('renders code variant', () => {
    render(<Typography variant="code">const x = 1</Typography>)
    expect(screen.getByText('const x = 1').tagName).toBe('CODE')
  })

  it('renders small variant', () => {
    render(<Typography variant="small">Small text</Typography>)
    expect(screen.getByText('Small text').tagName).toBe('SMALL')
  })

  it('allows overriding the element with as prop', () => {
    render(<Typography variant="h1" as="span">Span heading</Typography>)
    expect(screen.getByText('Span heading').tagName).toBe('SPAN')
  })

  it('applies size variant', () => {
    render(<Typography size="lg">Large text</Typography>)
    expect(screen.getByText('Large text')).toHaveClass('text-lg')
  })

  it('applies weight variant', () => {
    render(<Typography weight="bold">Bold text</Typography>)
    expect(screen.getByText('Bold text')).toHaveClass('font-bold')
  })

  it('applies align variant', () => {
    render(<Typography align="center">Centered</Typography>)
    expect(screen.getByText('Centered')).toHaveClass('text-center')
  })

  it('applies color variant', () => {
    render(<Typography color="primary">Primary</Typography>)
    expect(screen.getByText('Primary')).toHaveClass('text-primary')
  })

  it('applies custom className', () => {
    render(<Typography className="custom-class">Custom</Typography>)
    expect(screen.getByText('Custom')).toHaveClass('custom-class')
  })
})
