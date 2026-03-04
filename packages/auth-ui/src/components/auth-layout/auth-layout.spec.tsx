import { render, screen } from '@testing-library/react'
import { AuthLayout } from '.'

describe('AuthLayout', () => {
  it('renders title and description', () => {
    render(
      <AuthLayout title="Welcome" description="Please sign in">
        <div>content</div>
      </AuthLayout>,
    )
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('Please sign in')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <AuthLayout title="Title">
        <div data-testid="child">Hello</div>
      </AuthLayout>,
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <AuthLayout title="Title" footer={<span>Footer text</span>}>
        <div>content</div>
      </AuthLayout>,
    )
    expect(screen.getByText('Footer text')).toBeInTheDocument()
  })

  it('does not render footer when not provided', () => {
    const { container } = render(
      <AuthLayout title="Title">
        <div>content</div>
      </AuthLayout>,
    )
    expect(container.querySelector('[class*="CardFooter"]')).not.toBeInTheDocument()
  })
})
