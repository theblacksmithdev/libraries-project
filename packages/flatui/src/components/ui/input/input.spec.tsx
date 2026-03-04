import { render, screen } from '@testing-library/react'
import { Input } from '.'

describe('Input', () => {
  it('renders', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })
})
