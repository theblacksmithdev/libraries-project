import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('Button', () => {
  it('renders', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })
})
