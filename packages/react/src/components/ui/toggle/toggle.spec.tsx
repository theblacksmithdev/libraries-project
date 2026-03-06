import { render, screen } from '@testing-library/react'
import { Toggle } from '.'

describe('Toggle', () => {
  it('renders', () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByText('Bold')).toBeInTheDocument()
  })
})
