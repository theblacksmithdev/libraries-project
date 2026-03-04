import { render, screen } from '@testing-library/react'
import { Label } from '.'

describe('Label', () => {
  it('renders', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })
})
