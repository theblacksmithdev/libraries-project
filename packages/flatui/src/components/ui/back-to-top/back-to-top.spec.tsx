import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BackToTop } from '.'

describe('BackToTop', () => {
  it('renders button with aria-label', () => {
    render(<BackToTop alwaysVisible />)
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })

  it('is hidden by default when threshold not met', () => {
    render(<BackToTop />)
    const btn = screen.getByRole('button', { name: 'Back to top' })
    expect(btn).toHaveClass('opacity-0')
  })

  it('is visible when alwaysVisible is true', () => {
    render(<BackToTop alwaysVisible />)
    const btn = screen.getByRole('button', { name: 'Back to top' })
    expect(btn).toHaveClass('opacity-100')
  })

  it('calls scrollTo on click', async () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy
    render(<BackToTop alwaysVisible />)
    await userEvent.click(screen.getByRole('button', { name: 'Back to top' }))
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('uses auto behavior when smooth is false', async () => {
    const scrollToSpy = vi.fn()
    window.scrollTo = scrollToSpy
    render(<BackToTop alwaysVisible smooth={false} />)
    await userEvent.click(screen.getByRole('button', { name: 'Back to top' }))
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('applies position classes', () => {
    render(<BackToTop alwaysVisible position="bottom-left" />)
    const btn = screen.getByRole('button', { name: 'Back to top' })
    expect(btn).toHaveClass('bottom-6', 'left-6')
  })

  it('renders custom icon', () => {
    render(<BackToTop alwaysVisible icon={<span data-testid="custom">Up</span>} />)
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<BackToTop alwaysVisible className="custom-class" />)
    expect(screen.getByRole('button', { name: 'Back to top' })).toHaveClass('custom-class')
  })
})
