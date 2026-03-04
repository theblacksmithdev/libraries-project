import { render, screen } from '@testing-library/react'
import { Textarea } from '.'

describe('Textarea', () => {
  it('renders', () => {
    render(<Textarea placeholder="Message" />)
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()
  })
})
