import { render, screen } from '@testing-library/react'
import { EmptyState } from '.'

describe('EmptyState', () => {
  it('renders with title', () => {
    render(<EmptyState title="No items" />)
    expect(screen.getByText('No items')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(<EmptyState title="Empty" description="Nothing to see here" />)
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument()
  })

  it('renders with icon', () => {
    render(<EmptyState title="Empty" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders with action', () => {
    render(<EmptyState title="Empty" action={<button>Add item</button>} />)
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
  })

  it('renders default variant with py-12', () => {
    const { container } = render(<EmptyState title="Empty" />)
    expect((container.firstChild as HTMLElement).className).toContain('py-12')
  })

  it('renders compact variant with py-6', () => {
    const { container } = render(<EmptyState title="Empty" variant="compact" />)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('py-6')
  })

  it('renders card variant with border and bg-card', () => {
    const { container } = render(<EmptyState title="Empty" variant="card" />)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border')
    expect(cls).toContain('bg-card')
    expect(cls).toContain('rounded-lg')
  })

  it('renders dashed variant with border-dashed', () => {
    const { container } = render(<EmptyState title="Empty" variant="dashed" />)
    const cls = (container.firstChild as HTMLElement).className
    expect(cls).toContain('border-dashed')
  })
})
