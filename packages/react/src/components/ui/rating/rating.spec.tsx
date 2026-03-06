import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Rating } from '.'

describe('Rating', () => {
  it('renders the correct number of stars', () => {
    render(<Rating value={0} readOnly />)
    const stars = screen.getAllByRole('radio')
    expect(stars).toHaveLength(5)
  })

  it('renders custom max stars', () => {
    render(<Rating value={0} max={10} readOnly />)
    expect(screen.getAllByRole('radio')).toHaveLength(10)
  })

  it('has radiogroup role', () => {
    render(<Rating value={3} readOnly />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
  })

  it('labels each star correctly', () => {
    render(<Rating value={0} readOnly />)
    expect(screen.getByRole('radio', { name: '1 star' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '3 stars' })).toBeInTheDocument()
  })

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn()
    render(<Rating value={0} onChange={onChange} />)
    await userEvent.click(screen.getByRole('radio', { name: '4 stars' }))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('does not call onChange when readOnly', async () => {
    const onChange = vi.fn()
    render(<Rating value={3} onChange={onChange} readOnly />)
    await userEvent.click(screen.getByRole('radio', { name: '1 star' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies disabled styling', () => {
    render(<Rating value={2} disabled onChange={() => {}} />)
    expect(screen.getByRole('radiogroup')).toHaveClass('opacity-50')
  })

  it('accepts custom className', () => {
    render(<Rating value={0} readOnly className="custom" />)
    expect(screen.getByRole('radiogroup')).toHaveClass('custom')
  })
})
