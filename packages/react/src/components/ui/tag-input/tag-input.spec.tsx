import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagInput } from '.'

describe('TagInput', () => {
  it('renders existing tags', () => {
    render(<TagInput value={['React', 'Vue']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('renders text input', () => {
    render(<TagInput value={[]} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('adds tag on Enter', async () => {
    const onChange = vi.fn()
    render(<TagInput value={[]} onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'NewTag{Enter}')
    expect(onChange).toHaveBeenCalledWith(['NewTag'])
  })

  it('removes tag on remove button click', async () => {
    const onChange = vi.fn()
    render(<TagInput value={['React']} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Remove React' }))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('removes last tag on backspace when input is empty', async () => {
    const onChange = vi.fn()
    render(<TagInput value={['A', 'B']} onChange={onChange} />)
    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.keyboard('{Backspace}')
    expect(onChange).toHaveBeenCalledWith(['A'])
  })

  it('prevents duplicate tags by default', async () => {
    const onChange = vi.fn()
    render(<TagInput value={['React']} onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'React{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects max tag limit', async () => {
    const onChange = vi.fn()
    render(<TagInput value={['A', 'B']} onChange={onChange} max={2} />)
    await userEvent.type(screen.getByRole('textbox'), 'C{Enter}')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('shows placeholder only when empty', () => {
    const { rerender } = render(<TagInput value={[]} placeholder="Add..." />)
    expect(screen.getByPlaceholderText('Add...')).toBeInTheDocument()

    rerender(<TagInput value={['Tag']} placeholder="Add..." />)
    expect(screen.queryByPlaceholderText('Add...')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<TagInput value={['Test']} disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Remove Test' })).not.toBeInTheDocument()
  })
})
