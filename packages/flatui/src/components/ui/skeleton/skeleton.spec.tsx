import { render, screen } from '@testing-library/react'
import { Skeleton } from '.'

describe('Skeleton', () => {
  it('renders', () => {
    render(<Skeleton className="h-4 w-4" data-testid="skeleton" />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})
