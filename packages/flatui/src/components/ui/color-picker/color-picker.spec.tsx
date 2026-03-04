import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from '.'

describe('ColorPicker', () => {
  it('renders', () => {
    const { container } = render(<ColorPicker value="#ff0000" />)
    expect(container.querySelector('.inline-flex')).toBeInTheDocument()
  })

  it('displays current color value', () => {
    render(<ColorPicker value="#ff0000" />)
    expect(screen.getByText('#ff0000')).toBeInTheDocument()
  })

  it('shows placeholder when no value', () => {
    render(<ColorPicker value="" />)
    expect(screen.getByText('Pick a color')).toBeInTheDocument()
  })

  it('shows custom placeholder', () => {
    render(<ColorPicker value="" placeholder="Choose" />)
    expect(screen.getByText('Choose')).toBeInTheDocument()
  })

  it('opens popover on click and shows hex input', async () => {
    render(<ColorPicker value="#ff0000" onChange={() => {}} />)
    await userEvent.click(screen.getByText('#ff0000'))
    expect(screen.getByPlaceholderText('#000000')).toBeInTheDocument()
  })

  it('renders swatch buttons in popover', async () => {
    render(<ColorPicker value="" onChange={() => {}} swatches={['#ff0000', '#00ff00']} />)
    await userEvent.click(screen.getByText('Pick a color'))
    expect(screen.getByRole('button', { name: '#ff0000' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '#00ff00' })).toBeInTheDocument()
  })

  it('calls onChange when swatch clicked', async () => {
    const onChange = vi.fn()
    render(<ColorPicker value="" onChange={onChange} swatches={['#ff0000']} />)
    await userEvent.click(screen.getByText('Pick a color'))
    await userEvent.click(screen.getByRole('button', { name: '#ff0000' }))
    expect(onChange).toHaveBeenCalledWith('#ff0000')
  })
})
