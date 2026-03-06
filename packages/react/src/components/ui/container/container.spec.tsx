import { render, screen } from '@testing-library/react'
import { Container } from '.'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Hello</Container>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies default max-width class', () => {
    render(<Container>Content</Container>)
    expect(screen.getByText('Content')).toHaveClass('max-w-screen-xl')
  })

  it('applies size variant', () => {
    render(<Container size="sm">Content</Container>)
    expect(screen.getByText('Content')).toHaveClass('max-w-screen-sm')
  })

  it('includes responsive padding', () => {
    render(<Container>Content</Container>)
    const el = screen.getByText('Content')
    expect(el).toHaveClass('px-4')
    expect(el).toHaveClass('mx-auto')
  })

  it('renders as a custom element', () => {
    render(<Container as="section">Content</Container>)
    expect(screen.getByText('Content').tagName).toBe('SECTION')
  })

  it('merges custom className', () => {
    render(<Container className="bg-red-500">Content</Container>)
    expect(screen.getByText('Content')).toHaveClass('bg-red-500')
  })
})
