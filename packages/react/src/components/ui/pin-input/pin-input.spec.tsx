import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PinInput } from '.'

describe('PinInput', () => {
  it('renders correct number of slots', () => {
    render(<PinInput length={4} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(4)
  })

  it('defaults to 6 slots', () => {
    render(<PinInput />)
    expect(screen.getAllByRole('textbox')).toHaveLength(6)
  })

  it('renders with labels', () => {
    render(<PinInput length={4} />)
    expect(screen.getByLabelText('Pin digit 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Pin digit 4')).toBeInTheDocument()
  })

  it('displays current value', () => {
    render(<PinInput value="123" length={4} />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('2')
    expect(inputs[2]).toHaveValue('3')
    expect(inputs[3]).toHaveValue('')
  })

  it('calls onChange on input', async () => {
    const onChange = vi.fn()
    render(<PinInput value="" onChange={onChange} length={4} />)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.click(inputs[0])
    await userEvent.keyboard('5')
    expect(onChange).toHaveBeenCalledWith('5')
  })

  it('calls onComplete when all slots filled', async () => {
    const onComplete = vi.fn()
    const onChange = vi.fn()
    render(<PinInput value="123" onChange={onChange} onComplete={onComplete} length={4} />)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.click(inputs[3])
    await userEvent.keyboard('4')
    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('rejects non-numeric in numeric mode', async () => {
    const onChange = vi.fn()
    render(<PinInput value="" onChange={onChange} type="numeric" length={4} />)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.click(inputs[0])
    await userEvent.keyboard('a')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('allows letters in alphanumeric mode', async () => {
    const onChange = vi.fn()
    render(<PinInput value="" onChange={onChange} type="alphanumeric" length={4} />)
    const inputs = screen.getAllByRole('textbox')
    await userEvent.click(inputs[0])
    await userEvent.keyboard('A')
    expect(onChange).toHaveBeenCalledWith('A')
  })

  it('renders separators', () => {
    render(<PinInput value="" length={6} separatorAfter={[2]} />)
    expect(screen.getByText('–')).toBeInTheDocument()
  })

  it('disables all slots when disabled', () => {
    render(<PinInput value="" length={4} disabled />)
    screen.getAllByRole('textbox').forEach((input) => {
      expect(input).toBeDisabled()
    })
  })
})
