import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker, DateRangePicker } from '.'

describe('DatePicker', () => {
  it('renders', () => {
    const { container } = render(<DatePicker />)
    expect(container.querySelector('.inline-flex')).toBeInTheDocument()
  })

  it('shows placeholder when no value', () => {
    render(<DatePicker />)
    expect(screen.getByText('Pick a date')).toBeInTheDocument()
  })

  it('shows custom placeholder', () => {
    render(<DatePicker placeholder="Select date" />)
    expect(screen.getByText('Select date')).toBeInTheDocument()
  })

  it('displays formatted date when value set', () => {
    const date = new Date(2024, 0, 15)
    render(<DatePicker value={date} />)
    expect(screen.getByText(/January 15/)).toBeInTheDocument()
  })

  it('opens calendar on click', async () => {
    render(<DatePicker onChange={() => {}} />)
    await userEvent.click(screen.getByText('Pick a date'))
    // Calendar renders day-of-week headers
    const headers = screen.getAllByText(/Su|Mo|Tu|We|Th|Fr|Sa/)
    expect(headers.length).toBeGreaterThan(0)
  })
})

describe('DateRangePicker', () => {
  it('renders', () => {
    const { container } = render(<DateRangePicker />)
    expect(container.querySelector('.inline-flex')).toBeInTheDocument()
  })

  it('shows placeholder when no value', () => {
    render(<DateRangePicker />)
    expect(screen.getByText('Pick a date range')).toBeInTheDocument()
  })

  it('displays range when value set', () => {
    render(<DateRangePicker value={{ from: new Date(2024, 0, 1), to: new Date(2024, 0, 15) }} />)
    expect(screen.getByText(/Jan/)).toBeInTheDocument()
  })
})
