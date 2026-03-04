import { render, screen } from '@testing-library/react'
import { RangeSlider } from '.'

describe('RangeSlider', () => {
  it('renders slider', () => {
    render(<RangeSlider />)
    const sliders = screen.getAllByRole('slider')
    expect(sliders.length).toBeGreaterThanOrEqual(1)
  })

  it('renders two thumbs', () => {
    render(<RangeSlider defaultValue={[20, 80]} />)
    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)
  })

  it('sets correct aria values', () => {
    render(<RangeSlider value={[10, 90]} min={0} max={100} />)
    const sliders = screen.getAllByRole('slider')
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '10')
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '90')
  })

  it('shows labels when showLabels is true', () => {
    render(<RangeSlider value={[25, 75]} showLabels />)
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('formats labels with formatLabel', () => {
    render(
      <RangeSlider value={[10, 50]} showLabels formatLabel={(v) => `$${v}`} />
    )
    expect(screen.getByText('$10')).toBeInTheDocument()
    expect(screen.getByText('$50')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<RangeSlider className="custom-slider" />)
    expect(container.querySelector('.custom-slider')).toBeInTheDocument()
  })
})
