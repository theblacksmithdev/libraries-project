import { render, screen } from '@testing-library/react'
import { Sheet, SheetPrimitives, SheetTrigger } from '.'

describe('Sheet', () => {
  it('renders simplified trigger', () => {
    render(
      <Sheet trigger={<button>Open</button>} title="Title">
        Content
      </Sheet>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <SheetPrimitives.Root>
        <SheetPrimitives.Trigger>Open</SheetPrimitives.Trigger>
      </SheetPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <SheetPrimitives.Root>
        <SheetTrigger>Open</SheetTrigger>
      </SheetPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})
