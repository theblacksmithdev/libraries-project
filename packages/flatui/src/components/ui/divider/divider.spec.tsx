import { render, screen } from '@testing-library/react'
import { Divider } from '.'

describe('Divider', () => {
  it('renders as a separator', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('defaults to horizontal orientation', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders vertical orientation', () => {
    render(<Divider orientation="vertical" />)
    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders label text', () => {
    render(<Divider label="or" />)
    expect(screen.getByText('or')).toBeInTheDocument()
  })

  it('renders label in vertical mode', () => {
    render(<Divider orientation="vertical" label="or" />)
    expect(screen.getByText('or')).toBeInTheDocument()
  })

  it('applies dashed variant', () => {
    const { container } = render(<Divider variant="dashed" />)
    expect(container.querySelector('.border-dashed')).toBeInTheDocument()
  })

  it('applies dotted variant', () => {
    const { container } = render(<Divider variant="dotted" />)
    expect(container.querySelector('.border-dotted')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(<Divider className="my-custom" />)
    expect(screen.getByRole('separator')).toHaveClass('my-custom')
  })
})
