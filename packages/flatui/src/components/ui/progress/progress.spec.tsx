import { render, screen } from '@testing-library/react'
import { Progress } from '.'

describe('Progress', () => {
  it('renders', () => {
    render(<Progress value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
