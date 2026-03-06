import { render, screen } from '@testing-library/react'
import { Stack, HStack, VStack } from '.'

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack>Hello</Stack>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('defaults to column direction', () => {
    render(<Stack>Content</Stack>)
    expect(screen.getByText('Content')).toHaveClass('flex-col')
  })

  it('applies direction variant', () => {
    render(<Stack direction="row">Content</Stack>)
    expect(screen.getByText('Content')).toHaveClass('flex-row')
  })

  it('applies gap variant', () => {
    render(<Stack gap={8}>Content</Stack>)
    expect(screen.getByText('Content')).toHaveClass('gap-8')
  })

  it('applies alignment variants', () => {
    render(<Stack align="center" justify="between">Content</Stack>)
    const el = screen.getByText('Content')
    expect(el).toHaveClass('items-center')
    expect(el).toHaveClass('justify-between')
  })

  it('supports wrapping', () => {
    render(<Stack wrap>Content</Stack>)
    expect(screen.getByText('Content')).toHaveClass('flex-wrap')
  })

  it('renders as custom element', () => {
    render(<Stack as="nav">Content</Stack>)
    expect(screen.getByText('Content').tagName).toBe('NAV')
  })

  it('merges custom className', () => {
    render(<Stack className="custom">Content</Stack>)
    expect(screen.getByText('Content')).toHaveClass('flex', 'custom')
  })
})

describe('HStack', () => {
  it('renders with row direction', () => {
    render(<HStack>Content</HStack>)
    expect(screen.getByText('Content')).toHaveClass('flex-row')
  })
})

describe('VStack', () => {
  it('renders with column direction', () => {
    render(<VStack>Content</VStack>)
    expect(screen.getByText('Content')).toHaveClass('flex-col')
  })
})
