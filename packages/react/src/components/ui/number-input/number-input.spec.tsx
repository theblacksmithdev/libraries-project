import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NumberInput } from '.'

describe('NumberInput', () => {
  it('renders with value', () => {
    render(<NumberInput value={5} />)
    expect(screen.getByRole('textbox')).toHaveValue('5')
  })

  it('renders increment and decrement buttons', () => {
    render(<NumberInput value={0} onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument()
  })

  it('increments on button click', async () => {
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Increase' }))
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('decrements on button click', async () => {
    const onChange = vi.fn()
    render(<NumberInput value={5} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Decrease' }))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('disables decrease button at min boundary', () => {
    render(<NumberInput value={0} onChange={() => {}} min={0} />)
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled()
  })

  it('disables increase button at max boundary', () => {
    render(<NumberInput value={10} onChange={() => {}} max={10} />)
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled()
  })

  it('uses custom step', async () => {
    const onChange = vi.fn()
    render(<NumberInput value={0} onChange={onChange} step={5} />)
    await userEvent.click(screen.getByRole('button', { name: 'Increase' }))
    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('renders split stepper style', () => {
    render(<NumberInput value={0} onChange={() => {}} stepper="split" />)
    expect(screen.getByRole('button', { name: 'Increase' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeInTheDocument()
  })

  it('disables buttons when disabled', () => {
    render(<NumberInput value={5} disabled />)
    expect(screen.getByRole('button', { name: 'Increase' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Decrease' })).toBeDisabled()
  })
})
