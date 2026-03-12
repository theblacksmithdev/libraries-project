import { render, screen } from '@testing-library/react'
import { Box } from '.'

describe('Box', () => {
  it('renders as div by default', () => {
    render(<Box data-testid="box">Hello</Box>)
    const el = screen.getByTestId('box')
    expect(el.tagName).toBe('DIV')
    expect(el).toHaveTextContent('Hello')
  })

  it('renders as a different element via as prop', () => {
    render(<Box as="section" data-testid="box">Content</Box>)
    expect(screen.getByTestId('box').tagName).toBe('SECTION')
  })

  it('applies style props as Tailwind classes', () => {
    render(<Box data-testid="box" p="md" bg="primary" rounded="lg" />)
    const el = screen.getByTestId('box')
    expect(el.className).toContain('p-4')
    expect(el.className).toContain('bg-primary')
    expect(el.className).toContain('rounded-lg')
  })

  it('merges className with style props (className wins)', () => {
    render(<Box data-testid="box" p="md" className="p-0" />)
    const el = screen.getByTestId('box')
    // twMerge should resolve className winning
    expect(el.className).toContain('p-0')
  })

  it('passes through HTML attributes', () => {
    const onClick = vi.fn()
    render(<Box data-testid="box" onClick={onClick} aria-label="test" />)
    const el = screen.getByTestId('box')
    expect(el).toHaveAttribute('aria-label', 'test')
    el.click()
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not pass style props as HTML attributes', () => {
    render(<Box data-testid="box" bg="primary" shadow="md" />)
    const el = screen.getByTestId('box')
    expect(el).not.toHaveAttribute('bg')
    expect(el).not.toHaveAttribute('shadow')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Box ref={ref}>Test</Box>)
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement)
  })
})
