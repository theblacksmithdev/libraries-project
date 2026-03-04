import { render, screen } from '@testing-library/react'
import { Checkbox } from '.'

describe('Checkbox', () => {
  it('renders', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
})
