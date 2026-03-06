import { render, screen } from '@testing-library/react'
import { Dialog, DialogPrimitives, DialogTrigger } from '.'

describe('Dialog', () => {
  it('renders simplified trigger', () => {
    render(
      <Dialog
        trigger={<button>Open</button>}
        title="Title"
        description="Desc"
      >
        Content
      </Dialog>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <DialogPrimitives.Root>
        <DialogPrimitives.Trigger>Open</DialogPrimitives.Trigger>
      </DialogPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <DialogPrimitives.Root>
        <DialogTrigger>Open</DialogTrigger>
      </DialogPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})
