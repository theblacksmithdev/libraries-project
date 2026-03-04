import { render, screen } from '@testing-library/react'
import { AlertDialog, AlertDialogPrimitives, AlertDialogTrigger } from '.'

describe('AlertDialog', () => {
  it('renders simplified trigger', () => {
    render(
      <AlertDialog
        trigger={<button>Open</button>}
        title="Are you sure?"
        description="This cannot be undone."
      />
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders compound primitives', () => {
    render(
      <AlertDialogPrimitives.Root>
        <AlertDialogPrimitives.Trigger>Open</AlertDialogPrimitives.Trigger>
      </AlertDialogPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('exports sub-parts for backward compat', () => {
    render(
      <AlertDialogPrimitives.Root>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
      </AlertDialogPrimitives.Root>
    )
    expect(screen.getByText('Open')).toBeInTheDocument()
  })
})
