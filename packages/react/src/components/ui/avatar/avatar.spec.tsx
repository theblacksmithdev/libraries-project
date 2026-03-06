import { render, screen } from '@testing-library/react'
import { Avatar, AvatarPrimitives, AvatarFallback } from '.'

describe('Avatar', () => {
  it('renders simplified with fallback', () => {
    render(<Avatar fallback="CN" />)
    expect(screen.getByText('CN')).toBeInTheDocument()
  })

  it('renders with src and fallback', () => {
    render(<Avatar src="https://example.com/photo.png" alt="User" fallback="AB" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <AvatarPrimitives.Root>
        <AvatarPrimitives.Fallback>JD</AvatarPrimitives.Fallback>
      </AvatarPrimitives.Root>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <AvatarPrimitives.Root>
        <AvatarFallback>XY</AvatarFallback>
      </AvatarPrimitives.Root>
    )
    expect(screen.getByText('XY')).toBeInTheDocument()
  })
})
