import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AlertBanner } from '.'

describe('AlertBanner', () => {
  it('renders with title and children', () => {
    render(<AlertBanner title="Heads up">Some message</AlertBanner>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Heads up')).toBeInTheDocument()
    expect(screen.getByText('Some message')).toBeInTheDocument()
  })

  it('renders default icon for each variant', () => {
    const { container } = render(<AlertBanner variant="success" title="Done" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('hides icon when icon is null', () => {
    const { container } = render(<AlertBanner icon={null} title="No icon" />)
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders dismiss button when dismissible', async () => {
    const onDismiss = vi.fn()
    render(<AlertBanner dismissible onDismiss={onDismiss} title="Test" />)
    const btn = screen.getByRole('button', { name: 'Dismiss' })
    await userEvent.click(btn)
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('renders action slot', () => {
    render(
      <AlertBanner action={<button>Upgrade</button>} title="Trial">
        Upgrade now
      </AlertBanner>
    )
    expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<AlertBanner className="custom-class" title="Test" />)
    expect(screen.getByRole('alert')).toHaveClass('custom-class')
  })
})
