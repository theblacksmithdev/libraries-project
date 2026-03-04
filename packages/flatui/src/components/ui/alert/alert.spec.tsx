import { render, screen } from '@testing-library/react'
import { Alert, AlertPrimitives, AlertTitle, AlertDescription } from '.'

describe('Alert', () => {
  it('renders simplified with title and description', () => {
    render(<Alert title="Test" description="Description" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders with variant', () => {
    render(<Alert variant="destructive" title="Error" description="Something went wrong" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <AlertPrimitives.Root>
        <AlertPrimitives.Title>Title</AlertPrimitives.Title>
        <AlertPrimitives.Description>Desc</AlertPrimitives.Description>
      </AlertPrimitives.Root>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <AlertPrimitives.Root>
        <AlertTitle>Legacy Title</AlertTitle>
        <AlertDescription>Legacy Desc</AlertDescription>
      </AlertPrimitives.Root>
    )
    expect(screen.getByText('Legacy Title')).toBeInTheDocument()
  })
})
