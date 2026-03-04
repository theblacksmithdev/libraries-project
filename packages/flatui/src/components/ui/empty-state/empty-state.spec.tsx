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
})
