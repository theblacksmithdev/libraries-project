import { render, screen } from '@testing-library/react'
import { Badge } from '.'

describe('Badge', () => {
  it('renders', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })
})
