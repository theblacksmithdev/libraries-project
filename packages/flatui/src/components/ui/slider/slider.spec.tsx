import { render, screen } from '@testing-library/react'
import { Slider } from '.'

describe('Slider', () => {
  it('renders', () => {
    render(<Slider defaultValue={[50]} max={100} step={1} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })
})
