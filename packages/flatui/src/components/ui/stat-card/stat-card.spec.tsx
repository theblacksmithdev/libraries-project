import { render, screen } from '@testing-library/react'
import { StatCard } from '.'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Revenue" value="$1,000" />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$1,000')).toBeInTheDocument()
  })

  it('renders trend up with value', () => {
    render(<StatCard label="Users" value="100" trend="up" trendValue="+10%" />)
    expect(screen.getByText('+10%')).toBeInTheDocument()
    expect(screen.getByText('+10%').closest('span')).toHaveClass('text-emerald-600')
  })

  it('renders trend down', () => {
    render(<StatCard label="Sales" value="50" trend="down" trendValue="-5%" />)
    expect(screen.getByText('-5%').closest('span')).toHaveClass('text-red-600')
  })

  it('renders with icon', () => {
    render(<StatCard label="Test" value="0" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<StatCard label="Test" value="0" description="from last month" />)
    expect(screen.getByText('from last month')).toBeInTheDocument()
  })
})
