import { render, screen } from '@testing-library/react'
import { Spinner } from '.'

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has accessible label', () => {
    render(<Spinner label="Please wait" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Please wait')
  })

  it('defaults to Loading aria-label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('renders dots variant', () => {
    const { container } = render(<Spinner variant="dots" />)
    const dots = container.querySelectorAll('.animate-bounce')
    expect(dots).toHaveLength(3)
  })

  it('renders bars variant', () => {
    const { container } = render(<Spinner variant="bars" />)
    const bars = container.querySelectorAll('.rounded-full.bg-current')
    expect(bars).toHaveLength(4)
  })

  it('accepts custom className', () => {
    render(<Spinner className="text-red-500" />)
    expect(screen.getByRole('status')).toHaveClass('text-red-500')
  })
})
