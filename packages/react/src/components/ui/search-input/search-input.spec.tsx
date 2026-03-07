import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from '.'

describe('SearchInput', () => {
  it('renders search input', () => {
    render(<SearchInput placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders as search type', () => {
    render(<SearchInput />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('shows clear button when value exists', () => {
    render(<SearchInput value="test" onChange={() => {}} onClear={() => {}} />)
    expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument()
  })

  it('hides clear button when empty', () => {
    render(<SearchInput value="" onChange={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
  })

  it('calls onClear when clear button clicked', async () => {
    const onClear = vi.fn()
    render(<SearchInput value="test" onChange={() => {}} onClear={onClear} />)
    await userEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(onClear).toHaveBeenCalledOnce()
  })

  it('shows loading spinner', () => {
    const { container } = render(<SearchInput value="test" loading onChange={() => {}} />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('hides clear button when loading', () => {
    render(<SearchInput value="test" loading onChange={() => {}} onClear={() => {}} />)
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<SearchInput className="w-96" />)
    expect(container.firstChild).toHaveClass('w-96')
  })
})
